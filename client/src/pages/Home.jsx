// Home.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Restaurants from "../components/Restaurants";

const API_BASE_URL = "http://localhost:5000/api/v1/restaurants";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_BASE_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        
        const formattedData = data.map((item) => ({
          id: item.id,
          title: item.name,
          type: item.type,
          img: `http://localhost:5000/${item.imageUrl}`, 
        }));

        setRestaurants(formattedData);
      } catch (err) {
        console.error(err);
        setError("Failed to load restaurants.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filtered = restaurants.filter(
    (r) =>
      r.title.toLowerCase().includes(keyword.toLowerCase()) ||
      r.type.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-12 max-w-5xl">
        <h1 className="text-4xl font-extralight mb-8 text-center">
          All Restaurants
        </h1>

        <div className="max-w-xl mx-auto mb-10">
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="block w-full p-3 pl-3 text-sm border rounded-full"
            placeholder="Search restaurants..."
          />
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <Restaurants restaurants={filtered} />
        )}
      </main>
    </div>
  );
};

export default Home;
