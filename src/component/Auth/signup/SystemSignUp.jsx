import { Typography } from "@mui/material";
import Button from "../../button/Button";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Register } from './../../../services/auth/SignUp';
const inputStyle = {
    border: "1px solid #d7d7d9",
    background: "#f1f1f2",
    borderRadius: "4px",
    padding: "12px 12px",
    width: "316px",
    marginBottom: "12px",
    outline: "none",
    caretColor: "red",
};
export default function SystemSignUp() {
    const validationSchema = Yup.object({
        username: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmedPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required("Confirmed password is required"),
    });
    // const user = useContext(Auth);
    return (
        <Formik
            initialValues={{ username: "", password: "", confirmedPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const fetchApi = async (username, password) => {
                    const result = await Register('email',username, password);
                    console.log(result);
                };
                fetchApi(values.username, values.password);
            }}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form>
                    <Typography mb={1}>Email</Typography>
                    <Field
                        name="username"
                        type="text"
                        style={inputStyle}
                        placeholder="Email"
                    />
                    <ErrorMessage
                        name="username"
                        component="div"
                        style={{ color: "red", marginBottom: "12px" }}
                    />

                    <Typography mb={1}>Password</Typography>
                    <Field
                        name="password"
                        type="password"
                        style={inputStyle}
                        placeholder="password"
                    />
                    <ErrorMessage
                        name="password"
                        component="div"
                        style={{ color: "red", marginBottom: "12px" }}
                    />
                    <Typography mb={1}>Confirm Password</Typography>
                    <Field
                        name="confirmedPassword"
                        type="password"
                        style={inputStyle}
                        placeholder="confirm password"
                    />
                    <ErrorMessage
                        name="confirmedPassword"
                        component="div"
                        style={{ color: "red", marginBottom: "12px" }}
                    />

                    <Button
                        mt={16}
                        type="submit"
                        fullWidth
                        center
                        small
                        disabled={!isValid || !dirty || isSubmitting}
                        primary={isValid && dirty ? "true" : "false"}
                    >
                        Sign up
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
