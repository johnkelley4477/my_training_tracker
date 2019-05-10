/* Third party */
import React, {useState,useEffect} from 'react';
import { Line } from 'react-chartjs-2';
/* Components */
import firebase from '../Components/Firebase';
/* Helpers */
import formatDate from '../Helpers/formatDateReadable';

function getColor(){
  return Math.floor(Math.random() * 255);
}
const bg = `rgba(${getColor()},${getColor()},${getColor()},0.5)`;
function buildSpartanDataset(data){
  if (data !== undefined) {

  }
}
function buildPushDataset(data){
  if (data !== undefined) {
    let datasets = [{label:"Total push ups",data:[],backgroundColor:[bg]}];
    for(let d in data){
      datasets[0].data.push(
        parseInt(data[d].diamond) +
        parseInt(data[d].standsWide) +
        parseInt(data[d].standsShoulder) +
        parseInt(data[d].decline) +
        parseInt(data[d].level)
      );
    }
    return datasets;
  }else{
    return false;
  }
}
function buildLegsDataset(data){
    if(data !== undefined){
      let datasets = [
        {label:"Lunge reps",data:[],backgroundColor:[bg]},
        {label:"Squat reps",data:[],backgroundColor:[bg]},
        {label:"Bucket carry distance",data:[],backgroundColor:[bg]}
      ]
      for(let d in data){
        datasets[0].data.push(
          parseInt(data[d].lungeSet1) +
          parseInt(data[d].lungeSet2) +
          parseInt(data[d].lungeSet3)
        );
        datasets[1].data.push(
          parseInt(data[d].squatSet1) +
          parseInt(data[d].squatSet2) +
          parseInt(data[d].squatSet3)
        );
        datasets[2].data.push(
          parseFloat(data[d].bucketCarrySet1) +
          parseFloat(data[d].bucketCarrySet2) +
          parseFloat(data[d].bucketCarrySet3)
        );
      }
      return datasets;
    }else{
      return false;
    }
}
function buildAbsDataset(data){
  if(data !== undefined){
    let datasets = [
      {label:"Seconds",data:[],backgroundColor:[bg]}
    ];
    for(let d in data){
      datasets[0].data.push(
        parseInt(data[d].bicycle) +
        parseInt(data[d].jumpingjax) +
        parseInt(data[d].kneeHigh) +
        parseInt(data[d].legRaises) +
        parseInt(data[d].mountClimbers) +
        parseInt(data[d].russianTwist) +
        parseInt(data[d].scissors) +
        parseInt(data[d].sidePlanks) +
        parseInt(data[d].sideToSides) +
        parseInt(data[d].situps)
      );
    }
    return datasets;
  }else{
    return false;
  }
}
function buildPullDataset(data){
  if(data !== undefined){
    let datasets = [
      {label:"Climbs reps",data:[],backgroundColor:[bg]},
      {label:"Total pullups",data:[],backgroundColor:[bg]},
      {label:"Avg hang time",data:[],backgroundColor:[bg]}
    ];
    for(let d in data){
      datasets[0].data.push(parseInt(data[d].rope));
      datasets[1].data.push(
        parseInt(data[d].shoulder1) +
        parseInt(data[d].shoulder2) +
        parseInt(data[d].shoulder3) +
        parseInt(data[d].together1) +
        parseInt(data[d].together2) +
        parseInt(data[d].together3) +
        parseInt(data[d].wide1) +
        parseInt(data[d].wide2) +
        parseInt(data[d].wide3)
      )
      datasets[2].data.push((
          parseInt(data[d].hang1) +
          parseInt(data[d].hang2) +
          parseInt(data[d].hang3)
        )/3
      )
    }
    return datasets;
  }else{
    return false;
  }
}
function buildChart(props){
  const source= props.exercise;
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    let chart = {labels:[],datasets:[]};
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        const stats = firebase.database().ref(`${source}/${FBUser.uid}`).orderByChild('timestamp');
        let FBStats = [];
        stats.on('child_added',snapshot => {
          const FBStat = snapshot.val();
          chart.labels.push(formatDate(FBStat.date));
          FBStats.push(FBStat);
        });
        if (FBStats.length > 0) {
          switch (source) {
            case "Pull":
              chart.datasets = buildPullDataset(FBStats);
              break;
            case "Abs":
              chart.datasets = buildAbsDataset(FBStats);
              break;
            case "Legs":
              chart.datasets = buildLegsDataset(FBStats);
              break;
            case "Push":
              chart.datasets = buildPushDataset(FBStats);
              break;
            case "Spartan":
              chart.datasets = buildPushDataset(FBStats);
              break;
            default:
              break;
          }
        }
      }
    });
    return () => {
      if(chart.datasets.length > 0)
        setChartData(chart);
    }
  });
  if(chartData !== {}){
    return (
      <Line data={chartData}/>
    );
  }
}

export default buildChart;
