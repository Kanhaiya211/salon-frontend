import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ManageServices() {

    const { salonId } = useParams();

    const [editingServiceId, setEditingServiceId] = useState(null);

    const [services, setServices] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        duration: "",
        description: "",
        image: "",
        available: true
    });

    useEffect(() => {

        fetchServices();

    }, []);

    const fetchServices = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `https://salon-backend-vmzr.onrender.com/api/services/salon/${salonId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setServices(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleChange = (e) => {

        const value =
            e.target.type === "checkbox"
                ? e.target.checked
                : e.target.value;

        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    if (editingServiceId) {

      await axios.put(
        `https://salon-backend-vmzr.onrender.com/api/services/${editingServiceId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Service Updated");

    } else {

      await axios.post(
        `https://salon-backend-vmzr.onrender.com/api/services/salon/${salonId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Service Created");
    }

    fetchServices();

    setFormData({
      name: "",
      category: "",
      price: "",
      duration: "",
      image: "",
      description: "",
      available: true,
    });

    setEditingServiceId(null);

  } catch (error) {

    console.log(error);

    toast.error("Failed");
  }
};

    const handleDelete = async (serviceId) => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `https://salon-backend-vmzr.onrender.com/api/services/${serviceId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Service Deleted");

            fetchServices();

        } catch (error) {

            console.log(error);

            toast.error("Delete Failed");
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-4xl font-bold mb-10">
                Manage Services
            </h1>

            {/* CREATE FORM */}

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg mb-10"
            >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <input
                        type="text"
                        name="name"
                        placeholder="Service Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        name="duration"
                        placeholder="Duration (Minutes)"
                        value={formData.duration}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        className="border p-3 rounded-lg md:col-span-2"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-3 rounded-lg md:col-span-2"
                    />

                </div>

                <div className="flex items-center gap-3 mt-5">

                    <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleChange}
                    />

                    <p>Available</p>

                </div>

                <button
                    type="submit"
                    className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-xl"
                >
                   {editingServiceId ? "Update Service" : "Create Service"}
                </button>

            </form>

            {/* SERVICES LIST */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {
                    services.map((service) => (

                        <div
                            key={service.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        >

                            <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-52 object-cover"
                            />

                            <div className="p-5">

                                <h2 className="text-2xl font-bold">
                                    {service.name}
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    {service.category}
                                </p>

                                <p className="mt-2 font-semibold">
                                    ₹ {service.price}
                                </p>

                                <p className="text-gray-600">
                                    {service.duration} Minutes
                                </p>

                                <p className="mt-3 text-gray-700">
                                    {service.description}
                                </p>

                                <p
                                    className={`mt-3 font-semibold ${service.available
                                            ? "text-green-600"
                                            : "text-red-500"
                                        }`}
                                >
                                    {service.available
                                        ? "Available"
                                        : "Unavailable"}
                                </p>

                                <div className="flex gap-3 mt-5">

                                    <button
                                        onClick={() => {
                                            setFormData({
                                                name: service.name,
                                                category: service.category,
                                                price: service.price,
                                                duration: service.duration,
                                                image: service.image,
                                                description: service.description,
                                                available: service.available,
                                            });

                                            setEditingServiceId(service.id);
                                        }}
                                        className="bg-black text-white px-4 py-2 rounded-lg"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(service.id)
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>
    );
}

export default ManageServices;