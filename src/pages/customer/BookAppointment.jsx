import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";

function BookAppointment() {

    const { salonId } = useParams();

    const [availableSlots, setAvailableSlots] = useState([]);

    const navigate = useNavigate();

    const [salon, setSalon] = useState(null);

    const [services, setServices] = useState([]);

    const [selectedServices, setSelectedServices] = useState([]);

    const [appointmentDate, setAppointmentDate] = useState("");

    const [startTime, setStartTime] = useState("");

    const [loading, setLoading] = useState(false);

    const [isClosedDay, setIsClosedDay] =
        useState(false);

    const [closedMessage, setClosedMessage] =
        useState("");

    useEffect(() => {

        if (!appointmentDate) return;

        const interval = setInterval(() => {

            fetchAvailableSlots(appointmentDate);

        }, 10000);

        return () => clearInterval(interval);

    }, [appointmentDate]);

    useEffect(() => {

        fetchSalon();

        fetchServices();

    }, []);

    const fetchSalon = async () => {

        try {

            const response = await axios.get(
                `https://salon-backend-vmzr.onrender.com/api/salons/${salonId}`
            );

            setSalon(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const fetchServices = async () => {

        try {

            const response = await axios.get(
                `https://salon-backend-vmzr.onrender.com/api/services/salon/${salonId}`
            );

            setServices(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const toggleService = (serviceId) => {

        setSelectedServices((prev) => {

            if (prev.includes(serviceId)) {

                return prev.filter((id) => id !== serviceId);
            }

            return [...prev, serviceId];
        });
    };

    // CREATE APPOINTMENT

    const createAppointment = async () => {

        const token = localStorage.getItem("token");

        try {

            setLoading(true);

            const body = {

                salonId: Number(salonId),

                serviceIds: selectedServices,

                appointmentDate,

                startTime,

                notes: "Appointment From Frontend"
            };

            const response = await axios.post(

                "https://salon-backend-vmzr.onrender.com/api/appointments",

                body,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Appointment Booked Successfully");

            setSelectedServices([]);

            setAppointmentDate("");

            setStartTime("");

            console.log(response.data);

            navigate("/my-appointments");

        } catch (error) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                error?.response?.data ||
                "Booking Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    // PAYMENT FUNCTION

    const handlePayment = async () => {

        const token = localStorage.getItem("token");

        if (!token) {

            toast.error("Please Login First");

            navigate("/login");

            return;
        }

        if (
            selectedServices.length === 0
        ) {

            toast.error(
                "Please Select Service"
            );

            return;
        }

        if (!appointmentDate) {

            toast.error(
                "Please Select Date"
            );

            return;
        }

        if (!startTime) {

            toast.error(
                "Please Select Slot"
            );

            return;
        }

        try {

            const totalAmount =
                services
                    .filter((service) =>
                        selectedServices.includes(
                            service.id
                        )
                    )
                    .reduce(

                        (total, service) =>

                            total + service.price,

                        0
                    );

            // CREATE ORDER

            const orderResponse =
                await axios.post(

                    "https://salon-backend-vmzr.onrender.com/payments/create-order",

                    {
                        amount:
                            totalAmount
                    }
                );

            const order =
                orderResponse.data;

            // RAZORPAY OPTIONS

            const options = {

                key:
                    "rzp_test_StaXDfGv3JKqUt",

                amount:
                    order.amount,

                currency:
                    order.currency,

                name:
                    "Salon Booking",

                description:
                    "Appointment Payment",

                order_id:
                    order.id,

               handler:
    async function (
        response
    ) {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const verifyBody = {

                razorpayOrderId:
                    response.razorpay_order_id,

                razorpayPaymentId:
                    response.razorpay_payment_id,

                razorpaySignature:
                    response.razorpay_signature,

                salonId:
                    Number(salonId),

                serviceIds:
                    selectedServices,

                appointmentDate,

                startTime,

                notes:
                    "Appointment From Frontend"
            };
            console.log(token);

            const verifyResponse =
                await axios.post(

                    "https://salon-backend-vmzr.onrender.com/payments/verify",

                    verifyBody,

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            toast.success(
                verifyResponse.data
            );

            navigate(
                "/my-appointments"
            );

        } catch (error) {

            console.log(error);

            toast.error(
                "Payment Verification Failed"
            );
        }
    },

                theme: {

                    color:
                        "#9333ea"
                }
            };

            const razorpay =
                new window.Razorpay(
                    options
                );

            razorpay.open();

        } catch (error) {

            console.log(error);

            toast.error(
                "Payment Failed"
            );
        }
    };

    if (!salon) {

        return <h1>Loading...</h1>;
    }

    const fetchAvailableSlots = async (selectedDate) => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "https://salon-backend-vmzr.onrender.com/api/appointments/available-slots",
                {
                    params: {
                        salonId: salonId,
                        date: selectedDate
                    },

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAvailableSlots(response.data);

            if (response.data.length === 0) {

                const selected =
                    new Date(selectedDate);

                const today =
                    new Date();

                if (

                    selected.toDateString()
                    ===
                    today.toDateString()

                ) {

                    setClosedMessage(
                        "Salon is closed"
                    );

                } else {

                    setClosedMessage(
                        "Salon will be closed on this day"
                    );
                }

                setIsClosedDay(true);

            } else {

                setIsClosedDay(false);

                setClosedMessage("");
            }

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h1 className="text-4xl font-bold">
                        Book Appointment
                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">
                        {salon.name}
                    </p>

                    {/* SERVICES */}

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {services.map((service) => (

                            <div
                                key={service.id}
                                className={`border rounded-2xl p-5 transition ${
                                    selectedServices.includes(service.id)
                                        ? "border-purple-600 bg-purple-50"
                                        : "border-gray-200"
                                }`}
                            >

                                <h2 className="text-2xl font-bold">
                                    {service.name}
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    {service.category}
                                </p>

                                <p className="mt-4 font-semibold">
                                    ₹ {service.price}
                                </p>

                                <p className="mt-1 text-gray-600">
                                    {service.duration} Minutes
                                </p>

                                <button
                                    onClick={() =>
                                        toggleService(service.id)
                                    }
                                    className={`mt-5 w-full py-3 rounded-xl text-white ${
                                        selectedServices.includes(service.id)
                                            ? "bg-red-500"
                                            : "bg-purple-600"
                                    }`}
                                >
                                    {selectedServices.includes(service.id)
                                        ? "Remove Service"
                                        : "Select Service"}
                                </button>

                            </div>
                        ))}

                    </div>

                    {/* DATE + TIME */}

                    <div className="mt-10 flex flex-col md:flex-row gap-5">

                        <input
                            type="date"
                            value={appointmentDate}
                            onChange={(e) => {

                                setAppointmentDate(e.target.value);

                                fetchAvailableSlots(e.target.value);
                            }}
                            className="border p-4 rounded-xl flex-1"
                        />

                        <div className="mt-6">

                            <h3 className="text-lg font-semibold mb-4">
                                Available Slots
                            </h3>

                            {
                                isClosedDay && (

                                    <div
                                        className="
                                            mt-4
                                            bg-red-100
                                            text-red-600
                                            p-4
                                            rounded-xl
                                            font-bold
                                        "
                                    >

                                        {closedMessage}

                                    </div>
                                )
                            }

                            <div className="flex flex-wrap gap-3">

                                {
                                    availableSlots.map((slot) => (

                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => setStartTime(slot)}
                                            className={`px-4 py-2 rounded-lg border transition-all

                                            ${
                                                startTime === slot
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-white hover:bg-gray-100"
                                            }
                                        `}
                                        >
                                            {slot}
                                        </button>
                                    ))
                                }

                            </div>

                        </div>

                        <input

                            value={startTime}

                            onChange={(e) =>
                                setStartTime(e.target.value)
                            }

                            className="border p-4 rounded-xl flex-1"
                        />

                    </div>

                    {/* SELECTED */}

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold">
                            Selected Services
                        </h2>

                        <div className="flex flex-wrap gap-3 mt-5">

                            {services
                                .filter((service) =>
                                    selectedServices.includes(service.id)
                                )
                                .map((service) => (

                                    <span
                                        key={service.id}
                                        className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full"
                                    >
                                        {service.name}
                                    </span>
                                ))}

                        </div>

                    </div>

                    {/* BUTTON */}

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="
                            mt-10
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-8
                            py-4
                            rounded-xl
                            text-lg
                            font-semibold
                        "
                    >
                        {loading
                            ? "Processing..."
                            : "Pay & Confirm Booking"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default BookAppointment;