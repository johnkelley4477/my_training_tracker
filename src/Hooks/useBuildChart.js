/* Third party */
import {useState,useEffect} from 'react';
/* Components */
import firebase from '../Components/Firebase';

function getColor(){
  return Math.floor(Math.random() * 255);
}
function formateDate(d){
  const dsplit = d.split('-');
  const date = new Date(dsplit[0] + "," + dsplit[1] + "," + dsplit[2]);
  var day = date.getDate();
  var monthIndex = date.getMonth() + 1;
  var year = date.getFullYear();
  return monthIndex + '/' + day + '/' + year;
}
function buildPullDataset(data){
  if(data !== undefined){
    let datasets = [
      {label:"Climbs reps",data:[],backgroundColor:[`rgba(${getColor()},${getColor()},${getColor()},0.5)`]},
      {label:"Total pullups",data:[],backgroundColor:[`rgba(${getColor()},${getColor()},${getColor()},0.5)`]},
      {label:"Avg hang time",data:[],backgroundColor:[`rgba(${getColor()},${getColor()},${getColor()},0.5)`]}
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
function buildChart(source){
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    let chart = {labels:[],datasets:[]};
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        const stats = firebase.database().ref(`${source}/${FBUser.uid}`).orderByChild('timestamp');
        let FBStats = [];
        stats.on('child_added',snapshot => {
          const FBStat = snapshot.val();
          chart.labels.push(formateDate(FBStat.date));
          FBStats.push(FBStat);
        });
        switch (source) {
          case "Pull":
            chart.datasets = buildPullDataset(FBStats);
            break;
          default:
            break;
        }
      }
    });
    return () => {
      if(chart.datasets.length > 0)
        setChartData(chart);
    }
  });
  if(chartData !== {})
    return chartData;
}

export default buildChart;
