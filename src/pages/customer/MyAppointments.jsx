import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
function MyAppointments() {

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        fetchAppointments();

    }, []);

    const fetchAppointments = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "https://salon-backend-vmzr.onrender.com/api/appointments/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAppointments(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return <h1 className="p-10">Loading...</h1>;
    }

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-10">

                <h1 className="text-5xl font-bold mb-10">
                    My Appointments
                </h1>

                {
                    appointments.length === 0 ? (

                        <div className="bg-white rounded-2xl p-10 shadow-md">

                            <h2 className="text-2xl font-semibold">
                                No Appointments Found
                            </h2>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {
                                appointments.map((appointment) => (

                                    <div
                                        key={appointment.id}
                                        onClick={() =>
                                            navigate(
                                                `/customer/appointment/${appointment.id}`
                                            )
                                        }
                                        className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition"
                                    >

                                        {/* TOP */}

                                        <div className="p-8 border-b">

                                            <div className="flex justify-between items-center">

                                                <div>

                                                    <h2 className="text-3xl font-bold">
                                                        {appointment.salon.name}
                                                    </h2>

                                                    <p className="text-gray-500 mt-2">
                                                        {appointment.salon.city}
                                                    </p>

                                                </div>

                                                <span
                                                    className={`px-5 py-2 rounded-full text-sm font-semibold ${appointment.status === "PENDING"
                                                        ? "bg-yellow-100 text-yellow-700"

                                                        : appointment.status === "CONFIRMED"
                                                            ? "bg-green-100 text-green-700"

                                                            : "bg-red-100 text-red-600"
                                                        }`}
                                                >
                                                    {appointment.status}
                                                </span>

                                            </div>

                                        </div>

                                        {/* BODY */}

                                        <div className="p-8">

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                                <div>

                                                    <h3 className="font-semibold text-gray-500">
                                                        Appointment Date
                                                    </h3>

                                                    <p className="text-xl mt-2">
                                                        {appointment.appointmentDate}
                                                    </p>

                                                </div>

                                                <div>

                                                    <h3 className="font-semibold text-gray-500">
                                                        Timing
                                                    </h3>

                                                    <p className="text-xl mt-2">
                                                        {appointment.startTime}
                                                        {" - "}
                                                        {appointment.endTime}
                                                    </p>

                                                </div>

                                                <div>

                                                    <h3 className="font-semibold text-gray-500">
                                                        Total Amount
                                                    </h3>

                                                    <p className="text-xl mt-2">
                                                        ₹ {appointment.totalPrice}
                                                    </p>

                                                </div>

                                            </div>

                                            {/* SERVICES */}

                                            <div className="mt-10">

                                                <h3 className="text-2xl font-bold">
                                                    Services
                                                </h3>

                                                <div className="flex flex-wrap gap-3 mt-5">

                                                    {
                                                        appointment.services.map((service) => (

                                                            <span
                                                                key={service.id}
                                                                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full"
                                                            >
                                                                {service.name}
                                                            </span>
                                                        ))
                                                    }

                                                </div>

                                            </div>
                                            <div className="mt-8 flex gap-4">

                                                <a
                                                    href={`https://salon-backend-vmzr.onrender.com/invoice/${appointment.id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="
            bg-black
            hover:bg-gray-800
            text-white
            px-5
            py-3
            rounded-xl
            font-semibold
            transition
        "
                                                >

                                                    Download Invoice

                                                </a>

                                            </div>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default MyAppointments;