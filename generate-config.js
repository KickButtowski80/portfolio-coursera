// generate-config.js
const fs = require('fs');
const path = require('path');

// Ensure the directory exists
const configDir = path.join(__dirname, 'js', 'config');
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// Create the config file with environment variables
const config = {
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID
};

// Debug output
console.log('Environment variables available:', Object.keys(process.env).filter(key => key.startsWith('FIREBASE_')));
console.log('Config being written:', config);

// Write to firebase-config.json
// Create a public directory structure
const publicConfigDir = path.join(__dirname, 'public', 'js', 'config');
if (!fs.existsSync(publicConfigDir)) {
  fs.mkdirSync(publicConfigDir, { recursive: true });
}

// Write to both locations to be safe
fs.writeFileSync(
  path.join(publicConfigDir, 'firebase-config.json'),
  JSON.stringify(config, null, 2)
);
console.log('Firebase config generated successfully');