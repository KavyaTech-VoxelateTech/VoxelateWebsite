"use client"

import { useState } from "react"

export default function Footer(){
    const [count,setCount] = useState(0)

    function handleClick(){
        setCount(prev => prev + 1)
    }
    return(
        <div>
            <p>
                &copy; 2024 Voxelate
            </p>
            <p>
                You have clicked the following button {count} times. <button onClick={handleClick}>Click Me</button>
            </p>
        </div>       
    )
}
