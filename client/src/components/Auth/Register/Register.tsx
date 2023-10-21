import React from 'react'

type Props = {}

const Register = (props: Props) => {
  return (
    <div className="container">
        <div className="row justify-content-center mt-5">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header text-center ">
                        Sign Up
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">Email:</label>
                                <input type="text" className="form-control" id="email" placeholder="Enter email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Re Password:</label>
                                <input type="password" className="form-control" id="repassword" placeholder="Enter repassword"/>
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