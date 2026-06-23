import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import axios from "axios";
import toast from "react-hot-toast";
function OwnerAnalytics() {

    const [dashboardData, setDashboardData] = useState(null);
    const [revenueData, setRevenueData] = useState([]);
    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "https://salon-backend-vmzr.onrender.com/api/appointments/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDashboardData(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed To Load Analytics");
        }
    };

    
    const fetchMonthlyRevenue = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            "https://salon-backend-vmzr.onrender.com/api/appointments/monthly-revenue",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setRevenueData(response.data);

    } catch (error) {

        console.log(error);

        toast.error("Failed To Load Revenue Data");
    }
};
   useEffect(() => {

    fetchDashboard();

    fetchMonthlyRevenue();

}, []);

    
    if (!dashboardData) {

        return <h1 className="p-10">Loading...</h1>;
    }


    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-12">
                Analytics Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-gray-500 text-lg">
                        Total Appointments
                    </h2>

                    <p className="text-5xl font-bold mt-5">
                        {dashboardData.totalAppointments}
                    </p>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-gray-500 text-lg">
                        Revenue
                    </h2>

                    <p className="text-5xl font-bold text-green-600 mt-5">
                        ₹ {dashboardData.totalRevenue}
                    </p>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-gray-500 text-lg">
                        Pending
                    </h2>

                    <p className="text-5xl font-bold text-yellow-500 mt-5">
                        {dashboardData.pendingAppointments}
                    </p>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-gray-500 text-lg">
                        Completed
                    </h2>

                    <p className="text-5xl font-bold text-blue-600 mt-5">
                        {dashboardData.completedAppointments}
                    </p>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-gray-500 text-lg">
                        Today's Bookings
                    </h2>

                    <p className="text-5xl font-bold text-purple-600 mt-5">
                        {dashboardData.todayAppointments}
                    </p>

                </div>

            </div>
            <div className="bg-white rounded-3xl shadow-lg p-8 mt-12">

    <h2 className="text-3xl font-bold mb-8">
        Revenue Overview
    </h2>

    {/* <div className="w-full h-[400px]">

        <ResponsiveContainer width="100%" height="100%">

            <BarChart data={revenueData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                    dataKey="revenue"
                    fill="#9333ea"
                    radius={[10, 10, 0, 0]}
                />

            </BarChart>

        </ResponsiveContainer>

    </div> */}
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-12">

    <h2 className="text-3xl font-bold mb-8">
        Monthly Revenue
    </h2>

    <div className="w-full h-[400px]">

        <ResponsiveContainer
            width="100%"
            height="100%"
        >

            <BarChart data={revenueData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                    dataKey="revenue"
                    fill="#9333ea"
                    radius={[10, 10, 0, 0]}
                />

            </BarChart>

        </ResponsiveContainer>

    </div>

</div>

</div>

        </div>
    );
}

export default OwnerAnalytics;