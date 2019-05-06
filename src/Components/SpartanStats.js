/* Third party*/
import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {navigate} from '@reach/router';
//import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';

function SpartanStats(props) {
  const [userID, setUserId] = useState(null);
  const [spartanList, setSpartanList] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    let spartanList = [];
    let chartData = {labels:[],datasets:[
      {label:"Distance",data:[],backgroundColor:['rgba(0,255,255,0.5)']},
      {label:"Burpees",data:[],backgroundColor:['rgba(255,0,0,0.5)']}
    ]};
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        setUserId(FBUser.uid);
        const spartanstats = firebase.database().ref('Spartan/' + FBUser.uid).orderByChild('timestamp');
        spartanstats.on('child_added',snapshot => {
          const FBSpartanStats = snapshot.val();
          let burpees = 0;
          FBSpartanStats.id = snapshot.key;
          spartanList.push(FBSpartanStats);
          /* Build out chart data */
          chartData.labels.push(formateDate(FBSpartanStats.date));
          chartData.datasets[0].data.push(FBSpartanStats.distance);
          for(let i = 0;i < (FBSpartanStats.distance/FBSpartanStats.reps); i++){
            if(FBSpartanStats[`exercise${i}`] === "burpees"){
              burpees += parseInt(FBSpartanStats[`reps${i}`]);
            }
          }
          chartData.datasets[1].data.push(burpees);
        });
      }
    });
    return () => {
      if(chartData.labels.length > 0){
        setChartData(chartData);
      }
      if(spartanList.length > 0  ){
        setSpartanList(spartanList);
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
  function buildItervals(spartan){
    let intervals = [];
    const count = spartan.distance / spartan.reps;
    for (var i = 0; i < count; i++) {
      intervals.push(
        <div className="b_border">
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
        <Line data={chartData}/>
      </div>
      {spartanList.map((spartan,i) => {
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
                {formateDate(spartan.date)}
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
