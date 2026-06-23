import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import Navbar from "../../components/Navbar";

function SalonDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [salon, setSalon] = useState(null);

    const [services, setServices] = useState([]);

    useEffect(() => {

        fetchSalon();

        fetchServices();

    }, []);

    const fetchSalon = async () => {

        try {

            const response = await axios.get(
                `https://salon-backend-vmzr.onrender.com/api/salons/${id}`
            );

            setSalon(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const fetchServices = async () => {

        try {

            const response = await axios.get(
                `https://salon-backend-vmzr.onrender.com/api/services/salon/${id}`
            );

            setServices(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    if (!salon) {

        return <h1>Loading...</h1>;
    }

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* HERO */}

                <div className="bg-white rounded-3xl overflow-hidden shadow-lg">

                    <img
                        src={salon.image}
                        alt={salon.name}
                        className="w-full h-[400px] object-cover"
                    />

                    <div className="p-8">

                        <h1 className="text-5xl font-bold">
                            {salon.name}
                        </h1>

                        <p className="text-gray-500 text-xl mt-3">
                            {salon.city}
                        </p>

                        <p className="text-green-600 font-semibold mt-2">

                            Open • {salon.openingTime} - {salon.closingTime}

                        </p>

                        <p className="text-gray-700 mt-6 text-lg leading-8">
                            {salon.description}
                        </p>

                        <button
                            onClick={() =>
                                navigate(`/book-appointment/${salon.id}`)
                            }
                            className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"
                        >
                            Book Appointment
                        </button>

                    </div>

                </div>

                {/* SERVICES */}

                <div className="mt-16">

                    <h2 className="text-4xl font-bold mb-10">
                        Services
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {services.map((service) => (

                            <div
                                key={service.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md"
                            >

                                <img
                                    src={
                                        service.image ||
                                        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f"
                                    }
                                    alt={service.name}
                                    className="w-full h-56 object-cover"
                                />

                                <div className="p-5">

                                    <h3 className="text-2xl font-bold">
                                        {service.name}
                                    </h3>

                                    <p className="text-gray-500 mt-2">
                                        {service.category}
                                    </p>

                                    <p className="mt-4 text-lg font-semibold">
                                        ₹ {service.price}
                                    </p>

                                    <p className="text-gray-600 mt-2">
                                        {service.duration} Minutes
                                    </p>

                                    <p className="text-gray-700 mt-4">
                                        {service.description}
                                    </p>

                                    <div className="mt-5">

                                        {service.available ? (

                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                Available
                                            </span>

                                        ) : (

                                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                                Not Available
                                            </span>
                                        )}

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SalonDetails;