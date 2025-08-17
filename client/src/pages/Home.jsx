import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Restaurants from "../components/Restaurants";
import RestaurantService from "../services/restaurant.service";
import Swal from "sweetalert2";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all restaurants
  useEffect(() => {
    const getAllRestaurant = async () => {
      setLoading(true);
      try {
        const response = await RestaurantService.getAllRestaurants();
        if (response.status === 200) {
          setRestaurants(response.data);
          setFilteredRestaurants(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Restaurants",
          icon: "error",
          text: error?.response?.data?.message || error.message,
          customClass: { popup: "rounded-xl" },
        });
      } finally {
        setLoading(false);
      }
    };
    getAllRestaurant();
  }, []);

  // Handle search
  const handleSearch = (keyword) => {
    setKeyword(keyword);
    if (keyword === "") {
      setFilteredRestaurants(restaurants);
      return;
    }
    const result = restaurants.filter((restaurant) => {
      return (
        restaurant.title.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.type.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    setFilteredRestaurants(result);
  };

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: { popup: "rounded-xl" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await RestaurantService.deleteRestaurant(id);
          if (response.status === 200) {
            setRestaurants(restaurants.filter((r) => r.id !== id));
            setFilteredRestaurants(filteredRestaurants.filter((r) => r.id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your restaurant has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error?.response?.data?.message || error.message,
            icon: "error",
            customClass: { popup: "rounded-xl" },
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto">
      <NavBar />

      <div>
        <h1 className="title justify-center text-3xl text-center m-5 p-5">
          Grab Restaurant
        </h1>
      </div>

      <div className="mb-5 flex justify-center items-center">
        <label className="input flex items-center gap-2 w-2xl">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="keyword"
            value={keyword}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search"
          />
        </label>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-10 text-lg">Loading restaurants...</p>
      ) : filteredRestaurants.length > 0 ? (
        <Restaurants restaurants={filteredRestaurants} onDelete={handleDelete} />
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">No restaurants found.</p>
      )}
    </div>
  );
};

export default Home;
