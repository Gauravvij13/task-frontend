import { Form, Formik } from "formik";
import * as yup from "yup";
import FormikInput from "../../../shared/FormElements/FormikInput";

const TaskForm = ({ initialValues, onSubmit }) => {
  const yesterday = new Date(Date.now() - 86400000);
  const ValidationSchema = yup.object().shape({
    title: yup.string().required("This Field is required"),
    description: yup.string().required("This Field is required"),
    dueDate: yup
      .date()
      .required("This Field is required")
      .min(yesterday, "Date cannot be in the past"),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <FormikInput name="title" label="Title" />
        <FormikInput
          name="description"
          component="textarea"
          label="Description"
        />
        <FormikInput name="dueDate" label="Due Date" type="date" required />

        <div className="mt-8">
          <button
            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
          >
            {initialValues?.title ? "Update" : "Add"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export default TaskForm;
