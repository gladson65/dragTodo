import { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Task({id, title}) {

    const [ check, setCheck ] = useState(false);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id})
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    // handleStatus function
    function handleStatus(e) {
        setCheck(e.target.value);
        setTimeout(()=> {
            console.log(check);
        }, 2000)
    }


    useEffect(()=> {
        console.log(check);
    }, [check])

    return(
        <>
            <div 
                ref={setNodeRef} 
                {...attributes} 
                {...listeners} 
                style={style}
                className="bg-white flex items-center gap-4 w-full p-4 rounded-md shadow-md touch-none">
                
                <input onChange={handleStatus} value="test" type="checkbox"/>
                <p>{title}</p>
            </div>
        </>
    )
}

export default Task;