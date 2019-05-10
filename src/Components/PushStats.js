/* Third party*/
import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';
//import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';
/* Helpers */
import formatDate from '../Helpers/formatDateReadable';
/* Custom Hooks */
import UseBuildChart from '../Hooks/useBuildChart';

function PushStats(props){
  const [pushList, setPushList] = useState([]);
  const [userId, setUserId] = useState(null);
  function deleteRecord(e,id) {
    e.preventDefault();
    const ref = firebase.database().ref(`Push/${userId}/${id}`);
    ref.remove();
		navigate('/stats/pull');
  }
  useEffect(() => {
    let pushList = [];
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        setUserId(props.user);
        const pushstats = firebase.database().ref(`Push/${userId}`);
        pushstats.orderByChild('timestamp').on('child_added',snapshot => {
          const FBPushStats = snapshot.val();
          FBPushStats.id = snapshot.key;
          const total = parseInt(FBPushStats.diamond) +
            parseInt(FBPushStats.standsWide) +
            parseInt(FBPushStats.standsShoulder) +
            parseInt(FBPushStats.decline) +
            parseInt(FBPushStats.level)
            FBPushStats.total = total;
            pushList.push(FBPushStats);
        })
      }
    })
    return () => {
      if(pushList.length > 0  ){
        setPushList(pushList);
      }
    }
  });
  let panelStyle = {
    display: "none"
  }
  return(
    <div>
      <h3>Push Stats</h3>
      <UseBuildChart className="mb15" exercise="Push"/>
      {pushList.map((push,i) => {
        return(
          <div key={i.toString()}>
            <div className="accordion" onClick={() => {
              let show = document.getElementById(`panel${i}`);
              if(show.style.display === "none"){
                show.style.display = "block";
              }else{
                show.style.display = "none";
              }
            }}>
              {formatDate(push.date)} <span className="sub">{push.total.toString()} push-ups</span>
            </div>
            <div id={"panel" + i} className="panel" style={panelStyle}>
              <ul className="none text_right mr30per">
                <li><span className="bold" >Diamond</span> {push.diamond} reps</li>
                <li><span className="bold" >Stands Wide</span> {push.standsWide} reps</li>
                <li><span className="bold" >Stands Shoulder</span> {push.standsShoulder} reps</li>
                <li><span className="bold" >Decline</span> {push.decline} reps</li>
                <li><span className="bold" >Level</span> {push.level} reps</li>
              </ul>
              <input type="button" className="center mt10" value="Delete" onClick={e => deleteRecord(e, push.id)}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PushStats;
