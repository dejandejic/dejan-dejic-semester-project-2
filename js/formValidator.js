export class FormValidator {
  constructor(form, fields) {
    this.form = form
    this.fields = fields
    this.isError = true;
    this.params = {}
  }

  initialize(fn) {
    this.validateOnEntry()
    this.validateOnSubmit(fn)
  }

  getStatus() {
    return this.isError;
  }

  validateOnSubmit(fn) {
    let self = this

    this.form.addEventListener('submit', e => {
      console.log("submit");
      e.preventDefault()
      self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        self.validateFields(input, field);
      });
      if (fn && !self.isError) {
        fn(self.params);
      }
    })
  }

  validateOnEntry() {
    let self = this
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`)

      input.addEventListener('input', event => {
        self.validateFields(input)
      })
    })
  }

  validateFields(field, param) {

    // Check presence of values
    if (field.value.trim() === "") {
      this.setStatus(field, `This field cannot be blank`, "error")
    } else {
      this.setStatus(field, null, "success", param, field.value.trim())
    }

    // check for a valid email address
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/
      if (re.test(field.value)) {
        this.setStatus(field, null, "success", param, field.value.trim())
      } else {
        this.setStatus(field, "Please enter valid email address", "error")
      }
    }

    // Password confirmation 
    if (field.id === "password_confirmation") {
      const passwordField = this.form.querySelector('#password')

      if (field.value.trim() == "") {
        this.setStatus(field, "Password confirmation required", "error")
      } else if (field.value != passwordField.value) {
        this.setStatus(field, "Password does not match", "error")
      } else {
        this.setStatus(field, null, "success", param, field.value.trim())
      }
    }
  }

  setStatus(field, message, status, param, val) {
    const errorMessage = field.parentElement.querySelector('.error-message')

    if (status === "success") {
      if(param){
        this.params[param] = val;
      }
      if (errorMessage) { errorMessage.innerText = "" }
      field.classList.remove('input-error');
      this.isError = false;
    }

    if (status === "error") {
      field.parentElement.querySelector('.error-message').innerText = message
      field.classList.add('input-error');
      this.isError = true;
    }
  }
}