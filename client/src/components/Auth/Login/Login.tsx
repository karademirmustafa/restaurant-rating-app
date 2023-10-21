import React, { useState } from 'react'
import authService from '../../../services/AuthService'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
type Props = {}


const Login = (props: Props) => {

    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = loginForm;
        const result = await authService.login(email, password);
        if (result.error) {
            toast.error(result.errorDetails.message);
            return setLoginForm(initialLoginForm)

        }
        toast.success("Successfull sign in")
        navigate("/");
    }
    const initialLoginForm = { email: "", password: "" }
    const [loginForm, setLoginForm] = useState(initialLoginForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setLoginForm({ ...loginForm, [name]: value })


    }
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center ">
                            Sign In
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" onChange={handleChange} className="form-control" value={loginForm.email} name="email" id="email" placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" onChange={handleChange} value={loginForm.password} id="password" name="password" placeholder="Enter password" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary mt-2 w-100">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login