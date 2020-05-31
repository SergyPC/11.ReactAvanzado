import React from 'react';
import { userLogin } from '../../js/api.js';
import { Card, Button }  from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { Form, Input } from '../FormProvider/FormProvider';

export default function Login (props) {
    const onSubmit = async (data) => {
        try {
            const isLoginCorrect = await userLogin(data.username, data.password);
            if(!isLoginCorrect.error) {
                sessionStorage.setItem("UserLogged", true);
                props.userLogin();
                props.history.push("/adsBoard");
                return;
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `The username or the password don't exist or are incorrect.`,
                //footer: '<a href>Why do I have this issue?</a>'
                //showConfirmButton: false,
                timer: 3500
            });
            //alert(`The username, ${data.username}, doesn't exist.`);
            //alert(`The username, ${data.username}, or the password, ${data.password}, don't exist or are incorrect.`);
        } catch (error) {
            //console.error(`The username, ${data.username}, or the password, ${data.password}, don't exist or are incorrect.`);
            console.error(`The username or the password don't exist or are incorrect.`);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `The username or the password don't exist or are incorrect.`,
                //footer: '<a href>Why do I have this issue?</a>'
                //showConfirmButton: false,
                timer: 3500
            });
            //alert(`The username, ${data.username}, doesn't exist.`);
            //alert(`The username, ${data.username}, or the password, ${data.password}, don't exist or are incorrect.`);
        }
    }

    return (
        <div className='padre-logIn-SignUp'>
            <div className='hijo-logIn-SignUp2'>
                <Card.Title className='centrado'>Log in to your account</Card.Title>
                <Form onSubmit = {onSubmit}>
                    <Input type="text" name="username" placeholder="Enter Username" />
                    <Input type="password" name="password" placeholder="Enter Password" /> 
                    <Button variant="primary" type="submit" style={{width: '100%', marginTop: '10px', fontWeight: 'bold'}}>Log In</Button>
                </Form>
                <p align="center" style={{width: '100%', marginTop: '25px'}}>New to WallaKeep? <Link to={`/register`}><strong>Sign Up</strong></Link></p>
            </div>
        </div>
    )
}
