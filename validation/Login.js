export default function LoginValidation(values) {
  let errors = {};

  if (!values.email) {
    errors.email = "El email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0_9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Ingresa un email válido";
  }
  if (!values.password) {
    errors.password = "Contraseña obligatria";
  } else if (values.password.length < 6) {
    errors.password = "Ingresa al menos 6 caracteres";
  }

  return errors;
}
