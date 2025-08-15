import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const API_BASE_URL = "http://localhost:5000/api/v1/restaurants";

const Update = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    title: "",
    type: "",
    img: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "ไม่พบร้านอาหาร",
              text: `ไม่พบร้านอาหารด้วย ID: ${id}`,
              customClass: { popup: "rounded-xl" },
            }).then(() => window.location.href = "/");
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRestaurant({
          title: data.name,
          type: data.type,
          img: data.imageUrl,
        });
      } catch (err) {
        console.error("Error fetching restaurant:", err);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: `ไม่สามารถโหลดข้อมูลร้านอาหารได้: ${err.message}`,
          customClass: { popup: "rounded-xl" },
        });
        setError(`Failed to load restaurant: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async () => {
    if (!restaurant.title || !restaurant.type || !restaurant.img) {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ครบถ้วน",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        customClass: { popup: "rounded-xl" },
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: restaurant.title,
          type: restaurant.type,
          imageUrl: restaurant.img,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      Swal.fire({
        icon: "success",
        title: "อัปเดตข้อมูลสำเร็จ!",
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: "rounded-xl" },
      }).then(() => (window.location.href = "/"));
    } catch (err) {
      console.error("Error updating restaurant:", err);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: `ไม่สามารถอัปเดตข้อมูลได้: ${err.message}`,
        customClass: { popup: "rounded-xl" },
      });
    }
  };

  if (loading) return <p className="text-center mt-20">Loading restaurant data...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-16">
      <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-3xl shadow-md max-w-lg w-full p-10">
        <h2 className="text-3xl font-light mb-8 text-gray-900 text-center tracking-wide">
          แก้ไขข้อมูลร้านอาหาร
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">ชื่อร้านอาหาร</label>
            <input
              type="text"
              name="title"
              value={restaurant.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">ประเภทอาหาร</label>
            <input
              type="text"
              name="type"
              value={restaurant.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">URL รูปภาพ</label>
            <input
              type="text"
              name="img"
              value={restaurant.img}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {restaurant.img && (
              <img src={restaurant.img} alt="Restaurant" className="mt-4 h-32 rounded-md object-cover" />
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold transition"
          >
            บันทึกการเปลี่ยนแปลง
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
