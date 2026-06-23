import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function OwnerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Owner Dashboard
      </h1>

      <div className="flex gap-6">

        <Link
          to="/owner/create-salon"
          className="bg-purple-600 text-white px-8 py-4 rounded-xl"
        >
          Create Salon
        </Link>

        <Link
          to="/owner/my-salons"
          className="bg-black text-white px-8 py-4 rounded-xl"
        >
          My Salons
        </Link>

        <button
          onClick={() =>
            navigate("/owner/appointments")
          }
          className="bg-green-600 text-white px-8 py-4 rounded-xl"
        >
          Appointments
        </button>

        <button
          onClick={() =>
            navigate("/owner/analytics")
          }
          className="bg-black text-white px-8 py-4 rounded-xl"
        >
          Analytics
        </button>
        <button
          onClick={() =>
           navigate("/owner/calendar")
          }
          className="bg-orange-500 text-white px-8 py-4 rounded-xl"
        >
          Calendar
        </button>


      </div>

    </div>
  );
}

export default OwnerDashboard;