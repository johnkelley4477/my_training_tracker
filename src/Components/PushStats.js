/* Third party*/
import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
//import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';

function PushStats(){
  const [chartData, setChartData] = useState({});
  const [pushList, setPushList] = useState([]);
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
    console.log(`Push/${userId}/${id}`);
    const ref = firebase.database().ref(`Push/${userId}/${id}`);
    ref.remove();
  }
  useEffect(() => {
    let chartData = {
      labels:[],
      datasets:[{label:"Total push ups",data:[],backgroundColor:['rgba(0,255,255,0.5)']}]
    }
    let pushList = [];
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        setUserId(FBUser.uid);
        const pushstats = firebase.database().ref('Push/' + FBUser.uid);
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
            /*Chart data build*/
            chartData.labels.push(FBPushStats.date);
            chartData.datasets[0].data.push(total);
        })
      }
    })
    return () => {
      if(chartData.labels.length > 0){
        setChartData(chartData);
      }
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
      <Line className="mb15" data={chartData}/>
      {pushList.map((push,i) => {
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
              {formateDate(push.date)} <span className="sub">{push.total.toString()} push-ups</span>
            </div>
          <div id={"panel" + i} className="panel" style={panelStyle}>
              <input type="button" className="center mb10" value="Delete" onClick={e => deleteRecord(e, push.id)}/>
              <ul className="none text_right mr30per">
                <li><span className="bold" >Diamond</span> {push.diamond} reps</li>
                <li><span className="bold" >Stands Wide</span> {push.standsWide} reps</li>
                <li><span className="bold" >Stands Shoulder</span> {push.standsShoulder} reps</li>
                <li><span className="bold" >Decline</span> {push.decline} reps</li>
                <li><span className="bold" >Level</span> {push.level} reps</li>
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PushStats;
