/* Third party*/
import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';
/* Custom Hooks */
import UseBuildChart from '../Hooks/useBuildChart';
/* Helpers */
import formatDate from '../Helpers/formatDateReadable';

function LegsStats(props){
  const [legsList, setLegsList] = useState([]);
  const [userId, setUserId] = useState(null);
  function deleteRecord(e,id) {
    e.preventDefault();
    const ref = firebase.database().ref(`Legs/${userId}/${id}`);
    ref.remove();
		navigate('/stats/legs');
  }
  useEffect(() => {
    let legsList = [];
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        setUserId(props.user);
        const legsstats = firebase.database().ref('Legs/' + userId).orderByChild('timestamp');
        legsstats.on('child_added',snapshot => {
          const FBLegsStats = snapshot.val();
          FBLegsStats.id = snapshot.key;
          legsList.push(FBLegsStats);
        });
      }
    });
    return () => {
      if(legsList.length > 0  ){
        setLegsList(legsList);
      }
    }
  });
  let panelStyle = {
    display: "none"
  }
  return(
    <div >
      <h3>Legs Stats</h3>
      <UseBuildChart exercise='Legs'/>
      {legsList.map((legs,i) => {
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
              {formatDate(legs.date)}
            </div>
            <div id={"panel" + i} className="panel" style={panelStyle}>
              <h3 className="text_center">Set 1</h3>
              <div className="grid-parent">
                <div className="grid33">{legs.lungeSet1} lungs reps</div>
                <div className="grid33">{legs.squatSet1} squat reps</div>
                <div className="grid33">{legs.bucketCarrySet1} bucket carry</div>
              </div>
              <h3 className="text_center">Set 2</h3>
              <div className="grid-parent">
                <div className="grid33">{legs.lungeSet2} lungs reps</div>
                <div className="grid33">{legs.squatSet1} squat reps</div>
                <div className="grid33">{legs.bucketCarrySet2} bucket carry</div>
              </div>
              <h3 className="text_center">Set 3</h3>
              <div className="grid-parent">
                <div className="grid33">{legs.lungeSet3} lungs reps</div>
                <div className="grid33">{legs.squatSet1} squat reps</div>
                <div className="grid33">{legs.bucketCarrySet3} bucket carry</div>
              </div>
              <div className="comments mt15">
                {legs.comments}
              </div>
              <input type="button" className="center mt15" value="Delete" onClick={e => deleteRecord(e, legs.id)}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LegsStats;
