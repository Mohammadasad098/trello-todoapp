import { Delete, Edit, Check } from "lucide-react";


export default function Card({
  title,
  tasks,
  onDelete,
  showInput,
  setShowInput,
  inputVal,
  setInputVal,
  onAddTask,
  onEdit,
  editingTask,
  editValue,
  setEditValue,
  saveEdit,
}: any) {
  return (
    <div className="bg-orange-100 rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col items-center">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>

      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks yet...</p>
      ) : (
        <ul className="w-full list-none text-gray-700">
          {tasks.map((task: string, i: number) => (
            <li
              key={i}
              className="border border-amber-300 my-2 px-3 py-2 rounded-lg flex justify-between items-center"
            >
              {editingTask.type === title && editingTask.index === i ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 px-2 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={saveEdit}
                    className="bg-green-500 text-white px-1 py-1 rounded-lg"
                  >
                    <Check size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <span>{task}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(title, i, task)}
                      className="text-green-500"
                    >
                      <Edit />
                    </button>
                    <button onClick={() => onDelete(i, title)}>
                      <Delete className="text-red-500" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {showInput ? (
        <div className="flex items-center gap-2 mt-3 w-full">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Add task..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={onAddTask}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      ) : (
        <button
          className="border rounded-lg py-2 px-3 mt-3 border-red-500"
          onClick={() => setShowInput(true)}
        >
          Add Card
        </button>
      )}
    </div>
  );
}