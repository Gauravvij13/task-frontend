import { Formik, Form } from "formik";
import * as yup from "yup";

import { useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useApiClient } from "../../../shared/hooks/api-hook";
import FormikInput from "../../../shared/FormElements/FormikInput";

const Signup = ({ styles }) => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useApiClient();

  const ValidationSchema = yup.object().shape({
    name: yup.string().required("This Field is required"),
    email: yup
      .string()
      .email("Invalid email")
      .required("This Field is required"),
    password: yup.string().required("This Field is required"),
  });

  const handleSubmit = async (values) => {
    const { name, email, password } = values;
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_URL}/users/signup`,
        "POST",
        JSON.stringify({
          email,
          name,
          password,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if (response?.data?.user) {
        auth.login(response?.data?.user?._id, response?.data?.accessToken);
      }
    } catch (error) {}
  };

  return (
    <>
      <h1 className="text-bold text-left text-sm  md:text-xl mb-5 bg-yellow-500 p-5 shadow-lg">
        Signup for Task Management
      </h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikInput label="Name" id="name" name="name" />
          <FormikInput id="email" name="email" label="Email" />
          <FormikInput
            id="password"
            label="Password"
            name="password"
            type="password"
          />

          <div className="mt-5 md:mt-8">
            <button
              className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Signup"}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Signup;
