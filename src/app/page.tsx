"use client";

import { useState, FormEvent } from "react";
import Card from "./components/Card";


export default function Home() {
  const [showTodoCards, setShowTodoCards] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [selectedCard, setSelectedCard] = useState("Today");

  const [todayTasks, setTodayTasks] = useState<string[]>([]);
  const [thisWeekTasks, setThisWeekTasks] = useState<string[]>([]);
  const [laterTasks, setLaterTasks] = useState<string[]>([]);

  const [showTodayInput, setShowTodayInput] = useState(false);
  const [showWeekInput, setShowWeekInput] = useState(false);
  const [showLaterInput, setShowLaterInput] = useState(false);

  const [todayInputVal, setTodayInputVal] = useState("");
  const [weekInputVal, setWeekInputVal] = useState("");
  const [laterInputVal, setLaterInputVal] = useState("");

  const [editingTask, setEditingTask] = useState<{
    type: string;
    index: number | null;
  }>({ type: "", index: null });

  const [editValue, setEditValue] = useState("");

  const handleAddTodo = () => {
    if (!showTodoCards) setShowTodoCards(true);
  };

  const handleAddTask = (event: FormEvent) => {
    event.preventDefault();
    if (taskInput.trim() === "") return;

    if (selectedCard === "Today") {
      setTodayTasks([...todayTasks, taskInput]);
    } else if (selectedCard === "This Week") {
      setThisWeekTasks([...thisWeekTasks, taskInput]);
    } else {
      setLaterTasks([...laterTasks, taskInput]);
    }
    setTaskInput("");
  };

  const deleteTask = (index: number, cardType: string) => {
    if (cardType === "Today") {
      setTodayTasks(todayTasks.filter((_, i) => i !== index));
    } else if (cardType === "This Week") {
      setThisWeekTasks(thisWeekTasks.filter((_, i) => i !== index));
    } else {
      setLaterTasks(laterTasks.filter((_, i) => i !== index));
    }
  };

  const handleAddTodayTask = () => {
    if (todayInputVal.trim() === "") return;
    setTodayTasks([...todayTasks, todayInputVal]);
    setTodayInputVal("");
    setShowTodayInput(false);
  };

  const handleAddWeekTask = () => {
    if (weekInputVal.trim() === "") return;
    setThisWeekTasks([...thisWeekTasks, weekInputVal]);
    setWeekInputVal("");
    setShowWeekInput(false);
  };

  const handleAddLaterTask = () => {
    if (laterInputVal.trim() === "") return;
    setLaterTasks([...laterTasks, laterInputVal]);
    setLaterInputVal("");
    setShowLaterInput(false);
  };

  // ====== Edit Handlers ======
  const startEditing = (type: string, index: number, currentValue: string) => {
    setEditingTask({ type, index });
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (editingTask.type === "Today" && editingTask.index !== null) {
      const updated = [...todayTasks];
      updated[editingTask.index] = editValue;
      setTodayTasks(updated);
    } else if (editingTask.type === "This Week" && editingTask.index !== null) {
      const updated = [...thisWeekTasks];
      updated[editingTask.index] = editValue;
      setThisWeekTasks(updated);
    } else if (editingTask.type === "Later" && editingTask.index !== null) {
      const updated = [...laterTasks];
      updated[editingTask.index] = editValue;
      setLaterTasks(updated);
    }
    setEditingTask({ type: "", index: null });
    setEditValue("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-5xl font-extrabold mb-8 relative">
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Trello TodoApp
        </span>
        <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></span>
      </h1>

      <button
        onClick={handleAddTodo}
        className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-md hover:opacity-90 transition-all"
      >
        Add Todo
      </button>

      {showTodoCards && (
        <div className="mt-10 w-full max-w-5xl">
          <form
            onSubmit={handleAddTask}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-10"
          >
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Enter task..."
              className="w-full sm:w-1/2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <select
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="Later">Later</option>
            </select>
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-xl transition-all"
            >
              Add Task
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card
              title="Today"
              tasks={todayTasks}
              onDelete={deleteTask}
              showInput={showTodayInput}
              setShowInput={setShowTodayInput}
              inputVal={todayInputVal}
              setInputVal={setTodayInputVal}
              onAddTask={handleAddTodayTask}
              onEdit={startEditing}
              editingTask={editingTask}
              editValue={editValue}
              setEditValue={setEditValue}
              saveEdit={saveEdit}
            />

            <Card
              title="This Week"
              tasks={thisWeekTasks}
              onDelete={deleteTask}
              showInput={showWeekInput}
              setShowInput={setShowWeekInput}
              inputVal={weekInputVal}
              setInputVal={setWeekInputVal}
              onAddTask={handleAddWeekTask}
              onEdit={startEditing}
              editingTask={editingTask}
              editValue={editValue}
              setEditValue={setEditValue}
              saveEdit={saveEdit}
            />

            <Card
              title="Later"
              tasks={laterTasks}
              onDelete={deleteTask}
              showInput={showLaterInput}
              setShowInput={setShowLaterInput}
              inputVal={laterInputVal}
              setInputVal={setLaterInputVal}
              onAddTask={handleAddLaterTask}
              onEdit={startEditing}
              editingTask={editingTask}
              editValue={editValue}
              setEditValue={setEditValue}
              saveEdit={saveEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}