export default function createProductValidation(values) {
  let errors = {};

  if (!values.name) errors.name = "El nombre es obligatorio";

  if (!values.business)
    errors.business = "El nombre de la empresa es obligatorio";

  if (!values.url) {
    errors.url = "La URL es obligatoria";
  } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "URL no válida";
  }

  if (!values.description)
    errors.description = "Agrega una breve descripción de tu producto";

  return errors;
}
