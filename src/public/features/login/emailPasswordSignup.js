import axios from "axios";
import { CustomButton } from "components/CustomButton";
import { InputField } from "components/InputField";
import { Form, Formik } from "formik";
import {
  signupInitialValues,
  signupValidationSchema,
} from "public/features/login/formValues";
import { hashPassword } from "services/loginService";

const EmailPasswordSignup = () => {
  const handleSubmit = async (values) => {
    try {
      const hashedPassword = await hashPassword(values.password);
      await axios.post("/api/signup", { ...values, password: hashedPassword });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <Formik
      initialValues={signupInitialValues}
      validationSchema={signupValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <InputField label="Name" name="name" required />
        <InputField label="Email" name="email" type="email" required />
        <InputField label="Password" name="password" type="password" required />
        <CustomButton
          type="submit"
          name="Register"
          variant="contained"
          fullWidth
          onClick={() => {
            alert("hellow");
          }}
        >
          {" "}
          Register{" "}
        </CustomButton>
      </Form>
    </Formik>
  );
};

export default EmailPasswordSignup;
