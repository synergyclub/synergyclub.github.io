const toTopBtn = document.getElementById('to-top-btn');

// Show button when scrolling down
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    toTopBtn.classList.add('show');
    toTopBtn.classList.remove('hide');
  } else {
    toTopBtn.classList.add('hide');
    toTopBtn.classList.remove('show');
  }
});

// Scroll to top when button is clicked
toTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});