import React, { useState } from 'react';
import { RestaurantI } from '../../types';

interface RestaurantFormProps {
  onSubmit: (restaurant: RestaurantI) => void;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    const restaurant: RestaurantI = {
      name,
      description,
      rating,
    };
    onSubmit(restaurant);
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleModalOpen}>
        Add a New Restaurant
      </button>

      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add a New Restaurant</h5>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Restaurant Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Add Restaurant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantForm;
