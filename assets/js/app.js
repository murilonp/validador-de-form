const validator = {
  handleSubmit: event => {
    event.preventDefault();
    let send = true;
    let inputs = form.querySelectorAll('input');

    validator.clearErrors();

    inputs.forEach(input => {
      let check = validator.checkInput(input);
      if (check !== true) {
        send = false;
        validator.showErrorMessage(input, check);
      }
    });

    if (send) {
      form.submit();
    }
  },
  checkInput: input => {
    let rules = input.getAttribute('data-rules');

    if (rules !== null) {
      rules = rules.split('|');
      for (let index in rules) {
        let rDetails = rules[index].split('=');
        switch (rDetails[0]) {
          case 'required':
            if (input.value === '') return 'Campo vazio';
            break;
          case 'min':
            if (input.value.length < rDetails[1])
              return `Caracteres abaixo da quantidade requerida: ${rDetails[1]}`;
            break;
          case 'email':
            if (input.value !== '') {
              let regex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

              if (!regex.test(input.value.toLowerCase()))
                return 'E-mail invalido';
            }
          default:
            break;
        }
      }
    }
    return true;
  },
  showErrorMessage: (input, error) => {
    input.style.borderBottomColor = '#950101';

    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error;

    input.parentElement.insertBefore(errorElement, input.nextSibling);
  },
  clearErrors: () => {
    let errorElement = document.querySelectorAll('.error');
    let inputs = form.querySelectorAll('input');

    inputs.forEach(input => (input.style = ''));

    errorElement.forEach(element => {
      element.remove();
    });
  }
};

const form = document.querySelector('.validator');

form.addEventListener('submit', validator.handleSubmit);
