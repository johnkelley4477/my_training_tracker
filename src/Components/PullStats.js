/* Third party*/
import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {navigate} from '@reach/router';
//import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';

function PullStats(props) {
  const [userID, setUserId] = useState(null);
  const [pullsList, setPullsList] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    let pullsList = [];
    let chartData = {labels:[],datasets:[
      {label:"Climbs reps",data:[],backgroundColor:['rgba(0,255,255,0.5)']},
      {label:"Total pullups",data:[],backgroundColor:['rgba(255,0,0,0.5)']},
      {label:"Avg hang time",data:[],backgroundColor:['rgba(0,255,0,0.5)']}
    ]};
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        setUserId(FBUser.uid);
        const pullstats = firebase.database().ref('Pull/' + FBUser.uid).orderByChild('timestamp');
        pullstats.on('child_added',snapshot => {
          const FBPullsStats = snapshot.val();
          FBPullsStats.id = snapshot.key;
          pullsList.push(FBPullsStats);
          /* Build out chart data */
          chartData.labels.push(formateDate(FBPullsStats.date));
          chartData.datasets[0].data.push(FBPullsStats.rope);
          chartData.datasets[1].data.push(
            parseInt(FBPullsStats.shoulder1) +
            parseInt(FBPullsStats.shoulder2) +
            parseInt(FBPullsStats.shoulder3) +
            parseInt(FBPullsStats.together1) +
            parseInt(FBPullsStats.together2) +
            parseInt(FBPullsStats.together3) +
            parseInt(FBPullsStats.wide1) +
            parseInt(FBPullsStats.wide2) +
            parseInt(FBPullsStats.wide3)
          )
          chartData.datasets[2].data.push((
              parseInt(FBPullsStats.hang1) +
              parseInt(FBPullsStats.hang2) +
              parseInt(FBPullsStats.hang3)
            )/3
          )
        });
      }
    });
    return () => {
      if(chartData.labels.length > 0){
        setChartData(chartData);
      }
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
  function formateDate(d){
    const dsplit = d.split('-');
    const date = new Date(dsplit[0] + "," + dsplit[1] + "," + dsplit[2]);
    var day = date.getDate();
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();
    return monthIndex + '/' + day + '/' + year;
  }
  let panelStyle = {
    display: "none"
  }
  return(
    <div>
      <h3 className="text_center">Pull Ups set 1</h3>
      <div className="chart mb15">
        <Line data={chartData}/>
      </div>
      {pullsList.map((pull,i) => {
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
                {formateDate(pull.date)}
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
              <div className="grid-parent">
                {pull.comments}
              </div>
              <input type="button" className="center mt15" value="Delete" onClick={e => deleteRecord(e, pull.id)}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default PullStats;
