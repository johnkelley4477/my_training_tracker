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

function PullStats(props) {
  const [userID, setUserId] = useState(props.user);
  const [pullsList, setPullsList] = useState([]);
  useEffect(() => {
    let pullsList = [];
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        setUserId(props.user);
        const pullstats = firebase.database().ref('Pull/' + userID).orderByChild('timestamp');
        pullstats.on('child_added',snapshot => {
          const FBPullsStats = snapshot.val();
          FBPullsStats.id = snapshot.key;
          pullsList.push(FBPullsStats);
        });
      }
    });
    return () => {
      if(pullsList.length > 0  ){
        setPullsList(pullsList);
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
  return(
    <div>
      <h3 className="text_center">Pulls</h3>
      <div className="chart mb15">
        <UseBuildChart exercise="Pull"/>
      </div>
      {pullsList.length > 0 &&
        <div>
          {pullsList.map((pull,i) => {
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
                    {formatDate(pull.date)}
                </div>
                <div id={"panel" + i} className="panel" style={panelStyle}>
                  <h3 className="text_center">Pull Ups set 1</h3>
                  <div className="grid-parent">
                    <div className="grid33">{pull.together1} reps together</div>
                    <div className="grid33">{pull.shoulder1} reps shoulder</div>
                    <div className="grid33">{pull.wide1} reps wide</div>
                  </div>
                  <h3 className="text_center">Pull Ups set 2</h3>
                  <div className="grid-parent">
                    <div className="grid33">{pull.together2} reps together</div>
                    <div className="grid33">{pull.shoulder2} reps shoulder</div>
                    <div className="grid33">{pull.wide2} reps wide</div>
                  </div>
                  <h3 className="text_center">Pull Ups set 3</h3>
                  <div className="grid-parent">
                    <div className="grid33">{pull.together3} reps together</div>
                    <div className="grid33">{pull.shoulder3} reps shoulder</div>
                    <div className="grid33">{pull.wide3} reps wide</div>
                  </div>
                  <h3 className="text_center">Rope Climb</h3>
                  <div className="grid-parent">
                    <div className="grid33">{pull.rope} reps</div>
                  </div>
                  <h3 className="text_center">Dead hang sets</h3>
                  <div className="grid-parent">
                    <div className="grid33">{pull.hang1} seconds</div>
                    <div className="grid33">{pull.hang2} seconds</div>
                    <div className="grid33">{pull.hang3} seconds</div>
                  </div>
                  <div className="comments mt15">
                    {pull.comments}
                  </div>
                  <input type="button" className="center mt15" value="Delete" onClick={e => deleteRecord(e, pull.id)}/>
                </div>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}
export default PullStats;
