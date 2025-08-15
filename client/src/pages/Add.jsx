import React, { useState } from "react";
import NavBar from "../components/NavBar"; 
import Swal from "sweetalert2";

const API_BASE_URL = "http://localhost:5000/api/v1/restaurants";

const Add = () => {
  const [form, setForm] = useState({
    title: "",
    type: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.type || !form.img) {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ครบถ้วน",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        customClass: { popup: "rounded-xl" },
      });
      return;
    }

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.title,
          type: form.type,
          imageUrl: form.img,
        }),
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          console.error("ไม่สามารถ parse ข้อความ error จาก backend");
        }
        throw new Error(errorMessage);
      }

      Swal.fire({
        icon: "success",
        title: "เพิ่มร้านอาหารสำเร็จ!",
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: "rounded-xl" },
      }).then(() => {
        window.location.href = "/"; 
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: `ไม่สามารถเพิ่มร้านอาหารได้: ${err.message}`,
        customClass: { popup: "rounded-xl" },
      });
      console.error("Error adding restaurant:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100 px-4">
      <NavBar />
      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6 mt-10">
        <h2 className="text-3xl font-bold text-center text-neutral">เพิ่มร้านอาหาร</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label font-semibold text-base-content">ชื่อร้านอาหาร</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input input-bordered input-primary w-full"
              placeholder="เช่น ชาบูอร่อยเด็ด"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-content">ประเภทอาหาร</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="input input-bordered input-primary w-full"
              placeholder="เช่น ชาบู, ปิ้งย่าง"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-content">ลิงก์รูปภาพ</label>
            <input
              type="text"
              name="img"
              value={form.img}
              onChange={handleChange}
              className="input input-bordered input-primary w-full"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {form.img && (
            <div className="flex items-center justify-center mt-2">
              <img src={form.img} alt="preview" className="h-32 rounded-md" />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full rounded-full tracking-wide text-lg">
            เพิ่มร้านอาหาร
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
