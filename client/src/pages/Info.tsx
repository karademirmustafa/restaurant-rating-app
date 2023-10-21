import React from 'react';
import { Link } from 'react-router-dom';

interface CardLinkProps {
    to: string;
    text: string;
    iconClass?: string;
    description?:string;
}

const CardLink: React.FC<CardLinkProps> = ({ to, text,description, iconClass }) => {
    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">{text}</h5>
                    {iconClass && <i className={iconClass} />}
                    <p className="card-text">{description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <Link to={to} target="_blank" className="btn btn-sm btn-outline-secondary">Go</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Info: React.FC = () => {
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <CardLink to="/restaurants" text="Restaurants" description='View all restaurants sorted by their rating.You can rate and update the restaurant, 10 restaurants are listed on each page and pagination is enabled.' iconClass="fas fa-utensils" />
                    <CardLink to="/restaurants" text="Add Restaurant" description='If you are logged in, you can create a new restaurant' iconClass="fas fa-plus" />
                    <CardLink to="/login" text="Login" description='You can go to sign in. assigns you to the restaurant page if you are logged in' iconClass="fas fa-sign-in-alt" />
                    <CardLink to="/register" text="Register" description='You can go to sign up. assigns you to the restaurant page if you are logged in' iconClass="fas fa-user-plus" />
                    <CardLink to="http://localhost:4000/api-docs" text="Swagger Api Docs" description='You can view the api documentation.' iconClass="fas fa-user-plus" />
                </div>
            </div>
        </>
    );
};

export default Info;
