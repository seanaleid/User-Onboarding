import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);
    //set useState outside of the return, need to include the useState to handle the data being posted
    useEffect(()=>{
        if(status){
            setUsers([...users, status]);
        }
    }, [status]);
    //the dependency array is watching for changes in status

    return(
        <div className="user-form">
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <Field type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <label className="checkbox-container">
                    <Field type="checkbox" name="terms" checked={values.terms} />
                    {touched.terms && errors.terms && (
                    <p className="error">{errors.terms}</p>
                )}
                    <span className="checkmark" />
                </label>
                <button>Submit!</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}){
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(`You must include a valid name`),
        email: Yup.string().email().required(`You must include a valid email`),
        password: Yup.string().min(9).required(`You must include a password of at least 9 characters`),
    }),
    handleSubmit(values, {setStatus}){
        axios.post(`https://reqres.in/api/users/`, values)
        .then(response => {
            setStatus(response.data);
            //setStatus comes from Formik, the data is what the user submits. 
            console.log(response.data);
            //ran a few tests, the data is being posted
        })
        .catch(error =>{
            console.log(`There is an error, please go back and fix it.`)
        })
    }
})(UserForm);


export default FormikUserForm;

// handleSubmit(values, {resetForm}){
//   console.log(values);
//   resetForm('');
// }