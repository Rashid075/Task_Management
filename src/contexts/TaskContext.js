import { createContext, useContext } from "react";

export const TaskContext=createContext({
    tasks:[
        {
            id:1,
            task:"task message",
            completed: false
        }
    ],
    addTask:(task)=>{},
    updateTask: (id,task)=>{},
    deleteTask: (id)=>{},
    toggleComplete: (id)=>{},
})

export const useTask=()=>{
    return useContext(TaskContext)
}

export const TaskProvider=TaskContext.Provider