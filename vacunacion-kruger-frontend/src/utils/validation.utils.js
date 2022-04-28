const isEmpty = (field) => {
  let isError = field.length > 0 ? false : true;

  return {
    isError,
    message: isError ? "El campo es requerido" : null,
  };
};

const isNumber = (field) => {
  let isError = isNaN(field) ? true : false;

  return {
    isError,
    message: isError ? "El campo debe contener un número" : null,
  };
}

const isEmail = (field) => {
  let isError =
    field.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) === null
      ? true
      : false;

  return {
    isError,
    message: isError ? "El campo debe contener un email válido" : null,
  };
};

const isCedula = (field) => {};

const varExists = (varToValidate) => {
  let exists = typeof varToValidate === "undefined" ? false : true;

  return exists;
};

const maxLength = (field, max) => {
  let isError = field.length > max ? true : false;

  return {
    isError,
    message: isError
      ? `El campo debe tener un máximo de ${max} caracteres`
      : null,
  };
};

const minLength = (field, min) => {
  let isError = field.length < min ? true : false;

  return {
    isError,
    message: isError
      ? `El campo debe tener un mínimo de ${min} caracteres`
      : null,
  };
};

export  {
  isEmpty,
  isNumber,
  isEmail,
  isCedula,
  varExists,
  maxLength,
  minLength,
};
