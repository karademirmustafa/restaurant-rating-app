import React, { useState } from 'react'
import authService from '../../../services/AuthService'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
type Props = {}

const Register = (props: Props) => {
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password, repassword } = registerForm;
        console.log(password,repassword)
        if (password === repassword) {

            const result = await authService.register(email, password);
            if(result.error){
                setRegisterForm(initialRegisterForm);
               return toast.error(result.errorDetails.message);
            }
            return navigate('/')
        } else {
            return toast.error("Register failed!");
            // error message state empty
        }

    }
    const initialRegisterForm={email:"",password:"",repassword:""}
    const [registerForm, setRegisterForm] = useState(initialRegisterForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setRegisterForm({ ...registerForm, [name]: value })


    }
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center ">
                            Sign Up
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Email:</label>
                                    <input type="text" className="form-control" onChange={handleChange}  value={registerForm.email} id="email"  name="email" placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" onChange={handleChange} value={registerForm.password} id="password" name="password" placeholder="Enter password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="repassword">Re Password:</label>
                                    <input type="password" className="form-control" onChange={handleChange} value={registerForm.repassword} id="repassword" name="repassword" placeholder="Enter repassword" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary mt-2 w-100">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register