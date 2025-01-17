// Generate a random opacity value between 0.5 and 1
const randomOpacity = (Math.random() * 0.9 + 0.5).toFixed(2);

// Set the random opacity as a CSS variable
document.documentElement.style.setProperty('--random-opacity', randomOpacity);