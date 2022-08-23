import { useState } from "react";

export const useForceUpdate = () =>{
    const [value, setValue] = useState(0);
    console.log("forced")
    return () => setValue(value => value + 1);
  }
  