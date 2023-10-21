import React, { useEffect, useState } from 'react';
import RestaurantTable from '../components/Restaurant/Table';
import { RestaurantI } from '../types';
import restaurantService from '../services/RestaurantService';


const Home: React.FC = () => {
    const [restaurants, setRestaurants] = useState<RestaurantI[]>([]);
    const [pagination, setPagination] = useState<{ currentPage: number, totalItems: number, totalPages: number }>();
    const [sorting, setSorting] = useState<{ order: 'ASC' | 'DESC' }>({
        order: 'DESC',      // Default sorting order
    });

    const fetchRestaurantData = async (page: number, sortOrder: 'ASC' | 'DESC') => {
        const rest = await restaurantService.getRestaurants(page, sortOrder);
        setPagination({ currentPage: rest.page, totalItems: rest.totalItems, totalPages: rest.totalPages });
        setRestaurants(rest.restaurants);
    };

    useEffect(() => {
        (async () => {
            fetchRestaurantData(1, sorting.order);
        })()
    }, []);

    const handlePageChange = async (newPage: number) => {
        fetchRestaurantData(newPage, sorting.order);
    };

    const handleSortChange = async () => {
        const newSortOrder = sorting.order === 'ASC' ? 'DESC' : 'ASC';
        setSorting({ order: newSortOrder });
        fetchRestaurantData(1, newSortOrder);
    };
   


    return (
        <>
            <RestaurantTable
                restaurants={restaurants}
                pagination={pagination || { currentPage: 1, totalItems: 0, totalPages: 1 }}
                onPageChange={handlePageChange}
                onSortChange={handleSortChange}
                currentSort={sorting}
            />
      
        </>
    );
};
export default Home;