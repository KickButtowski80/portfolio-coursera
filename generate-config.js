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
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Write to firebase-config.json
fs.writeFileSync(
  path.join(configDir, 'firebase-config.json'),
  JSON.stringify(config, null, 2)
);

console.log('Firebase config generated successfully');