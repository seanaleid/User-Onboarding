import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({values, errors, touched, status, isSubmitting}) => {
    const [users, setUsers] = useState([]);
    //set useState outside of the return, need to include the useState to handle the data being posted
    useEffect(()=>{
        if(status){
            setUsers([...users, status]);
        }
    }, [ status]);
    //the dependency array is watching for changes in status

    return(
        <div className="user-form">
            <Form>
                <Field type="text" name="firstName" placeholder="First Name" />
                {touched.firstName && errors.firstName && (
                    <p className="error">{errors.firstName}</p>
                )}
                <Field type="text" name="lastName" placeholder="Last Name" />
                {touched.lastName && errors.lastName && (
                    <p className="error">{errors.lastName}</p>
                )}
                <Field type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <Field type="text" name="address" placeholder="Address" />
                {touched.address && errors.address && (
                    <p className="error">{errors.address}</p>
                )}
                <Field type="text" name="city" placeholder="City" />
                {touched.city && errors.city && (
                    <p className="error">{errors.city}</p>
                )}
                <Field type="text" name="zipcode" placeholder="Zipcode" />
                {touched.zipcode && errors.zipcode && (
                    <p className="error">{errors.zipcode}</p>
                )}
                <Field type="text" name="phone" placeholder="Phone Number" />
                {touched.phone && errors.phone && (
                    <p className="error">{errors.phone}</p>
                )}
                <Field type="text" name="username" placeholder="Username" />
                {touched.username && errors.username && (
                    <p className="error">{errors.username}</p>
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
                <button disabled={isSubmitting}>Submit!</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>First Name: {user.firstName}</li>
                    <li>Last Name: {user.lastName}</li>
                    <li>Email: {user.email}</li>
                    <li>Address: {user.address}</li>
                    <li>City: {user.city}</li>
                    <li>Zipcode: {user.zipcode}</li>
                    <li>Phone: {user.phone}</li>
                    <li>Username: {user.username}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({firstName, lastName, email, address, city, zipcode, phone, username, password, terms}){
        return{
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            address: address || "",
            city: city || "",
            zipcode: zipcode || "",
            phone: phone || "",
            username: username || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string().required(`You must include a valid name`),
        lastName: Yup.string().required(`You must include a valid name`),
        email: Yup.string().email().required(`You must include a valid email`),
        address: Yup.string().required(`You must include a valid address`),
        city: Yup.string().required(`You must include a valid address`),
        zipcode: Yup.string().required(`You must include a valid address`),
        phone: Yup.string().required(`You must include a valid address`),
        username: Yup.string().required(`You must include a valid address`),
        password: Yup.string().min(9).required(`You must include a password of at least 9 characters`),
    }),
    handleSubmit(values, {setStatus, setErrors, resetForm, setSubmitting}){
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
        setTimeout(() => {
            if(values.email === 'waffle@syrup.com'){
                setErrors({email: 'The email: waffle@syrup.com is already taken.'})
            } else {
                resetForm()
            }
            setSubmitting(false)
        }, 3000)
    }
})(UserForm);


export default FormikUserForm;

// handleSubmit(values, {resetForm}){
//   console.log(values);
//   resetForm('');
// }

//hello test