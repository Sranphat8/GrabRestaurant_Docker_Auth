import React from "react";
import Swal from "sweetalert2";

const Card = ({ id, img, title, type, onDelete }) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "ยืนยันการลบ?",
      text: "คุณต้องการลบร้านอาหารนี้ใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      customClass: { popup: "rounded-xl" },
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/restaurants/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete restaurant");
        }
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ!",
          showConfirmButton: false,
          timer: 1200,
          customClass: { popup: "rounded-xl" },
        });
        onDelete(id); // เรียก callback เพื่ออัปเดตรายการในหน้า parent
      } catch (err) {
        console.error("Error deleting restaurant:", err);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: `ไม่สามารถลบร้านอาหารได้: ${err.message}`,
          customClass: { popup: "rounded-xl" },
        });
      }
    }
  };

  return (
    <div className="card w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 overflow-hidden">
      <figure className="h-48">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </figure>

      <div className="card-body px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
        <p className="text-sm text-gray-500 mb-4">{type}</p>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-full hover:bg-gray-100 hover:text-red-600 transition focus:outline-none focus:ring-4 focus:ring-gray-100"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={() => (window.location.href = `/update/${id}`)}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-full hover:bg-gray-100 hover:text-yellow-600 transition focus:outline-none focus:ring-4 focus:ring-gray-100"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
