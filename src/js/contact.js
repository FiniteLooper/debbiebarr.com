(() => {
  const $form = document.querySelector('#contact-form');
  const $formFields = $form.querySelectorAll('input,textarea');
  const $status = document.querySelector('#form-status');
  const txtClassSuccess = 'text-success';
  const txtClassError = 'text-danger';
  const msgSuccess = 'Thanks for your note. Debbie will respond to you soon.';
  const msgError = 'Oops! There was a problem submitting your message, try again later!';

  $form.addEventListener('submit', async function (event) {
    event.preventDefault();
    event.stopPropagation();

    $form.classList.add('was-validated');
    if ($form.checkValidity()) {
      const data = new FormData(event.target);
      fetch(event.target.action, {
        method: $form.method,
        body: data,
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            formSuccess();
          } else {
            response.json().then((data) => {
              if (Object.hasOwn(data, 'errors')) {
                $status.classList.add(txtClassError);
                $status.innerHTML = data['errors'].map((error) => error['message']).join(', ');
              } else {
                formError(data);
              }
            });
          }
        })
        .catch((err) => formError(err));
    }
  });

  const formSuccess = () => {
    $status.innerHTML = msgSuccess;
    $status.classList.remove(txtClassError);
    $status.classList.add(txtClassSuccess);
    $formFields.forEach((f) => {
      f.setAttribute('readonly', '');
      f.classList.add('is-valid');
    });
    $form.querySelector('button').disabled = true;
  };

  const formError = (err) => {
    $status.classList.add(txtClassError);
    $status.innerHTML = msgError;
    console.error(err);
  };
})();
