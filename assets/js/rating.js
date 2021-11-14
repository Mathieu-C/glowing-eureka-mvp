const container = document.getElementById("reviews-container");

const summary = document.getElementById("summary-score");
const summaryStar = document.getElementById("summary-score-star");

let reviews = [];

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
        <span aria-label="${review.rating} stars out of 5" role="img">${review.rating}</span>, ${review.body}
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

fetch(`${API_ROOT}/reviews`)
  .then((res) => res.json())
  .then((res) => populate(res.data));
