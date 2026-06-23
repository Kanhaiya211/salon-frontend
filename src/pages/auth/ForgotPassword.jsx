import { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [newPassword,
        setNewPassword] =
        useState("");

    const [otpSent,
        setOtpSent] =
        useState(false);

    // SEND OTP

    const sendOtp = async (e) => {

        e.preventDefault();

        try {

            const response =
                await axios.post(

                    "http://localhost:8080/auth/forgot-password/send-otp",

                    {
                        email
                    }
                );

            toast.success(
                response.data
            );

            setOtpSent(true);

        } catch (error) {

            console.log(error);

            toast.error(

                error?.response?.data
                ||
                "Failed To Send OTP"
            );
        }
    };

    // RESET PASSWORD

    const resetPassword =
        async (e) => {

        e.preventDefault();

        try {

            const response =
                await axios.post(

                    "http://localhost:8080/auth/forgot-password/reset",

                    {
                        email,
                        otp,
                        newPassword
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
                "Reset Failed"
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

                    Forgot Password

                </h1>

                <input

                    type="email"

                    placeholder="Enter Email"

                    value={email}

                    onChange={(e) =>
                        setEmail(
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

                            <input

                                type="password"

                                placeholder="Enter New Password"

                                value={newPassword}

                                onChange={(e) =>
                                    setNewPassword(
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

                                onClick={
                                    resetPassword
                                }

                                className="
                                    w-full
                                    bg-green-600
                                    text-white
                                    py-3
                                    rounded-lg
                                    hover:bg-green-700
                                "
                            >

                                Reset Password

                            </button>

                        </>
                    )
                }

            </form>

        </div>
    );
}

export default ForgotPassword;