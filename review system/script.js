const form = document.getElementById('reviewForm');
const reviewList = document.getElementById('reviewList');
const ratingInputs = document.querySelectorAll('input[name="rating"]');
const ratingMessage = document.getElementById('ratingMessage');
const productImage = document.getElementById('productImage');
const modalImage = document.getElementById('modalImage');
const imageModal = document.getElementById('imageModal');
const openImageModal = document.getElementById('openImageModal');
const closeImageModal = document.getElementById('closeImageModal');

ratingInputs.forEach(input => input.addEventListener('change', () => {
  ratingMessage.textContent = `${input.value} out of 5 stars selected`;
}));

function showModal() {
  modalImage.src = productImage.src;
  imageModal.classList.add('open');
  closeImageModal.focus();
}
function hideModal() { imageModal.classList.remove('open'); openImageModal.focus(); }
openImageModal.addEventListener('click', showModal);
closeImageModal.addEventListener('click', hideModal);
imageModal.addEventListener('click', event => { if (event.target === imageModal) hideModal(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && imageModal.classList.contains('open')) hideModal();
});

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const selectedRating = document.querySelector('input[name="rating"]:checked');
  const rating = selectedRating ? selectedRating.value : '';
  const reviewText = document.getElementById('review').value.trim();

  if (!rating || !reviewText) {
    return;
  }

  const reviewItem = document.createElement('div');
  reviewItem.className = 'review-item';
  const meta = document.createElement('div');
  meta.className = 'review-meta';
  const author = document.createElement('strong');
  author.textContent = 'Customer';
  const ratingDisplay = document.createElement('span');
  ratingDisplay.className = 'rating';
  ratingDisplay.textContent = `${'\u2605'.repeat(Number(rating))}${'\u2606'.repeat(5 - Number(rating))} ${rating}/5`;
  const reviewBody = document.createElement('p');
  reviewBody.textContent = reviewText;
  reviewBody.style.whiteSpace = 'pre-wrap';
  meta.append(author, ratingDisplay);
  reviewItem.append(meta, reviewBody);

  if (reviewList.classList.contains('empty-state')) {
    reviewList.classList.remove('empty-state');
    reviewList.innerHTML = '';
  }

  reviewList.prepend(reviewItem);
  form.reset();
  ratingMessage.textContent = 'Select a star rating';
});
