
// Admin utilities

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast active ' + type;
  
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// Format price
function formatPrice(price) {
  return price.toFixed(2) + ' RON';
}
