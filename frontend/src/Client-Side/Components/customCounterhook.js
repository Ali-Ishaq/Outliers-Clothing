import { useState } from "react";


const useCounter = (value) => {
  const [counter, setCounter] = useState(value);
// let counter =value

let setincrement= (value) => {
   setCounter( counter+value)
    
    console.log(counter)
      
    };
    
    let setdecrement = (value) => {
        
        setCounter( counter-value)
        console.log(counter)
    };
    
    return [setincrement, setdecrement, counter];
};

export default useCounter;
