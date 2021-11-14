const API_ROOT = "http://localhost:3000";

const form = document.getElementById("rating-form");
const modalContainer = document.getElementById("review-modal");

const toggleModal = () => {
  modalContainer.classList.toggle("review-modal--is-open");
}

const handleSubmit = (event) => {
  event.preventDefault();

  const data = {
    rating : form.querySelector('input[name="rating"]:checked').value,
    body : form.querySelector('textarea').value,
  }

  fetch(
    `${API_ROOT}/reviews`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "SUCCESS") {
        toggleModal();
        form.reset();
      }
    })
}
