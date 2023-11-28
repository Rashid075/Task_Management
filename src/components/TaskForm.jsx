import React, { useState } from 'react'
import { useTask } from '../contexts';

function TaskForm() {

    const [task, setTask]=useState("")
    const {addTask}=useTask()

    const add=(e)=>{
        e.preventDefault()
        if(!task) return 
        addTask({task, completed:false})
        setTask("")
    }
    return (
        <form onSubmit={add}  className="flex">
            <input
                type="text"
                placeholder="Write Task..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={task}
                onChange={(e)=>setTask(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TaskForm