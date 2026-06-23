import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
function OwnerAppointments() {

    const { salonId } = useParams();

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        fetchAppointments();

    }, [salonId]);

    const fetchAppointments = async () => {

        try {

            const token = localStorage.getItem("token");

            let url = "https://salon-backend-vmzr.onrender.com/api/appointments/owner";

            if (salonId) {
                url = `https://salon-backend-vmzr.onrender.com/api/appointments/salon/${salonId}`;
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);

            setAppointments(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed To Fetch Appointments");
        }
    };

    const updateStatus = async (appointmentId, status) => {

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                `https://salon-backend-vmzr.onrender.com/api/appointments/${appointmentId}/status`,
                {
                    status: status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(`Appointment ${status}`);

            fetchAppointments();

        } catch (error) {

            console.log(error);

            toast.error("Status Update Failed");
        }
    };
    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-4xl font-bold mb-10">
                Owner Appointments
            </h1>

            {
                appointments.length === 0 ? (

                    <p className="text-gray-500 text-lg">
                        No appointments found.
                    </p>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {
                            appointments.map((appointment) => (

                                <div
                                    key={appointment.id}
                                    className="bg-white rounded-2xl shadow-lg p-6"
                                >

                                    <div className="flex justify-between items-start mb-5">

                                        <div>
                                            <h2 className="text-2xl font-bold">
                                                {appointment.salon.name}
                                            </h2>

                                            <p className="text-gray-500 mt-1">
                                                {appointment.customer.name}
                                            </p>
                                        </div>

                                        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
                                            {appointment.status}
                                        </span>

                                    </div>

                                    <div className="grid grid-cols-2 gap-5 mb-5">

                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                Date
                                            </p>

                                            <p className="font-semibold text-lg">
                                                {appointment.appointmentDate}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                Start Time
                                            </p>

                                            <p className="font-semibold text-lg">
                                                {appointment.startTime}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                Total Price
                                            </p>

                                            <p className="font-semibold text-lg">
                                                ₹ {appointment.totalPrice}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm">
                                                Total Duration
                                            </p>

                                            <p className="font-semibold text-lg">
                                                {appointment.totalDuration} mins
                                            </p>
                                        </div>

                                    </div>

                                    <div className="mb-6">

                                        <h3 className="text-lg font-bold mb-3">
                                            Services
                                        </h3>

                                        <div className="flex flex-wrap gap-2">

                                            {
                                                appointment.services.map((service) => (

                                                    <span
                                                        key={service.id}
                                                        className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm"
                                                    >
                                                        {service.name}
                                                    </span>

                                                ))
                                            }

                                        </div>

                                    </div>

                                    {
                                        appointment.notes && (

                                            <div className="mb-6">

                                                <p className="text-gray-500 text-sm mb-1">
                                                    Notes
                                                </p>

                                                <p className="text-gray-700">
                                                    {appointment.notes}
                                                </p>

                                            </div>

                                        )
                                    }

                                    <div className="flex gap-3 mt-6 flex-wrap">

                                        {
                                            appointment.status === "PENDING" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                appointment.id,
                                                                "CONFIRMED"
                                                            )
                                                        }
                                                        className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        font-semibold
                        transition
                    "
                                                    >
                                                        Confirm
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                appointment.id,
                                                                "CANCELLED"
                                                            )
                                                        }
                                                        className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        font-semibold
                        transition
                    "
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )
                                        }

                                        {
                                            appointment.status === "CONFIRMED" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                appointment.id,
                                                                "COMPLETED"
                                                            )
                                                        }
                                                        className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        font-semibold
                        transition
                    "
                                                    >
                                                        Complete
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                appointment.id,
                                                                "CANCELLED"
                                                            )
                                                        }
                                                        className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        font-semibold
                        transition
                    "
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )
                                        }

                                        {
                                            appointment.status === "COMPLETED" && (
                                                <div
                                                    className="
                    bg-blue-100
                    text-blue-700
                    px-4
                    py-2
                    rounded-xl
                    font-semibold
                "
                                                >
                                                    Appointment Completed
                                                </div>
                                            )
                                        }

                                        {
                                            appointment.status === "CANCELLED" && (
                                                <div
                                                    className="
                    bg-red-100
                    text-red-700
                    px-4
                    py-2
                    rounded-xl
                    font-semibold
                "
                                                >
                                                    Appointment Cancelled
                                                </div>
                                            )
                                        }

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

export default OwnerAppointments;