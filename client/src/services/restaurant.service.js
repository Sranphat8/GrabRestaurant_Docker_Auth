import api from '../services/api.js'; 
const RESTO_API = "/restaurants";


//get all restaurants
const getAllRestaurants = async () => {
    return await api.get(RESTO_API);
};

//get restaurant by id
const getRestaurantById = async (id) => {
    // return await api.get(RESTO_API + '/' + id); แบบเก่า 
    return await api.get(`${RESTO_API}/${id}`);
};

//update restaurant by id
const updateRestaurantById = async (id, restaurant) => {
    return await api.put(`${RESTO_API}/${id}`, restaurant);
};

//add restaurant
const insertRestaurant = async (restaurant) => {
    return await api.post(RESTO_API, restaurant);
};

//delete restaurant
const deleteRestaurantById = async (id) => {
    return await api.delete(`${RESTO_API}/${id}`);
};

const RestaurantsService = {
    getAllRestaurants,
    getRestaurantById,
    updateRestaurantById,
    insertRestaurant,
    deleteRestaurantById,
};

export default RestaurantsService;