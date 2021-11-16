const API_ROOT = "http://161.35.3.59:3000";

const form = document.getElementById("rating-form");

const errorsContainer = document.getElementById("errors");
const modalContainer = document.getElementById("review-modal");

const toggleModal = () => {
  modalContainer.classList.toggle("review-modal--is-open");
}

const clearErrors = () => {
  errors.innerHTML = '';
}

const setErrors = (errors) => {
  const result = errors.map((error) => `<li>${error}</li>`);
  errorsContainer.innerHTML = result.join('');
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
      } else {
        setErrors(data.errors);
      }
    })
}
