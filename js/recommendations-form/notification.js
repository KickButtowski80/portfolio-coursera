// notification.js
export function showNotification(message, type = 'info', duration = 3000) {
    const container = document.querySelector('.notification-container');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after duration
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        // Remove from DOM after animation completes
        notification.addEventListener('transitionend', () => {
            notification.remove();
        }, { once: true });
    }, duration);
}