const catalogueImages = {
      'Football': '../catalogue/images/football.jpg',
      'Basketball': '../catalogue/images/basketball.jpg',
      'Running Shoes': '../catalogue/images/running-shoes.jpg',
      'Football Boots': '../catalogue/images/football-boots.jpg',
      'Training Gloves': '../catalogue/images/training-gloves.jpg',
      'Gym Bag': '../catalogue/images/gym-bag.jpg',
      'Yoga Mat': '../catalogue/images/yoga-mat.jpg',
      'Skipping Rope': '../catalogue/images/skipping-rope.jpg',
      'Tennis Racket': '../catalogue/images/tennis-racket.jpg',
      'Volleyball': '../catalogue/images/volleyball.jpg',
      'Water Bottle': '../catalogue/images/water-bottle.jpg',
      'Sports Cap': '../catalogue/images/sports-cap.jpg'
    };

    const storageKey = 'eliteSportsReviews';
    const reviewList = document.getElementById('reviewList');

    function loadReviews() {
      try {
        const savedReviews = JSON.parse(localStorage.getItem(storageKey));
        return Array.isArray(savedReviews) ? savedReviews : [];
      } catch (error) {
        return [];
      }
    }

    function formatDate(dateValue) {
      const date = new Date(dateValue);

      if (Number.isNaN(date.getTime())) {
        return '';
      }

      return new Intl.DateTimeFormat('en-MY', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(date);
    }

    function createReviewItem(review) {
      const reviewItem = document.createElement('article');
      reviewItem.className = 'review-item review-history-card';

      const image = document.createElement('img');
      image.className = 'review-thumbnail';
      image.src = catalogueImages[review.product];
      image.alt = review.product + ' product image';

      const copy = document.createElement('div');
      copy.className = 'review-copy';

      const meta = document.createElement('div');
      meta.className = 'review-meta';

      const author = document.createElement('strong');
      author.textContent = 'Customer';

      const ratingDisplay = document.createElement('span');
      ratingDisplay.className = 'rating';
      const rating = Math.min(5, Math.max(1, Number(review.rating) || 1));
      ratingDisplay.textContent = `${'\u2605'.repeat(rating)}${'\u2606'.repeat(5 - rating)} ${rating}/5`;

      const productHeading = document.createElement('h3');
      productHeading.textContent = review.product;

      const date = document.createElement('div');
      date.className = 'review-date';
      date.textContent = formatDate(review.createdAt);

      const reviewBody = document.createElement('p');
      reviewBody.textContent = review.text;
      reviewBody.style.whiteSpace = 'pre-wrap';

      meta.append(author, ratingDisplay);
      copy.append(meta, productHeading, date, reviewBody);
      reviewItem.append(image, copy);
      return reviewItem;
    }

    function showEmptyState() {
      reviewList.className = 'empty-state';
      reviewList.innerHTML = '';

      const message = document.createElement('p');
      message.textContent = 'No products reviewed yet';

      const leaveReviewLink = document.createElement('a');
      leaveReviewLink.className = 'leave-review-link';
      leaveReviewLink.href = '../catalogue/catalogue.html';
      leaveReviewLink.textContent = 'Leave a review';

      reviewList.append(message, leaveReviewLink);
    }

    function renderReviews() {
      const reviews = loadReviews().filter(review => catalogueImages[review.product]);
      reviewList.innerHTML = '';
      reviewList.className = '';

      if (reviews.length === 0) {
        showEmptyState();
        return;
      }

      reviews.forEach(review => reviewList.append(createReviewItem(review)));
    }

    window.addEventListener('storage', renderReviews);
    renderReviews();