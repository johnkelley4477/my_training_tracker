/* Third party*/
import React from 'react';
import { Line } from 'react-chartjs-2';
//import {navigate} from '@reach/router';
/* Components */
import firebase from './Firebase';
/* Client side */
import '../client/css/accordion.css';

class PullStats extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      displayName: null,
      userID: null,
      pullsList: [],
      chartData:{}
    }
    this.handleChange = this.handleChange.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }
  handleChange(e){
		e.preventDefault();
		const itemName = e.target.name;
		const itemValue = e.target.value;
		this.setState({[itemName]: itemValue},() => {
			if(this.state.email !== '' && this.state.password !== ''){
				this.setState({isEnabled: true});
			}
		});
	}
  panelSwitch(panel,stateString){
		let state = {};
		if(panel){
			state[stateString]= false;
		}else{
			state[stateString]= true;
		}
		this.setState(state);
	}
  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        const pullstats = firebase.database().ref('Pull/' + FBUser.uid);
        pullstats.orderByChild('date').on('value',snapshot => {
          const FBPullsStats = snapshot.val();
          let pullsList = [];
          let chartData = {labels:[],datasets:[
            {label:"Climbs reps",data:[],backgroundColor:['rgba(0,255,255,0.5)']},
            {label:"Total pullups",data:[],backgroundColor:['rgba(255,0,0,0.5)']},
            {label:"Avg hang time",data:[],backgroundColor:['rgba(0,255,0,0.5)']}
          ]};

          let i = 0;
          for(let pull in FBPullsStats){
            FBPullsStats[pull].id = pull;
            pullsList.push(FBPullsStats[pull]);
            let showPull = {};
            showPull[`showPull${i}`] = false;
            this.setState(showPull);
            /* Build out chart data */
            chartData.labels.push(this.formateDate(FBPullsStats[pull].date));
            chartData.datasets[0].data.push(FBPullsStats[pull].rope);
            chartData.datasets[1].data.push(
              parseInt(FBPullsStats[pull].shoulder1) +
              parseInt(FBPullsStats[pull].shoulder2) +
              parseInt(FBPullsStats[pull].shoulder3) +
              parseInt(FBPullsStats[pull].together1) +
              parseInt(FBPullsStats[pull].together2) +
              parseInt(FBPullsStats[pull].together3) +
              parseInt(FBPullsStats[pull].wide1) +
              parseInt(FBPullsStats[pull].wide2) +
              parseInt(FBPullsStats[pull].wide3)
            )
            chartData.datasets[2].data.push((
                parseInt(FBPullsStats[pull].hang1) +
                parseInt(FBPullsStats[pull].hang2) +
                parseInt(FBPullsStats[pull].hang3)
              )/3
            )
            i++;
          }
          this.setState({pullsList: pullsList,chartData:chartData});
        });
      }else{
        this.setState({
          user: null,
          displayName: null,
          userID: null
        });
      }
    });
  }
  deleteRecord(e,id) {
    console.log(`Pull/${this.props.userID}/${id}`);
    e.preventDefault();
    const ref = firebase.database().ref(`Pull/${this.props.user}/${id}`);
    ref.remove();
  }
  formateDate(d){
    const dsplit = d.split('-');
    const date = new Date(dsplit[0] + "," + dsplit[1] + "," + dsplit[2]);
    var day = date.getDate();
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();
    return monthIndex + '/' + day + '/' + year;
  }
  render(){
    return(
      <div>
        <div className="chart">
          <Line data={this.state.chartData}/>
        </div>
        {this.state.pullsList.map((pull,i) => {
          return(
            <div>
              <div className="accordion mt15" onClick={() => this.panelSwitch(this.state[`showPull${i}`], `showPull${i}`)}>
                {this.formateDate(pull.date)}
              </div>
              {this.state[`showPull${i}`] && (
                <div className="panel">
                  <input type="button" className="f_right mb10" value="Delete" onClick={e => this.deleteRecord(e, pull.id)}/>
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
              </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
}
export default PullStats;
