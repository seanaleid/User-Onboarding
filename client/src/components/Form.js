import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";

const StyledDiv = styled.div`
    width: 100%;
    display: flex;
`;

const StyledCard = styled.div`
    width: 460px;
    margin: auto 100px;
    font-weight: bold;
    background-color: rgba(255, 213, 7, .7);
    box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.1); 
`;

const StyledSpan = styled.span`
    max-width: 100%;
    border: 1px solid black;
    display: flex;
`;

const StyledForm = styled(Form)`
    width: 460px;
    margin: auto 50px;
    padding: 32px;
    font-weight: bold;
    background-color: rgba(255, 213, 7, .7);
    box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.1);
`;

const StyledField = styled(Field)`
    width: 100%;
    margin: 10px;
    
`;

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
        <StyledDiv>
            <StyledForm>
                <StyledSpan> 
                    <StyledField type="text" name="firstName" placeholder="First Name" />
                    {touched.firstName && errors.firstName && (
                        <p className="error">{errors.firstName}</p>
                    )}
                    <StyledField type="text" name="lastName" placeholder="Last Name" />
                    {touched.lastName && errors.lastName && (
                        <p className="error">{errors.lastName}</p>
                    )}
                </StyledSpan>
                <StyledSpan> 
                <StyledField type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <StyledField type="text" name="address" placeholder="Address" />
                {touched.address && errors.address && (
                    <p className="error">{errors.address}</p>
                )}
                </StyledSpan>
                <StyledSpan> 
                    <StyledField type="text" name="city" placeholder="City" />
                    {touched.city && errors.city && (
                        <p className="error">{errors.city}</p>
                    )}
                    <StyledField component="select" name="state">
                        <option value="-"> - </option>
                        <option value="Alabama">AL</option>
                        <option value="Alaska">AK</option>
                        <option value="American Samoa">AS</option>
                        <option value="Arizona">AZ</option>
                        <option value="Arkansas">AR</option>
                        <option value="California">CA</option>
                        <option value="Colorado">CO</option>
                        <option value="Connecticut">CT</option>
                        <option value="District of Columbia">DC</option>
                        <option value="Delaware">DE</option>
                        <option value="Florida">FL</option>
                        <option value="Federated States of Micronesia">FM</option>
                        <option value="Georgia">GA</option>
                        <option value="Guam">GU</option>
                        <option value="Hawaii">HI</option>
                        <option value="Idaho">ID</option>
                        <option value="Illinois">IL</option>
                        <option value="Indiana">IN</option>
                        <option value="Iowa">IA</option>
                        <option value="Kansas">KS</option>
                        <option value="Kentucky">KY</option>
                        <option value="Louisiana">LA</option>
                        <option value="Maine">ME</option>
                        <option value="Maryland">MD</option>
                        <option value="Massachusetts">MA</option>
                        <option value="Marshall Islands">MH</option>
                        <option value="Michigan">MI</option>
                        <option value="Minnesota">MN</option>
                        <option value="Mississippi">MS</option>
                        <option value="Missouri">MO</option>
                        <option value="Northern Mariana Islands">MP</option>
                        <option value="Montana">MT</option>
                        <option value="Nebraska">NE</option>
                        <option value="Nevada">NV</option>
                        <option value="New Hampshire">NH</option>
                        <option value="New Jersey">NJ</option>
                        <option value="New Mexico">NM</option>
                        <option value="New York">NY</option>
                        <option value="North Carolina">NC</option>
                        <option value="North Dakota">ND</option>
                        <option value="Ohio">OH</option>
                        <option value="Oklahoma">OK</option>
                        <option value="Oregon">OR</option>
                        <option value="Pennsylvania">PA</option>
                        <option value="Puerto Rico">PR</option>
                        <option value="Palau">PW</option>
                        <option value="Rhode Island">RI</option>
                        <option value="South Carolina">SC</option>
                        <option value="South Dakota">SD</option>
                        <option value="Tennessee">TN</option>
                        <option value="Texas">TX</option>
                        <option value="Utah">UT</option>
                        <option value="Vermont">VT</option>
                        <option value="Virginia">VA</option>
                        <option value="Virgin Islands">VI</option>
                        <option value="Washington">WA</option>
                        <option value="West Virginia">WV</option>
                        <option value="Wisconsin">WI</option>
                        <option value="Wyoming">WY</option>
                    </StyledField>
                    <StyledField type="text" name="zipcode" placeholder="Zipcode" />
                    {touched.zipcode && errors.zipcode && (
                        <p className="error">{errors.zipcode}</p>
                    )}
                </StyledSpan> 
                <StyledSpan> 
                    <StyledField type="text" name="phone" placeholder="Phone Number" />
                    {touched.phone && errors.phone && (
                        <p className="error">{errors.phone}</p>
                    )}
                    <StyledField type="text" name="username" placeholder="Username" />
                    {touched.username && errors.username && (
                        <p className="error">{errors.username}</p>
                    )}
                    <StyledField type="password" name="password" placeholder="Password" />
                    {touched.password && errors.password && (
                        <p className="error">{errors.password}</p>
                    )}
                </StyledSpan> 
                <label className="checkbox-container">
                    <a href="#" style={{textDecoration: 'none', color: "black",}}>Agree to terms and conditions</a>
                    <Field type="checkbox" name="terms" checked={values.terms} />
                    {touched.terms && errors.terms && (
                    <p className="error">{errors.terms}</p>
                    )}
                    <span className="checkmark" />
                </label>
                <button disabled={isSubmitting}>Submit!</button>
            </StyledForm>
            <StyledCard>
            {users.map(user => (
                <ul key={user.id}>
                    <li>First Name: {user.firstName}</li>
                    <li>Last Name: {user.lastName}</li>
                    <li>Email: {user.email}</li>
                    <li>Address: {user.address}</li>
                    <li>City: {user.city}</li>
                    <li>State: {user.state}</li>
                    <li>Zipcode: {user.zipcode}</li>
                    <li>Phone: {user.phone}</li>
                    <li>Username: {user.username}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
            </StyledCard>
        </StyledDiv>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({firstName, lastName, email, address, city, state, zipcode, phone, username, password, terms}){
        return{
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            address: address || "",
            city: city || "",
            state: state || "",
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
        }, 1000)
    }
})(UserForm);


export default FormikUserForm;

// handleSubmit(values, {resetForm}){
//   console.log(values);
//   resetForm('');
// }

//hello test