import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
function CreateSalon() {

  const [openingTime, setOpeningTime] = useState("");
const [closingTime, setClosingTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    description: "",
    image: "",
    openingTime,
closingTime
  });
  

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://salon-backend-vmzr.onrender.com/api/salons",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

      toast.success("Salon Created Successfully");

    } catch (error) {

      console.log(error);

      toast.error("Failed To Create Salon");
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-[500px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Salon
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Salon Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    <input
        type="time"
        value={openingTime}
        onChange={(e) => setOpeningTime(e.target.value)}
        className="border p-3 rounded-lg"
    />

    <input
        type="time"
        value={closingTime}
        onChange={(e) => setClosingTime(e.target.value)}
        className="border p-3 rounded-lg"
    />

</div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg"
        >
          Create Salon
        </button>

      </form>

    </div>
  );
}

export default CreateSalon;