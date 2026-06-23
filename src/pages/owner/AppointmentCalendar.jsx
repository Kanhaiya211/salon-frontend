import { useEffect, useState } from "react";

import Calendar from "react-calendar";
import toast from "react-hot-toast";
import axios from "axios";

function AppointmentCalendar() {

    const [date, setDate] = useState(new Date());

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        fetchAppointments();

    }, []);

    const fetchAppointments = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/appointments/owner",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAppointments(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed To Load Appointments");
        }
    };

    const selectedDate =
        date.toISOString().split("T")[0];

    const filteredAppointments =
        appointments.filter(
            (appointment) =>
                appointment.appointmentDate ===
                selectedDate
        );

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-10">
                Appointment Calendar
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                <div className="bg-white rounded-3xl shadow-lg p-6">

                    <Calendar
                        onChange={setDate}
                        value={date}
                    />

                </div>

                <div className="lg:col-span-2">

                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold mb-8">

                            Bookings For {selectedDate}

                        </h2>

                        {
                            filteredAppointments.length === 0 ? (

                                <p className="text-gray-500">
                                    No appointments found.
                                </p>

                            ) : (

                                <div className="space-y-5">

                                    {
                                        filteredAppointments.map(
                                            (appointment) => (

                                                <div
                                                    key={appointment.id}
                                                    className="border rounded-2xl p-5"
                                                >

                                                    <div className="flex justify-between items-center">

                                                        <div>

                                                            <h3 className="text-2xl font-bold">

                                                                {
                                                                    appointment.customer.name
                                                                }

                                                            </h3>

                                                            <p className="text-gray-500 mt-1">

                                                                {
                                                                    appointment.startTime
                                                                }

                                                            </p>

                                                        </div>

                                                        <div>

                                                            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">

                                                                {
                                                                    appointment.status
                                                                }

                                                            </span>

                                                        </div>

                                                    </div>

                                                    <div className="mt-4 flex flex-wrap gap-3">

                                                        {
                                                            appointment.services.map(
                                                                (service) => (

                                                                    <span
                                                                        key={service.id}
                                                                        className="bg-gray-200 px-3 py-1 rounded-full"
                                                                    >

                                                                        {
                                                                            service.name
                                                                        }

                                                                    </span>
                                                                )
                                                            )
                                                        }

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

        </div>
    );
}

export default AppointmentCalendar;