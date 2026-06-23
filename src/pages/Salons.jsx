import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
function Salons() {

    const [salons, setSalons] = useState([]);

    const [search, setSearch] = useState("");

    const [city, setCity] = useState("");

    useEffect(() => { fetchSalons(); }, [search, city]);

    const fetchSalons = async () => {

        try {

            let url = "https://salon-backend-vmzr.onrender.com/api/salons";

            if (search) {
                url += `?search=${search}`;
            }

            if (city) {
                url += `?city=${city}`;
            }

            const response = await axios.get(url);

            setSalons(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold mb-10">
                    Explore Salons
                </h1>

                <div className="flex gap-4 mb-8">

                    <input
                        type="text"
                        placeholder="Search Salon"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-3 rounded-xl w-full"
                    />

                    <input
                        type="text"
                        placeholder="Search City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="border p-3 rounded-xl w-full"
                    />

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {salons.map((salon) => (

                        <Link
                            to={`/salons/${salon.id}`}
                            key={salon.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                        >

                            <img
                                src={
                                    salon.image ||
                                    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f"
                                }
                                alt={salon.name}
                                className="w-full h-56 object-cover bg-gray-200"
                            />

                            <div className="p-5">

                                <h2 className="text-2xl font-bold">
                                    {salon.name}
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    {salon.city}
                                </p>

                                <p className="text-gray-600 mt-4 line-clamp-3">
                                    {salon.description}
                                </p>

                                {/* <Link
                                    to={`/salons/${salon.id}`}
                                    className="inline-block mt-6 bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700"
                                >
                                    View Salon
                                </Link> */}

                                <p className="mt-6 text-purple-600 font-semibold">
                                    Click To Explore →
                                </p>
                            </div>

                        </Link>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default Salons;