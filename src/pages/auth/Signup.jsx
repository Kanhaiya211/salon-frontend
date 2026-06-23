import {
    useState,
    useEffect
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {

    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({

            name: "",

            email: "",

            password: "",

            role: "CUSTOMER",
        });

    const [otp, setOtp] =
        useState("");

    const [otpSent, setOtpSent] =
        useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };
    const [timer, setTimer] =
        useState(300);

    const [otpExpired,
        setOtpExpired] =
        useState(false);

    // SEND OTP

    const sendOtp = async (e) => {

        e.preventDefault();

        try {

            const response =
                await axios.post(

                    "https://salon-backend-vmzr.onrender.com/auth/signup",

                    formData
                );

            toast.success(response.data);

            setOtpSent(true);
            setTimer(300);

            setOtpExpired(false);

        } catch (error) {

            console.log(error);

            toast.error(

                error?.response?.data
                ||
                "Failed To Send OTP"
            );
        }
    };

    // VERIFY OTP

    const verifyOtp = async (e) => {

        e.preventDefault();

        try {

            const response =
                await axios.post(

                    "https://salon-backend-vmzr.onrender.com/auth/verify-signup-otp",

                    {

                        email:
                            formData.email,

                        otp
                    }
                );

            toast.success(
                response.data
            );

            navigate("/login");

        } catch (error) {

            console.log(error);

            toast.error(

                error?.response?.data
                ||
                "Verification Failed"
            );
        }
    };
    useEffect(() => {

        let interval;

        if (
            otpSent
            &&
            timer > 0
        ) {

            interval =
                setInterval(() => {

                    setTimer(
                        (prev) => prev - 1
                    );

                }, 1000);

        } else if (timer === 0) {

            setOtpExpired(true);
        }

        return () =>
            clearInterval(interval);

    }, [otpSent, timer]);

    const resendOtp = async () => {

        try {

            const response =
                await axios.post(

                    "https://salon-backend-vmzr.onrender.com/auth/resend-signup-otp",

                    {
                        email:
                            formData.email
                    }
                );

            toast.success(
                response.data
            );

            setTimer(300);

            setOtpExpired(false);

        } catch (error) {

            console.log(error);

            toast.error(

                error?.response?.data
                ||
                "Failed To Resend OTP"
            );
        }
    };

    return (

        <div className="flex justify-center items-center min-h-screen bg-gray-100">

            <form
                className="
                    bg-white
                    p-8
                    rounded-2xl
                    shadow-lg
                    w-[400px]
                "
            >

                <h1 className="text-3xl font-bold text-center mb-6">

                    Signup

                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        mb-4
                    "
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        mb-4
                    "
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        mb-4
                    "
                />

                <select
                    name="role"
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        mb-4
                    "
                >

                    <option value="CUSTOMER">

                        CUSTOMER

                    </option>

                    <option value="SALON_OWNER">

                        SALON OWNER

                    </option>

                </select>

                {

                    !otpSent ? (

                        <button

                            onClick={sendOtp}

                            className="
                                w-full
                                bg-purple-600
                                text-white
                                py-3
                                rounded-lg
                                hover:bg-purple-700
                            "
                        >

                            Send OTP

                        </button>

                    ) : (

                        <>

                            <input

                                type="text"

                                placeholder="Enter OTP"

                                value={otp}

                                onChange={(e) =>
                                    setOtp(
                                        e.target.value
                                    )
                                }

                                className="
                                    w-full
                                    border
                                    p-3
                                    rounded-lg
                                    mb-4
                                "
                            />

                            <button

                                onClick={verifyOtp}

                                className="
                                    w-full
                                    bg-green-600
                                    text-white
                                    py-3
                                    rounded-lg
                                    hover:bg-green-700
                                "
                            >

                                Verify & Create Account

                            </button>
                            <p className="text-center mb-4">

                                OTP Expires In:

                                {" "}

                                {Math.floor(timer / 60)}:

                                {(timer % 60)
                                    .toString()
                                    .padStart(2, "0")}

                            </p>
                            {

                                otpExpired && (

                                    <button

                                        type="button"

                                        onClick={resendOtp}

                                        className="
    w-full
    bg-orange-500
    hover:bg-orange-600
    transition-all
    duration-300
    text-white
    py-3
    rounded-lg
    mb-4
"
                                    >

                                        Resend OTP

                                    </button>
                                )
                            }

                        </>
                    )
                }

            </form>

        </div>
    );
}

export default Signup;