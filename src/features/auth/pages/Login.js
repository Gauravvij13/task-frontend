import { Formik, Form } from "formik";
import { useContext } from "react";
import * as yup from "yup";

import { AuthContext } from "../../../shared/context/auth-context";
import FormikInput from "../../../shared/FormElements/FormikInput";
import { useApiClient } from "../../../shared/hooks/api-hook";

const Login = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useApiClient();
  const ValidationSchema = yup.object().shape({
    email: yup.string().required("This Field is required"),
    password: yup.string().required("This Field is required"),
  });

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_URL}/users/login`,
        "POST",
        JSON.stringify({
          email,
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
      <h1 className="text-bold text-left text-xl mb-5 bg-yellow-500 p-5 shadow-lg">
        Login for Task Management
      </h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikInput id="email" name="email" label="Email" />
          <FormikInput
            id="password"
            label="Password"
            name="password"
            type="password"
          />
          <div className="mt-8">
            <button
              className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Login"}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
