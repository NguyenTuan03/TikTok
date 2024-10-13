import { Typography } from "@mui/material";
import Button from "../../button/Button";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import { Auth } from "../../accountItem/AuthContext";
import  PropTypes  from 'prop-types';
import { login } from './../../../services/auth/Login';
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
export default function SystemLogin({handleCloseModal}) {
    const validationSchema = Yup.object({
        username: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });
    const user = useContext(Auth);
    return (
        <>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const fetchApi = async(username,password ) => {
                        const result = await login(username,password);
                        if (result.data) {
                            handleCloseModal();
                            setTimeout(() => {
                                window.location.reload();
                            }, 500);
                            user.loginUser(result)
                        }
                        console.log(result);
                    }
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
                            component="span"
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
                            component="span"
                            style={{ color: "red", marginBottom: "12px" }}
                        />

                        <Button
                            mt={16}
                            type="submit"
                            fullwidth
                            center
                            small="true"
                            disabled={!isValid || !dirty || isSubmitting}
                            primary={(isValid && dirty) ? "true" : "false"}
                        >
                            Log in
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}
SystemLogin.propTypes = {
    handleCloseModal: PropTypes.func
}