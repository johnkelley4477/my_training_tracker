/* Third party*/
import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';
/* Helpers */
import formatDate from '../Helpers/formatDateReadable';
/* Custom Hooks */
import UseBuildChart from '../Hooks/useBuildChart';

function SpartanStats(props) {
  const [userID, setUserId] = useState(null);
  const [spartanList, setSpartanList] = useState([]);

  useEffect(() => {
    let spartanList = [];
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        setUserId(FBUser.uid);
        const spartanstats = firebase.database().ref('Spartan/' + FBUser.uid).orderByChild('timestamp').limitToLast(10);
        spartanstats.on('child_added',snapshot => {
          const FBSpartanStats = snapshot.val();
          FBSpartanStats.id = snapshot.key;
          spartanList.push(FBSpartanStats);
        });
      }
    });
    return () => {
      if(spartanList.length > 0  ){
        setSpartanList(spartanList.reverse());
      }
    }
  })
  function deleteRecord(e,id) {
    e.preventDefault();
    const ref = firebase.database().ref(`Pull/${userID}/${id}`);
    ref.remove();
		navigate('/stats/pull');
  }
  let panelStyle = {
    display: "none"
  }
  function buildItervals(spartan){
    let intervals = [];
    const count = spartan.distance / spartan.reps;
    for (var i = 0; i < count; i++) {
      intervals.push(
        <div key={"key" + i.toString()} className="b_border">
          <span className="grid-parent v-center bold text_right pr5">Mile {spartan[`marker${i}`]}</span>
          <span className="text_left v-center grid-parent normal pl5">{spartan[`reps${i}`]} {spartan[`exercise${i}`]}</span>
        </div>
      )
    }
    return intervals
  }
  return(
    <div>
      <h3 className="text_center">Spartan Stats</h3>
      <div className="chart mb15">
        <UseBuildChart exercise="Spartan"/>
      </div>
      {spartanList.map((spartan,i) => {
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
                {formatDate(spartan.date)}
            </div>
            <div id={"panel" + i} className="panel" style={panelStyle}>
              {buildItervals(spartan)}
              <div className="comments mt15 overflowy">
                {spartan.comments}
              </div>
              <input type="button" className="center mt15" value="Delete" onClick={e => deleteRecord(e, spartan.id)}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default SpartanStats;
