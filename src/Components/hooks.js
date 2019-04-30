import React, {useState} from 'react';

function Example(){
  const [count,setCount] = useState(0);
   return (
     <div>
      <p>Clicked {count}</p>
      <input type="button" onClick={() => setCount(count + 1)} value="Tick"/>
     </div>
   )
}

export default Example;
