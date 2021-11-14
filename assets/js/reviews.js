const container = document.getElementById("reviews-container");

const summary = document.getElementById("summary-score");
const summaryStar = document.getElementById("summary-score-star");

let reviews = [];

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
 }

const renderRating = (rating) => {
  const percentage = 100 / 5 * rating;
  return `
    <div class="rating" aria-label="${rating} stars">
      <div class="rating__star" style="width:${percentage}%"></div>
    </div>`
}

const renderReview = (review) => {
  container.innerHTML += `
    <article class="review">
      ${renderRating(review.rating)}
      <p class="review__content">
        <span aria-label="${review.rating} stars out of 5" role="img">${review.rating}</span>, ${escapeHtml(review.body)}
      </p>
    </article>
  `;
}

const renderReviews = () => {
  reviews.forEach((review) => renderReview(review))
}

const populate = (data) => {
  reviews = data;
  renderReviews();
  updateSummary();
}

const updateSummary = () => {
  let average = reviews.reduce((prev, current) => prev + +current.rating, 0) / reviews.length;
  average = average.toFixed(2);

  summary.innerHTML = average;
  summaryStar.style.width = 100 / 5 * average + "%"
}

const addReview = (data) => {
  const review = JSON.parse(data);

  reviews.push(review);
  renderReview(review);

  updateSummary();
}

const source = new EventSource(`${API_ROOT}/reviews/live`);
source.addEventListener('created', function(event) {
  addReview(event.data);
});

window.onbeforeunload = freeSource;

function freeSource() {
  source.close();
  return null;
}

fetch(`${API_ROOT}/reviews`)
  .then((res) => res.json())
  .then((res) => populate(res.data));
