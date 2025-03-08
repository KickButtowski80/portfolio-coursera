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