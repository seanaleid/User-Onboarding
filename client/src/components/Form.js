import React from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({values}) => {

    return(
        <div className="user-form">
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                <Field type="email" name="email" placeholder="Email" />
                <Field type="password" name="password" placeholder="Password" />
                <label className="checkbox-container">
                    <Field type="checkbox" name="terms" checked={values.terms} />
                    <span className="checkmark" />
                </label>
                <button>Submit!</button>
            </Form>
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({terms}){
        return{
            terms: terms || false
        };
    },
})(UserForm);


export default FormikUserForm;