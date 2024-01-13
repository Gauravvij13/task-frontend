import { ErrorMessage, Field } from "formik";

const FormikInput = ({ name, label, ...rest }) => {
  return (
    <>
      <label class="block mb-2 font-bold text-gray-600" htmlFor={name}>
        {label}
      </label>
      <Field
        class="border border-gray-300 shadow p-3 w-full rounded mb-2"
        id={name}
        name={name}
        {...rest}
      />
      <ErrorMessage name={name}>
        {(error) => <div className="text-red-500 text-xs mb-1">{error}</div>}
      </ErrorMessage>
    </>
  );
};

export default FormikInput;
