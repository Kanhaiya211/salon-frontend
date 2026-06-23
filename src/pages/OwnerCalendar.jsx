import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";
function OwnerCalendar() {

    const [appointments, setAppointments] =
        useState([]);

    const [selectedDate, setSelectedDate] =
        useState(new Date());

    useEffect(() => {

        fetchAppointments();

    }, []);

    const fetchAppointments = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(

                    "https://salon-backend-vmzr.onrender.com/api/appointments/owner",

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setAppointments(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

   const formatDate = (date) => {

    const year = date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

    const selectedAppointments =
        appointments.filter(
            (appointment) =>
                appointment.appointmentDate ===
                formatDate(selectedDate)
        );

    const totalRevenue =
        selectedAppointments.reduce(
            (total, appointment) =>
                total +
                appointment.totalPrice,
            0
        );

    const markClosedDate = async () => {

        try {

            const token =
                localStorage.getItem("token");

            await axios.post(

                `https://salon-backend-vmzr.onrender.com/api/appointments/closed-date` +

                `?salonId=7&date=${formatDate(selectedDate)}`,

                {},

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            toast.success(
                "Salon Closed Successfully"
            );

        } catch (error) {

            console.log(error);

            toast.error("Failed");
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-10">

                Appointment Calendar

            </h1>

            <div className="grid lg:grid-cols-2 gap-10">

                {/* LEFT SIDE */}

                <div className="bg-white p-8 rounded-3xl shadow-xl">

                    <Calendar

                        onChange={(date) => {

                            setSelectedDate(date);
                        }}

                        value={selectedDate}

                    />

                    <button

                        onClick={markClosedDate}

                        className="
                            mt-6
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            font-bold
                        "
                    >

                        Mark Closed Date

                    </button>

                </div>

                {/* RIGHT SIDE */}

                <div className="bg-white p-8 rounded-3xl shadow-xl">

                    <div className="flex justify-between items-center mb-8">

                        <div>

                            <h2 className="text-4xl font-bold">

                                Bookings For

                            </h2>

                            <p className="text-gray-500 text-xl mt-2">

                                {
                                    formatDate(
                                        selectedDate
                                    )
                                }

                            </p>

                        </div>

                        <div className="bg-purple-100 px-6 py-4 rounded-2xl">

                            <p className="text-gray-500">

                                Revenue

                            </p>

                            <h2 className="text-3xl font-bold text-purple-700">

                                ₹ {totalRevenue}

                            </h2>

                        </div>

                    </div>

                    {

                        selectedAppointments.length === 0 ? (

                            <div className="text-center py-20">

                                <h2 className="text-3xl font-bold text-gray-400">

                                    No Appointments

                                </h2>

                            </div>

                        ) : (

                            <div className="space-y-5">

                                {

                                    selectedAppointments.map(
                                        (appointment) => (

                                            <div
                                                key={appointment.id}
                                                className="
                                                    border
                                                    rounded-3xl
                                                    p-6
                                                    shadow-sm
                                                "
                                            >

                                                <div className="flex justify-between">

                                                    <div>

                                                        <h2 className="text-2xl font-bold">

                                                            {
                                                                appointment.customer?.name
                                                            }

                                                        </h2>

                                                        <p className="text-gray-500 mt-1">

                                                            {
                                                                appointment.startTime
                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <span
                                                            className="
                                                                bg-purple-100
                                                                text-purple-700
                                                                px-4
                                                                py-2
                                                                rounded-full
                                                                font-bold
                                                            "
                                                        >

                                                            {
                                                                appointment.status
                                                            }

                                                        </span>

                                                    </div>

                                                </div>

                                                <div className="mt-5">

                                                    <h2 className="text-2xl font-bold text-green-600">

                                                        ₹
                                                        {
                                                            appointment.totalPrice
                                                        }

                                                    </h2>

                                                </div>

                                            </div>
                                        )
                                    )
                                }

                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default OwnerCalendar;