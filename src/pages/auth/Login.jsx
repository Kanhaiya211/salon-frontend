import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const response = await loginUser(formData);

    // SAVE TOKEN
    localStorage.setItem(
      "token",
      response.data.token
    );

    // SAVE ROLE
    localStorage.setItem(
      "role",
      response.data.role
    );

    toast.success("Login Successful");

    // ROLE-BASED REDIRECT
    if (response.data.role === "SALON_OWNER") {

      navigate("/owner/dashboard");

    } else if (response.data.role === "CUSTOMER") {

      navigate("/");

    }

  } catch (error) {

    console.log(error);

    toast.error("Invalid Credentials");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-[400px]"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
        >
          Login
        </button>
        <p
    onClick={() =>
        navigate("/forgot-password")
    }

    className="
        text-purple-600
        mt-4
        cursor-pointer
        text-center
    "
>

    Forgot Password?

</p>

      </form>

    </div>
  );
}

export default Login;