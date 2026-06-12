const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env'), override: true });

const app = express();
const PORT = process.env.PORT || 3000;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname, { index: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chatbot.html'));
});

app.post('/api/chat', async (req, res) => {
  const { messages, system } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: system || 'You are a helpful, friendly, and knowledgeable AI assistant. You are available 24/7 to answer questions and help users with any tasks they need. Be concise but thorough, and always be polite and professional.',
      messages,
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        res.write('data: ' + JSON.stringify({ text: chunk.delta.text }) + '\n\n');
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('Anthropic API error:', err.message);
    res.write('data: ' + JSON.stringify({ error: err.message }) + '\n\n');
    res.end();
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'chatbot.html'));
});

app.listen(PORT, () => {
  console.log('\n  AI ChatBot running at http://localhost:' + PORT);
  console.log('  Press Ctrl+C to stop\n');
});
