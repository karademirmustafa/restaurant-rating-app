import axios from "../api/axios";
import { handleAxiosError } from "../api/axios.error";
class RestaurantService {


    async getRestaurants(page = 1, sorting = "ASC") {


        const path = `restaurants?page=${page}&sorting=${sorting}`;
        try {
            const restaurants = await axios.get(path);
            return restaurants.data;

        } catch (err) {
            return handleAxiosError(err)
        }

    }

    async rateRestaurant(id: string, rate: number, token: string) {
        //  id --> restaurant_id
        const path = `restaurants/rate/${id}`;
        const body = {
            rate
        }

        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const result = await axios.post(path, body, options)
            return result?.data;
        } catch (err) {
            return handleAxiosError(err)
        }



    }

    async createRestaurant(name: string, description: string, rating: number, token: string) {

        const path = `restaurants`;
        const body = {
            name,
            description,
            // rating,
        }
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const result = await axios.post(path, body, options);
            return result.data;
        } catch (err) { 
            return handleAxiosError(err) }

    }


}

export default new RestaurantService();