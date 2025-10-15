"use client";

import { useState, FormEvent } from "react";
import Card from "./components/Card";
import { Plus } from "lucide-react";

interface List {
  id: string;
  title: string;
  tasks: string[];
}

export default function Home() {
  const [taskInput, setTaskInput] = useState("");
  const [selectedCardId, setSelectedCardId] = useState("");
  const [lists, setLists] = useState<List[]>([
    { id: "1", title: "To-do", tasks: [] },
    { id: "2", title: "Doing", tasks: [] },
    { id: "3", title: "Done", tasks: [] },
  ]);
  const [showAddListInput, setShowAddListInput] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [editingTask, setEditingTask] = useState<{
    id: string;
    index: number | null;
  }>({ id: "", index: null });
  const [editValue, setEditValue] = useState("");

  const handleAddTask = (event: FormEvent) => {
    event.preventDefault();
    if (taskInput.trim() === "" || selectedCardId === "") return;

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === selectedCardId
          ? { ...list, tasks: [...list.tasks, taskInput] }
          : list
      )
    );
    setTaskInput("");
  };

  const deleteTask = (index: number, id: string) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id
          ? { ...list, tasks: list.tasks.filter((_, i) => i !== index) }
          : list
      )
    );
  };

  const addTaskToList = (id: string, newTask: string) => {
    if (newTask.trim() === "") return;
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      )
    );
  };

  const startEditing = (id: string, index: number, currentValue: string) => {
    setEditingTask({ id, index });
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === editingTask.id && editingTask.index !== null
          ? {
              ...list,
              tasks: list.tasks.map((task, i) =>
                i === editingTask.index ? editValue : task
              ),
            }
          : list
      )
    );
    setEditingTask({ id: "", index: null });
    setEditValue("");
  };

  const handleAddNewList = () => {
    if (newListTitle.trim() === "") return;
    const newList: List = {
      id: Date.now().toString(),
      title: newListTitle,
      tasks: [],
    };
    setLists([...lists, newList]);
    setNewListTitle("");
    setShowAddListInput(false);
  };

  return (
    <>
      <div className="w-full bg-gray-100 py-10 shadow-sm">
        <h1 className="text-5xl font-extrabold mb-6 text-center">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Trello Todo App
          </span>
        </h1>

        {/* Add Task Form */}
        <form
          onSubmit={handleAddTask}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl mx-auto"
        >
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter task..."
            className="w-full sm:w-1/2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          />
          <select
            value={selectedCardId}
            onChange={(e) => setSelectedCardId(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select List</option>
            {lists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.title}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-xl transition-all"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Cards Section */}
      <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 pt-10 pb-20">
        {/* Each card grows independently now */}
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl items-start">
          {lists.map((list) => (
            <Card
              key={list.id}
              id={list.id}
              title={list.title}
              tasks={list.tasks}
              onDelete={deleteTask}
              onAddTask={(task: string) => addTaskToList(list.id, task)}
              onEdit={startEditing}
              editingTask={editingTask}
              editValue={editValue}
              setEditValue={setEditValue}
              saveEdit={saveEdit}
            />
          ))}
        </div>

        {/* Add New List Section */}
        <div className="mt-10">
          {showAddListInput ? (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                placeholder="Enter list name..."
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleAddNewList}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg"
              >
                Add List
              </button>
              <button
                onClick={() => setShowAddListInput(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddListInput(true)}
              className="flex gap-2 items-center border border-purple-500 px-5 py-2 rounded-lg text-purple-600 hover:bg-purple-50"
            >
              <Plus /> Add another list
            </button>
          )}
        </div>
      </div>
    </>
  );
}
