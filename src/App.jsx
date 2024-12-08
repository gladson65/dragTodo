import { useState } from 'react';
import { DndContext, KeyboardCode, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Column from './components/column';
import Input from './components/Input';
import './App.css';


function App() {
  
  const [ tasks, setTasks ] = useState([
    {id:1, title: "Add tasks to homepage"},
    {id:2, title: "fix styling in about section"},
    {id:3, title: "Learn how to center a div"},
  ]);

  // for adding new element
  function addTask(title) {
    setTasks(tasks => [...tasks, {id: tasks.length+1, title: title}]);
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

        // for changing element's position;
        return arrayMove(tasks, originalPosition, newPosition);
      })
    }
  }

  // for workable in mobile devices & for keyboard
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <>
      <div className='app flex flex-col items-center w-screen py-7'>
        <h1 className='text-2xl mb-14 mt-4'>My Tasks ✅</h1>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
          <Input onSubmit={addTask}/>
          <Column tasks={tasks}/>
        </DndContext>
      </div>
    </>
  )
}

export default App;
