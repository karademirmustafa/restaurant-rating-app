import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { RestaurantI } from '../../types';
import restaurantService from '../../services/RestaurantService';
import authService from '../../services/AuthService';
import RestaurantForm from './Form';
import { Link, useNavigate } from 'react-router-dom';
import { MdStarRate } from "react-icons/md";
import toast from 'react-hot-toast';

interface RestaurantTableProps {
  restaurants: RestaurantI[];
  pagination: { currentPage: number, totalItems: number, totalPages: number };
  onPageChange: (newPage: number) => void;
  onSortChange: () => void;
  currentSort: { order: string };
}

const RestaurantTable: React.FC<RestaurantTableProps> = ({ restaurants, pagination, onPageChange, currentSort, onSortChange }: RestaurantTableProps) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const openModal = (restaurant: RestaurantI) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedRestaurant(null);
    setShowModal(false);
    setRating(0);
  };

  const handleVote = async () => {
    const id = selectedRestaurant?._id;

    const result = await restaurantService.rateRestaurant(id, rating, authService.getJwtCookie());
    if (result.error) {
      return toast.error(result.errorDetails.message);
    }
    toast.success(`This ${selectedRestaurant.name} restaurant was given ${rating} rates`)
    onPageChange(1); //refresh page

    closeModal();
  };


  const pageCount = pagination.totalPages; // Total Pages
  const pagesArray = Array.from({ length: pageCount }, (_, i) => i + 1);
  const addRestaurant = async (restaurant: RestaurantI) => {
    const { name, description } = restaurant;
    const result = await restaurantService.createRestaurant(name || "", description || "", 5, authService.getJwtCookie());
    if(result.error){
      
      return toast.error(result.errorDetails.message);
    }
    if(result){
      onPageChange(1);
      return toast.success("Added restaurant");
    }
    

  };
  return (
    <div className="container">
      <h2>Restaurant List</h2>
      {authService.getJwtCookie() ? <RestaurantForm onSubmit={addRestaurant} /> : <Link to="/login" >Sign in to add a restaurant</Link>}
      <Table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Restaurant Name</th>
            <th scope="col">Description</th>
            <th scope="col">
              Rating
              <Button variant="link" onClick={onSortChange}>
                {currentSort.order === 'ASC' ? '▲' : '▼'}
              </Button></th>
          </tr>
        </thead>
        <tbody>
          {restaurants?.map((restaurant, index) => (
            <tr key={index}>
              <th scope="row">{index + 1 + (pagination.currentPage - 1) * 10}</th>
              <td>{restaurant.name}</td>
              <td>{restaurant.description}</td>
              <td>
                {restaurant.rating}{' '}
                <MdStarRate />
              </td>
              <td>{authService.getJwtCookie() ? <button onClick={() => openModal(restaurant)}>Rate this restaurant</button> : <button onClick={() => navigate('/login')}>Login to rate the restaurant</button>}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => onPageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
        >
          Previous
        </button>
        {pagesArray?.map((page) => (
          <button
            className="mx-1"
            key={page}
            onClick={() => onPageChange(page)}
            disabled={page === pagination.currentPage}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage >= pagination.totalPages}
        >
          Next
        </button>
      </div>






      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Restaurant Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRestaurant && (
            <div>
              <h3 className="text-center">The restaurant you'll rate: <b>{selectedRestaurant.name}</b></h3>
              <div>
                <h3 className="text-center">Rate this restaurant</h3>
                <h3 className="text-center">Average rate of the restaurant : <b>{selectedRestaurant.rating}</b></h3>
                <div className="d-flex justify-content-center">{[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star === rating ? 0 : star)}
                    style={{ cursor: 'pointer', fontSize: '50px', color: star <= rating ? 'gold' : 'gray' }}
                  >
                    ★
                  </span>
                ))}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleVote()}>
            Rate
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RestaurantTable;
