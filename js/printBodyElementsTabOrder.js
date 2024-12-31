document.addEventListener("DOMContentLoaded", (event) => {
     
  
 
  
    function getTabbableElements() {
      const allElements = Array.from(document.body.querySelectorAll('*'));
      const tabbableElements = allElements.filter(element => {
        const tabIndex = element.getAttribute('tabindex');
        return (
          element.tagName === 'A' || 
          element.tagName === 'BUTTON' || 
          element.tagName === 'INPUT' || 
          element.tagName === 'TEXTAREA' || 
          element.tagName === 'SELECT' || 
          element.isContentEditable || 
          (tabIndex !== null && tabIndex !== '-1') 
        );
      });
      return tabbableElements;
    }
    
    function logTabbingOrder() {
      const tabbableElements = getTabbableElements();
    
      console.log("Tabbing Order:");
      tabbableElements.forEach((element, index) => {
        const reason = [];
        if (element.tagName === 'A') reason.push('Link');
        if (element.tagName === 'BUTTON') reason.push('Button');
        if (element.tagName === 'INPUT') reason.push('Input');
        if (element.tagName === 'TEXTAREA') reason.push('Textarea');
        if (element.tagName === 'SELECT') reason.push('Select');
        if (element.isContentEditable) reason.push('ContentEditable');
        if (element.getAttribute('tabindex')) reason.push(`tabindex=${element.getAttribute('tabindex')}`);
        
        console.log(
          `${index + 1}. ${element.tagName} ` +
          `${element.className ? `class="${element.className}"` : ''} ` +
          `${element.id ? `id="${element.id}"` : ''} ` +
          `${element.textContent.trim().slice(0, 50)}... ` +
          `(Reason: ${reason.join(', ')})`
        );
      });
    }
    
    console.log('Initial page load tab order:')
    logTabbingOrder();  
  });
  