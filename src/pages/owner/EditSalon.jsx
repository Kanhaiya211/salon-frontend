import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
function EditSalon() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    description: "",
    image: ""
  });

  useEffect(() => {

    fetchSalon();

  }, []);

  const fetchSalon = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://salon-backend-vmzr.onrender.com/api/salons/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFormData(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `https://salon-backend-vmzr.onrender.com/api/salons/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Salon Updated");

      navigate("/owner/my-salons");

    } catch (error) {

      console.log(error);

      toast.error("Update Failed");
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleUpdate}
        className="bg-white p-10 rounded-2xl shadow-xl w-[500px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Salon
        </h1>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg"
        >
          Update Salon
        </button>

      </form>

    </div>
  );
}

export default EditSalon;