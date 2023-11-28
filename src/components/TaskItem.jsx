import React, { useState } from 'react'
import { useTask } from '../contexts';

function TaskItem({task}) {
    const [TaskEdit, setTaskEdit]=useState(false)
    const [taskmsg, setTaskmsg]=useState(task.task)
    const {deleteTask, updateTask, toggleComplete}=useTask()

    const editTask=()=>{
        updateTask(task.id, {...task, task: taskmsg})
        setTaskEdit(false)
    }

    const toggletask=()=>{
        toggleComplete(task.id)
    }
    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                task.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={task.completed}
                onChange={toggletask}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    TaskEdit ? "border-black/10 px-2" : "border-transparent"
                } ${task.completed ? "line-through" : ""}`}
                value={taskmsg}
                onChange={(e) => setTaskmsg(e.target.value)}
                readOnly={!TaskEdit}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (task.completed) return;

                    if (TaskEdit) {
                        editTask();
                    } else setTaskEdit((prev) => !prev);
                }}
                disabled={task.completed}
            >
                {TaskEdit ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTask(task.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TaskItem