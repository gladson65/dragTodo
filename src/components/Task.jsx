import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Task({id, title}) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id})
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return(
        <>
            <div 
                ref={setNodeRef} 
                {...attributes} 
                {...listeners} 
                style={style}
                className="bg-white flex items-center gap-4 w-full p-4 rounded-md shadow-md touch-none">
                
                <input type="checkbox"/>
                <p>{title}</p>
            </div>
        </>
    )
}

export default Task;