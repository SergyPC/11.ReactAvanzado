import React from 'react';
import { userRegister } from '../../js/api.js';
import { Card, Button }  from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { Form, Input } from '../FormProvider/FormProvider';

export default function Register (props) {
    const onSubmit = async (data) => {
        const isRegisterCorrect = await userRegister(data.username, data.password);
        if (isRegisterCorrect.error) {
            //alert(`The username, ${data.username}, is already registered.`);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `The username, ${data.username}, is already registered. `,
                //footer: '<a href>Why do I have this issue?</a>'
                //showConfirmButton: false,
                timer: 4000
            });
        } else {
            //alert(`The username, ${data.username}, has been successfully registered`)
            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: `Correct registration`,
                text: `The username, ${data.username}, has been successfully registered. You are being redirected to Login`,
                //footer: '<a href>Why do I have this issue?</a>'
                //showConfirmButton: false,
                timer: 5000
            });
            props.history.push('/login');
        }
        // const response = await userRegister(data.username, data.password);
        // response ? props.history.push("/login") : console.log("error registering")
    }

    return (
        <div className='padre-logIn-SignUp'>
            <div className='hijo-logIn-SignUp2'>
                <Card.Title className='centrado'>Sign up for free account</Card.Title>
                <Form onSubmit = {onSubmit}>
                    <Input type="text" name="username" placeholder="Enter Username" />
                    <Input type="password" name="password" placeholder="Enter Password" /> 
                    <Button variant="primary" type="submit" style={{width: '100%', marginTop: '10px', fontWeight: 'bold'}}>Create free account</Button>
                </Form>
                <p align="center" style={{width: '100%', marginTop: '25px'}}>Are you registered in WallaKeep? <Link to={`/login`}><strong>Log In</strong></Link></p>
            </div>
        </div>
    )
}
