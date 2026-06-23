import { useEffect, useState } from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import axios from "axios";

import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";

function CustomerAppointmentDetails() {

    const { appointmentId } =
        useParams();

    const navigate =
        useNavigate();

    const [appointment, setAppointment] =
        useState(null);

    useEffect(() => {

        fetchAppointment();

    }, []);

    const fetchAppointment = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(

                    `http://localhost:8080/api/appointments/${appointmentId}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setAppointment(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    const cancelAppointment = async () => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            // REFUND IF PAYMENT EXISTS

            if (

                appointment.payment

                &&

                appointment.payment.status
                ===
                "SUCCESS"

            ) {

                const refundResponse =
                    await axios.post(

                        "http://localhost:8080/payments/refund",

                        {
                            appointmentId:
                                appointment.id
                        },

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                toast.success(
                    refundResponse.data
                );

            } else {

                await axios.put(

                    `http://localhost:8080/api/appointments/${appointmentId}/cancel`,

                    {},

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                toast.success(
                    "Appointment Cancelled"
                );
            }

            fetchAppointment();

        } catch (error) {

            console.log(error);

            toast.error(

                error?.response?.data?.message

                ||

                error?.response?.data

                ||

                "Cancellation Failed"
            );
        }
    };

    if (!appointment) {

        return <h1>Loading...</h1>;
    }

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-5xl mx-auto p-8">

                <div className="bg-white rounded-3xl shadow-xl p-10">

                    <div className="flex justify-between items-start">

                        <div>

                            <h1 className="text-5xl font-bold">

                                Appointment Details

                            </h1>

                            <p className="text-gray-500 mt-3 text-xl">

                                {
                                    appointment.salon?.name
                                }

                            </p>

                        </div>

                        <span
                            className="
                                bg-purple-100
                                text-purple-700
                                px-5
                                py-3
                                rounded-full
                                font-bold
                            "
                        >

                            {
                                appointment.status
                            }

                        </span>

                    </div>

                    {/* INFO */}

                    <div className="grid md:grid-cols-2 gap-8 mt-12">

                        <div className="bg-gray-50 p-6 rounded-2xl">

                            <h2 className="text-2xl font-bold mb-5">

                                Appointment Info

                            </h2>

                            <div className="space-y-3 text-lg">

                                <p>

                                    <span className="font-bold">
                                        Date:
                                    </span>

                                    {" "}

                                    {
                                        appointment.appointmentDate
                                    }

                                </p>

                                <p>

                                    <span className="font-bold">
                                        Time:
                                    </span>

                                    {" "}

                                    {
                                        appointment.startTime
                                    }

                                </p>

                                <p>

                                    <span className="font-bold">
                                        Total:
                                    </span>

                                    {" "}

                                    ₹
                                    {
                                        appointment.totalPrice
                                    }

                                </p>

                            </div>

                        </div>

                        {/* RULES */}

                        <div className="bg-red-50 p-6 rounded-2xl">

                            <h2 className="text-2xl font-bold text-red-600 mb-5">

                                Cancellation Rules

                            </h2>

                            <ul className="space-y-3 text-lg text-gray-700 list-disc ml-5">

                                <li>
                                    Cannot cancel completed appointments
                                </li>

                                <li>
                                    Cannot cancel already cancelled appointments
                                </li>

                                <li>
                                    Cannot cancel within 1 hour of appointment
                                </li>

                                <li>
                                    Cancelled slots become available again
                                </li>

                            </ul>

                        </div>

                    </div>

                    {/* SERVICES */}

                    <div className="mt-12">

                        <h2 className="text-3xl font-bold mb-6">

                            Services

                        </h2>

                        <div className="flex flex-wrap gap-4">

                            {
                                appointment.services?.map(
                                    (service) => (

                                        <span
                                            key={service.id}
                                            className="
                                                bg-purple-100
                                                text-purple-700
                                                px-5
                                                py-3
                                                rounded-full
                                                text-lg
                                            "
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

                    {/* BUTTONS */}

                    <div className="mt-14 flex gap-5">

                        {
                            appointment.status !==
                            "CANCELLED"

                            &&

                            appointment.status !==
                            "COMPLETED"

                            && (

                                <button

                                    onClick={
                                        cancelAppointment
                                    }

                                    className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-8
                    py-4
                    rounded-2xl
                    text-lg
                    font-bold
                    transition
                "
                                >

                                    {
                                        appointment.payment?.status
                                            ===
                                            "SUCCESS"

                                            ?

                                            "Cancel & Refund"

                                            :

                                            "Cancel Appointment"
                                    }

                                </button>
                            )
                        }

                        {
                            appointment.payment?.status
                            ===
                            "REFUNDED"

                            && (

                                <span
                                    className="
                    bg-green-100
                    text-green-700
                    px-8
                    py-4
                    rounded-2xl
                    text-lg
                    font-bold
                "
                                >

                                    Refunded

                                </span>
                            )
                        }

                        <button

                            onClick={() =>
                                navigate(
                                    "/my-appointments"
                                )
                            }

                            className="
            bg-black
            text-white
            px-8
            py-4
            rounded-2xl
            text-lg
        "
                        >

                            Back

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CustomerAppointmentDetails;