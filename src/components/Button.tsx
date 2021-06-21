import { useState } from "react"




export const Button = () => {
    
    const [cont, setCont] = useState(0);
    const increment = () =>{
        setCont(cont + 1);
        console.log(cont);
    }

    return (<div>
        <button onClick= {increment}>Contador</button>
        <div>{cont}</div>
        </div>
        
        
        
    )
}

