/* Third party*/
import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {navigate} from '@reach/router';
//import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';

function LegsStats(){
  const [chartData, setChartData] = useState({});
  const [legsList, setLegsList] = useState([]);
  const [userId, setUserId] = useState(null);
  function eDate(d){
    const dsplit = d.split('-');
    const date = new Date(dsplit[0] + "," + dsplit[1] + "," + dsplit[2]);
    var day = date.getDate();
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();
    return monthIndex + '/' + day + '/' + year;
  }
  function deleteRecord(e,id) {
    e.preventDefault();
    const ref = firebase.database().ref(`Legs/${userId}/${id}`);
    ref.remove();
		navigate('/stats/legs');
  }
  useEffect(() => {
    let chartData = {labels:[],datasets:[
      {label:"Lunge reps",data:[],backgroundColor:['rgba(0,255,255,0.5)']},
      {label:"Squat reps",data:[],backgroundColor:['rgba(255,0,0,0.5)']},
      {label:"Bucket carry distance",data:[],backgroundColor:['rgba(0,255,0,0.5)']}
    ]};
    let legsList = [];
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        setUserId(FBUser.uid);
        const legsstats = firebase.database().ref('Legs/' + FBUser.uid).orderByChild('timestamp');
        legsstats.on('child_added',snapshot => {
          const FBLegsStats = snapshot.val();
          FBLegsStats.id = snapshot.key;
          legsList.push(FBLegsStats);
          /* Build out chart data */
          chartData.labels.push(eDate(FBLegsStats.date));
          chartData.datasets[0].data.push(
            parseInt(FBLegsStats.lungeSet1) +
            parseInt(FBLegsStats.lungeSet2) +
            parseInt(FBLegsStats.lungeSet3)
          );
          chartData.datasets[1].data.push(
            parseInt(FBLegsStats.squatSet1) +
            parseInt(FBLegsStats.squatSet2) +
            parseInt(FBLegsStats.squatSet3)
          )
          chartData.datasets[2].data.push(
            parseFloat(FBLegsStats.bucketCarrySet1) +
            parseFloat(FBLegsStats.bucketCarrySet2) +
            parseFloat(FBLegsStats.bucketCarrySet3)
          )
        });
      }
    });
    return () => {
      if(chartData.labels.length > 0){
        setChartData(chartData);
      }
      if(legsList.length > 0  ){
        setLegsList(legsList);
      }
    }
  });
  let panelStyle = {
    display: "none"
  }
  return(
    <div>
      <h3>Legs Stats</h3>
      <Line className="mb15" data={chartData}/>
      {legsList.map((legs,i) => {
        return(
          <div>
            <div className="accordion" onClick={() => {
              let show = document.getElementById(`panel${i}`);
              if(show.style.display === "none"){
                show.style.display = "block";
              }else{
                show.style.display = "none";
              }
            }}>
              {eDate(legs.date)}
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
