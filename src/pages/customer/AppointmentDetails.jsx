import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import Navbar from "../../components/Navbar";

function AppointmentDetails() {

    const { appointmentId } = useParams();

    const [appointment, setAppointment] = useState(null);

    useEffect(() => {

        fetchAppointment();

    }, []);

    const fetchAppointment = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `https://salon-backend-vmzr.onrender.com/api/appointments/${appointmentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAppointment(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    if (
        !appointment ||
        !appointment.salon ||
        !appointment.services
    ) {

        return <h1 className="p-10">Loading...</h1>;
    }

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-5xl mx-auto px-6 py-10">

                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                    {/* TOP */}

                    <div className="p-10 border-b">

                        <div className="flex justify-between items-center">

                            <div>

                                <h1 className="text-5xl font-bold">
                                    {appointment.salon.name}
                                </h1>

                                <p className="text-gray-500 text-xl mt-3">
                                    {appointment.salon.city}
                                </p>

                            </div>

                            <span
                                className={`px-6 py-3 rounded-full font-semibold ${
                                    appointment.status === "PENDING"
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

                    <div className="p-10">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                            <div>

                                <h3 className="text-gray-500 font-semibold">
                                    Appointment Date
                                </h3>

                                <p className="text-2xl mt-3">
                                    {appointment.appointmentDate}
                                </p>

                            </div>

                            <div>

                                <h3 className="text-gray-500 font-semibold">
                                    Timing
                                </h3>

                                <p className="text-2xl mt-3">
                                    {appointment.startTime}
                                    {" - "}
                                    {appointment.endTime}
                                </p>

                            </div>

                            <div>

                                <h3 className="text-gray-500 font-semibold">
                                    Total Duration
                                </h3>

                                <p className="text-2xl mt-3">
                                    {appointment.totalDuration} Minutes
                                </p>

                            </div>

                            <div>

                                <h3 className="text-gray-500 font-semibold">
                                    Total Price
                                </h3>

                                <p className="text-2xl mt-3">
                                    ₹ {appointment.totalPrice}
                                </p>

                            </div>

                        </div>

                        {/* SERVICES */}

                        <div className="mt-14">

                            <h2 className="text-3xl font-bold mb-8">
                                Services
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {appointment.services.map((service) => (

                                    <div
                                        key={service.id}
                                        className="border rounded-2xl p-6"
                                    >

                                        <h3 className="text-2xl font-bold">
                                            {service.name}
                                        </h3>

                                        <p className="text-gray-500 mt-2">
                                            {service.category}
                                        </p>

                                        <p className="mt-4 font-semibold">
                                            ₹ {service.price}
                                        </p>

                                        <p className="mt-2 text-gray-600">
                                            {service.duration} Minutes
                                        </p>

                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AppointmentDetails;