import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function MySalons() {

    const [salons, setSalons] = useState([]);

    useEffect(() => {

        fetchMySalons();

    }, []);
    const navigate = useNavigate();
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm("Delete this salon?");

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `https://salon-backend-vmzr.onrender.com/api/salons/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Salon Deleted");

            fetchMySalons();

        } catch (error) {

            console.log(error);

            toast.error("Delete Failed");
        }
    };

    const fetchMySalons = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "https://salon-backend-vmzr.onrender.com/api/salons/my-salons",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setSalons(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed To Fetch Salons");
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-4xl font-bold mb-10">
                My Salons
            </h1>

            {
                salons.length === 0 ? (

                    <p className="text-gray-500">
                        No salons created yet.
                    </p>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {
                            salons.map((salon) => (

                                <div
                                    key={salon.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                >

                                    <img
                                        src={salon.image}
                                        alt={salon.name}
                                        className="w-full h-52 object-cover"
                                    />

                                    <div className="p-6">

                                        <h2 className="text-2xl font-bold mb-2">
                                            {salon.name}
                                        </h2>

                                        <p className="text-gray-600 mb-2">
                                            {salon.city}
                                        </p>

                                        <p className="text-gray-600 mb-2">
                                            {salon.phone}
                                        </p>

                                        <p className="text-gray-700 mb-5">
                                            {salon.description}
                                        </p>

                                        <div className="flex flex-wrap gap-3">

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/owner/salon/${salon.id}/services`
                                                    )
                                                }
                                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                                            >
                                                Add Service
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/owner/appointments/${salon.id}`
                                                    )
                                                }
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                            >
                                                Appointments
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/owner/edit-salon/${salon.id}`
                                                    )
                                                }
                                                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(salon.id)
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>
    );
}

export default MySalons;