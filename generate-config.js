
// generate-config.js - Creates Firebase configuration during build
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the config directory if it doesn't exist
const configDir = path.join(__dirname, 'js', 'config');
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// Generate the inline script to be added to index.html
const inlineScriptContent = `
// This script injects Firebase configuration into window object
window.__FIREBASE_CONFIG__ = {

// In generate-config.js
// Create a JavaScript file with the config
const jsContent = `
// This file is auto-generated during build
export const firebaseConfig = {

  apiKey: "${process.env.FIREBASE_API_KEY || ''}",
  authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || ''}",
  projectId: "${process.env.FIREBASE_PROJECT_ID || ''}",
  storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || ''}",
  messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID || ''}",
  appId: "${process.env.FIREBASE_APP_ID || ''}"
};
`;


// Write the inline script to a file
fs.writeFileSync(
  path.join(configDir, 'firebase-config-inline.js'),
  inlineScriptContent
);

console.log('Firebase config inline script generated successfully');

// Now update index.html to include this script
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Check if the script is already included
if (!indexContent.includes('firebase-config-inline.js')) {
  // Find the position to insert the script (before the first script tag)
  const scriptPosition = indexContent.indexOf('<script');
  
  if (scriptPosition !== -1) {
    // Insert our script before the first script tag
    indexContent = 
      indexContent.slice(0, scriptPosition) + 
      '<script src="/js/config/firebase-config-inline.js"></script>\n' +
      indexContent.slice(scriptPosition);
      
    // Write the updated index.html
    fs.writeFileSync(indexPath, indexContent);
    console.log('Added Firebase config script to index.html');
  } else {
    console.error('Could not find a script tag in index.html');
  }
} else {
  console.log('Firebase config script already included in index.html');
}
=======
const configDir = path.join(__dirname, 'js', 'config');
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

fs.writeFileSync(
  path.join(configDir, 'firebase-config.js'),
  jsContent
);
// Add this after writing the file
// Add this after writing the file
console.log('Config file path:', path.join(configDir, 'firebase-config.js'));
console.log('File exists:', fs.existsSync(path.join(configDir, 'firebase-config.js')));
console.log('Firebase config JS file generated successfully');
