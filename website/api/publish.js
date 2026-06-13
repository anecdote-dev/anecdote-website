// Serverless function (Vercel) — powers the admin login + one-click Publish.
// The GitHub token stays here on the server, never in the browser.
//
// Required Vercel Environment Variables (Project → Settings → Environment Variables):
//   GH_TOKEN         GitHub token with "Contents: Read and write" on the repo
//   ADMIN_PASSWORD   the password you type to log into /admin.html
//   GH_REPO          optional, defaults to anecdote-dev/anecdote-website
//   GH_BRANCH        optional, defaults to main
//
// Request body: { password, content? }
//   - wrong password            -> 401
//   - password only (no content)-> 200  (used by the admin login check)
//   - password + content        -> commits website/content.json -> 200 (triggers redeploy)

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }

  const { GH_TOKEN, ADMIN_PASSWORD, GH_REPO, GH_BRANCH } = process.env;
  if (!GH_TOKEN || !ADMIN_PASSWORD) {
    res.status(500).json({ error: 'Not configured. Set GH_TOKEN and ADMIN_PASSWORD in Vercel, then redeploy.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const { password, content } = body || {};

  if (password !== ADMIN_PASSWORD) { res.status(401).json({ error: 'Wrong password.' }); return; }
  if (content === undefined) { res.status(200).json({ ok: true, auth: true }); return; } // login check

  if (!content || typeof content !== 'object' || Array.isArray(content) || !content.hero) {
    res.status(400).json({ error: 'Content does not look valid (missing hero) — not publishing.' });
    return;
  }

  const repo = GH_REPO || 'anecdote-dev/anecdote-website';
  const branch = GH_BRANCH || 'main';
  const apiPath = 'website/content.json'.split('/').map(encodeURIComponent).join('/');
  const url = `https://api.github.com/repos/${repo}/contents/${apiPath}`;
  const headers = {
    Authorization: `Bearer ${GH_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'anecdote-admin',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  try {
    let sha;
    const cur = await fetch(`${url}?ref=${branch}`, { headers });
    if (cur.ok) sha = (await cur.json()).sha;

    const encoded = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');
    const put = await fetch(url, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Update content.json via admin', content: encoded, sha, branch })
    });

    if (!put.ok) {
      const detail = await put.text();
      res.status(502).json({ error: 'GitHub rejected the update: ' + detail.slice(0, 300) });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e).slice(0, 300) });
  }
};
