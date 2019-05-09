/* Third party */
import {useState,useEffect} from 'react';
/* Components */
import firebase from '../Components/Firebase';

function formateDate(d){
  const dsplit = d.split('-');
  const date = new Date(dsplit[0] + "," + dsplit[1] + "," + dsplit[2]);
  var day = date.getDate();
  var monthIndex = date.getMonth() + 1;
  var year = date.getFullYear();
  return monthIndex + '/' + day + '/' + year;
}
function buildList(source){
  const [list, setList] = useState([]);
  useEffect(() => {
    let list = [];
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        const stats = firebase.database().ref(`${source}/${FBUser.uid}`).orderByChild('timestamp');
        stats.on('child_added',snapshot => {
          const FBStat = snapshot.val();
          FBStat.id = snapshot.key;
          FBStat.date = formateDate(FBStat.date);
          list.push(FBStat);
        });
      }
    });
    return () => {
      if(list.length > 0 && list !== undefined)
        setList(list);
    }
  });
  if(list.length > 0 && list !== undefined)
    return list;
}

export default buildList;
