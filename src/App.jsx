import { useState, useEffect, useRef } from 'react';
import { DndContext, KeyboardCode, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Column from './components/column';
import Input from './components/Input';
import './App.css';


function App() {
  
  // state for storing task (array of object)
  const [ tasks, setTasks ] = useState([]);
  // state for storing complete status
  const [ complete, setcomplete ] = useState(false);
  let taskId = useRef(-1);

  // for adding new element
  function addTask(title) {

    // setTasks(tasks => [...tasks, {id: tasks.length+1, title: title, complete: false}]);
    
    // if tasks state array is empty then it will set the first id as '0' to the task
    taskId.current += 1
        
    // POST request for create new task
    const response = fetch('http://localhost:9000/api/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({task: title, completed: false, id: `${tasks.length > 0 ? tasks.length: taskId.current}`}),
    });

    const result = response.then((data)=> {
      return data.json();
    })

    result.then((data)=> {
      console.log(data)
    })
    
  
    setTimeout(()=> {
      getTasks();
    }, 2000)
  }

  // GET request for getting all the tasks from database
  function getTasks() {
  
    const response = fetch('http://localhost:9000/api/tasks', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
    });

    const result = response.then((data)=> {
      return data.json();
    })

    result.then((data)=> {
      setTasks(data);
    })
  }

  // to track position of array element by id
  const getTaskPosition = id => tasks.findIndex(task => task.id === id);

  // handleDragEnd function
  function handleDragEnd(e) {
    const { active, over } = e;

    if (active.id === over.id) {
      return
    }else {
      setTasks(tasks => {
        const originalPosition = getTaskPosition(active.id);
        const newPosition = getTaskPosition(over.id);
        console.log("originalPos:", originalPosition)
        console.log("newPos:", newPosition);
        // for changing element's position;
        return arrayMove(tasks, originalPosition, newPosition);
      })
    }
  }

  // for workable in mobile devices & for keyboard
  // for that we have to implement sensors from '@dnd-kit-core';
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )


  useEffect(()=> {
    getTasks()
  }, [])

  return (
    <>
      <div className='app flex flex-col items-center w-screen py-7'>
        <h1 className='text-2xl mb-14 mt-4'>My Tasks ✅</h1>
        <Input onSubmit={addTask}/>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
          <Column tasks={tasks}/>
        </DndContext>
      </div>
    </>
  )
}

export default App;
