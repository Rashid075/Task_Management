import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import {TaskProvider} from './contexts'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'

function App() {
  const [tasks,setTasks]=useState([])

  const addTask=(task)=>{
    setTasks((prev)=>[{id: Date.now(), ...task}, ...prev])
  }

  const updateTask=(id,task)=>{
    setTasks((prev)=>prev.map((prevTask)=>(prevTask.id===id?task:prevTask)))
  }

  const deleteTask=(id)=>{
    setTasks((prev)=>prev.filter((task)=>task.id!==id))
  }

  const toggleComplete=(id)=>{
    setTasks((prev)=>prev.map((prevTask)=>prevTask.id===id?{...prevTask, completed: !prevTask.completed}: prevTask))
  }

  // useEffect(()=>{
  //   const tasks=JSON.parse(localStorage.getItem("tasks"))
  //   if(tasks && tasks.length>0){
  //     setTasks(tasks)
  //   }
  // },[])

  useEffect(() => {
    console.log("Fetching tasks from localStorage...");
    if (localStorage) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      console.log("Parsed tasks:", tasks);
      if (tasks && tasks.length > 0) {
        setTasks(tasks);
      }
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks))
  },[tasks])
  return (
    <TaskProvider value={{tasks, addTask, updateTask, deleteTask, toggleComplete}}>
      <div className="bg-[#172554] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Task Management Application</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}
                        <TaskForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {tasks.map((task)=>(
                          <div key={task.id} className='w-full'>
                            <TaskItem task={task}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TaskProvider>
  )
}

export default App
