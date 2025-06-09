import { useEffect, useState } from "react";
import { useNotification } from "../context/NotificationContext";
import fetchData from "../utils/fetchData";
import { useNavigate } from "react-router-dom";

type Board = { name: string; [key: string]: any };

const Boards: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  const { notify } = useNotification();

  const navigate = useNavigate();

  const fetchBoards = async () => {
    try {
      const token = localStorage.getItem("token") || "";

      if (!token) {
        notify("Authorization needed");
        navigate("/");
      }

      const response = await fetchData("/user/boards", "GET", null, token);
      console.log("🚀 ~ fetchBoards ~ response:", response);

      if (response.success) {
        setBoards(response.message);
      } else {
        notify(response.message || "Something went wrong when fetching boards");
      }
    } catch (error) {
      notify(error.message || "Something went wrong when fetching boards");
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center py-16">
      <h1 className="text-4xl font-bold text-neutral-50 mb-10">Your Boards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {boards.map((board) => (
          <div
            key={board}
            className="bg-neutral-800 border border-primary-500 rounded-xl shadow-md p-6 flex flex-col items-center hover:scale-105 transition-transform duration-200"
          >
            <span className="text-xl font-semibold text-neutral-50">
              {board}
            </span>
          </div>
        ))}
      </div>
      {boards.length === 0 && (
        <div className="text-neutral-400 mt-10 text-lg">No boards found.</div>
      )}
    </div>
  );
};

export default Boards;
