import { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import fetchData from "../utils/fetchData";
import { useNavigate } from "react-router-dom";

const CreateBoard: React.FC = () => {
  const [boardName, setBoardName] = useState("");

  const { notify } = useNotification();

  const navigate = useNavigate();

  const createTable = async (e: React.FormEvent, tableName: string) => {
    e.preventDefault();

    if (!tableName) {
      notify("Please enter a table name", "error");
      return;
    }

    try {
      const token = (localStorage.getItem("token") || "");

      if (!token) {
        notify("Authentication is needed");
        navigate("/login");
      }

      const response = await fetchData(
        "/user/board",
        "POST",
        tableName,
        token,
        "text/plain"
      );

      if (response.success) {
        notify(
          typeof response.message === "string"
            ? response.message
            : "Board created successfully",
          "success"
        );
        setBoardName("");
      } else {
        notify(
          typeof response.message === "string"
            ? response.message
            : "Something went wrong",
          "error"
        );
      }
    } catch (error) {
      notify(
        error instanceof Error ? error.message : "Error creating board",
        "error"
      );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-neutral-50 mb-6">
        Create Board
      </h1>
      <div className="max-w-md mx-auto bg-neutral-900 border border-primary-500 rounded-2xl shadow-lg p-8">
        <form className="space-y-5">
          <div>
            <label className="block text-neutral-50 mb-1">Board Name</label>
            <input
              type="text"
              className="w-full p-3 border border-primary-500 rounded-lg bg-neutral-900 text-neutral-50 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter table name"
              onChange={(e) => setBoardName(e.target.value || "")}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-700 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
            onClick={(e) => createTable(e, boardName)}
          >
            Create Board
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBoard;
