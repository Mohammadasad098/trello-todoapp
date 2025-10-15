import { Pencil, Check, Trash, X, Plus } from "lucide-react";
import { useState } from "react";

export default function Card({
  id,
  title,
  tasks,
  onDelete,
  onAddTask,
  onEdit,
  editingTask,
  editValue,
  setEditValue,
  saveEdit,
}: any) {
  const [showInput, setShowInput] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const handleAddTask = () => {
    if (inputVal.trim() === "") return;
    onAddTask(inputVal);
    setInputVal("");
    setShowInput(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col items-center w-full sm:w-[300px] transition-all duration-300 self-start">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center break-words">
        {title}
      </h3>

      {tasks.length === 0 ? (
        <p className="text-gray-400 text-center">No tasks yet...</p>
      ) : (
        <ul className="w-full list-none text-gray-700 space-y-2">
          {tasks.map((task: string, i: number) => (
            <li
              key={i}
              className="border border-purple-300 px-3 py-2 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 break-words"
            >
              {editingTask.id === id && editingTask.index === i ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-2/3 sm:w-[70%] px-2 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-500 text-white p-1 rounded-lg hover:bg-green-600 transition"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => onEdit("", -1, "")}
                      className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="flex-1 text-gray-800 break-words overflow-hidden w-full">
                    {task}
                  </span>
                  <div className="flex gap-3 items-center flex-shrink-0">
                    <button
                      onClick={() => onEdit(id, i, task)}
                      className="text-green-500 hover:text-green-600"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(i, id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {showInput && (
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 mt-3 w-full">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Add task..."
            className="flex-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleAddTask}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              Add
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="bg-red-500 text-white px-3 py-2 rounded-lg flex items-center justify-center w-full sm:w-auto"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {!showInput && (
        <button
          className="border rounded-lg py-2 px-4 mt-4 border-purple-500 hover:bg-purple-50 transition-all flex gap-2 items-center text-purple-600 text-sm sm:text-base"
          onClick={() => setShowInput(true)}
        >
          <Plus size={16} /> Add Card
        </button>
      )}
    </div>
  );
}
