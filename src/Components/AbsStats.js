/* Third party*/
import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {navigate} from '@reach/router';
//import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';
/* Custom Hooks */
import useBuildChart from '../Hooks/useBuildChart';

function AbsStats(){
  const [absList, setAbsList] = useState([]);
  const [userId, setUserId] = useState(null);
  function formateDate(d){
    const dsplit = d.split('-');
    const date = new Date(dsplit[0] + "," + dsplit[1] + "," + dsplit[2]);
    var day = date.getDate();
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();
    return monthIndex + '/' + day + '/' + year;
  }
  function deleteRecord(e,id) {
    e.preventDefault();
    const ref = firebase.database().ref(`Abs/${userId}/${id}`);
    ref.remove();
		navigate('/stats/abs');
  }
  useEffect(() => {
    let absList = [];
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        setUserId(FBUser.uid);
        const absstats = firebase.database().ref('Abs/' + FBUser.uid);
        absstats.orderByChild('timestamp').on('child_added',snapshot => {
          const FBAbsStats = snapshot.val();
          FBAbsStats.id = snapshot.key;
          FBAbsStats.total = ((parseInt(FBAbsStats.bicycle) +
            parseInt(FBAbsStats.jumpingjax) +
            parseInt(FBAbsStats.kneeHigh) +
            parseInt(FBAbsStats.legRaises) +
            parseInt(FBAbsStats.mountClimbers) +
            parseInt(FBAbsStats.russianTwist) +
            parseInt(FBAbsStats.scissors) +
            parseInt(FBAbsStats.sidePlanks) +
            parseInt(FBAbsStats.sideToSides) +
            parseInt(FBAbsStats.situps)
          )/60).toFixed(2);
          absList.push(FBAbsStats);
        })
      }
    })
    return () => {
      if(absList.length > 0){
        setAbsList(absList);
      }
    }
  });
  let panelStyle = {
    display: "none"
  }
  return(
    <div>
      <h3>Abs Stats</h3>
      <Line className="mb15" data={useBuildChart('Abs')}/>
      {absList.map((abs,i) => {
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
              {formateDate(abs.date)} <span className="sub">{abs.total.toString()} mins.</span>
            </div>
            <div id={"panel" + i} className="panel" style={panelStyle}>
              <ul className="none text_right mr30per">
                <li><span className="bold" >Bicycle</span> {abs.bicycle} mins</li>
                <li><span className="bold" >Jumping Jax</span> {abs.jumpingjax} mins</li>
                <li><span className="bold" >Knee High</span> {abs.kneeHigh} mins</li>
                <li><span className="bold" >Leg Raises</span> {abs.legRaises} mins</li>
                <li><span className="bold" >Mount Climbers</span> {abs.mountClimbers} mins</li>
                <li><span className="bold" >Russian Twist</span> {abs.russianTwist} mins</li>
                <li><span className="bold" >Scissors</span> {abs.scissors} mins</li>
                <li><span className="bold" >Side Planks</span> {abs.sidePlanks} mins</li>
                <li><span className="bold" >Side To Sides</span> {abs.sideToSides} mins</li>
                <li><span className="bold" >Situps</span> {abs.situps} mins</li>
              </ul>
              <input type="button" className="center mt10" value="Delete" onClick={e => deleteRecord(e, abs.id)}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AbsStats;
