// Serverless function (Vercel) — lets the admin page publish content.json directly.
// The GitHub token stays here on the server, never in the browser.
//
// Required Vercel Environment Variables (Project → Settings → Environment Variables):
//   GH_TOKEN         a GitHub token with "Contents: Read and write" on the repo
//   GH_REPO          owner/repo, e.g. anecdote-dev/anecdote-website
//   PUBLISH_PASSWORD a password you choose; the admin must enter it to publish
//   GH_BRANCH        optional, defaults to "main"
//
// It commits to "Website Anecdote/content.json", which triggers a Vercel redeploy.

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }

  const { GH_TOKEN, GH_REPO, PUBLISH_PASSWORD, GH_BRANCH } = process.env;
  if (!GH_TOKEN || !GH_REPO || !PUBLISH_PASSWORD) {
    res.status(500).json({ error: 'Not configured. Set GH_TOKEN, GH_REPO and PUBLISH_PASSWORD in Vercel, then redeploy.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const { password, content } = body || {};

  if (password !== PUBLISH_PASSWORD) { res.status(401).json({ error: 'Wrong password.' }); return; }
  if (!content || typeof content !== 'object' || Array.isArray(content) || !content.hero) {
    res.status(400).json({ error: 'Content does not look valid (missing hero) — not publishing.' });
    return;
  }

  const branch = GH_BRANCH || 'main';
  const repoPath = 'Website Anecdote/content.json';
  const apiPath = repoPath.split('/').map(encodeURIComponent).join('/');
  const url = `https://api.github.com/repos/${GH_REPO}/contents/${apiPath}`;
  const headers = {
    Authorization: `Bearer ${GH_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'anecdote-admin',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  try {
    // Current file SHA (required by GitHub to update an existing file)
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
