import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// OAuth relay endpoints will be implemented here
app.post('/oauth/connect', (req, res) => {
  const { platform, credentials } = req.body;
  
  // Placeholder: encrypt and store OAuth credentials
  console.log(`Received OAuth credentials for platform: ${platform}`);
  
  res.json({ success: true, message: `Connected to ${platform}` });
});

app.post('/publish', (req, res) => {
  const { title, content, platforms } = req.body;
  
  // Placeholder: publish to specified platforms
  console.log(`Publishing to platforms: ${platforms.join(', ')}`);
  
  res.json({ success: true, message: 'Published to all platforms' });
});

app.listen(PORT, () => {
  console.log(`EchoPost relay running on port ${PORT}`);
  console.log(`CORS enabled for: ${CORS_ORIGIN}`);
});
