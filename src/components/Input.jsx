import { useState } from "react";

function Input({onSubmit}) {

    const [ input, setInput ] = useState("");

    const handleSubmit = () => {
        if (!input) {
            return
        }
        
        onSubmit(input);

        // clear input state
        setInput("");
        
    }

    return(
        <>
            <div className="w-screen y-2 mb-7 flex justify-center items-center gap-2">
                <input
                    onChange={(e) => setInput(e.target.value)} 
                    type="text" 
                    className="w-3/5 border-2 p-3 rounded-md" 
                    placeholder="Add Your Task"
                />

                <button onClick={handleSubmit}
                    className="py-3 w-32 border-2 rounded-md hover:bg-sky-200 transition-all duration-300"
                >
                    Add
                </button>
            </div>
        </>
    )
}

export default Input;