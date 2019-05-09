/* Third Party */
import {useState,useEffect} from 'react';

export default (id) => {
  const [userID,setUserID] = useState(null);

  useEffect(() => {
    if(id !== null){
      setUserID(id);
    }
  });
  return userID;
}
