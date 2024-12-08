import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Task from './Task';

function Column({tasks}) {


    return(
        <>
            <div className="bg-zinc-200 rounded-md w-4/5 p-2 flex flex-col gap-4">

                <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                    {
                    tasks.length > 0 ?
                    tasks.map((task)=> {
                        return(
                            <Task key={task.id} id={task.id} title={task.title}/>
                        )
                    })
                    
                    :
                    <>
                        ''
                    </>
                    }
                </SortableContext>
            </div>
        </>
    )
}

export default Column;