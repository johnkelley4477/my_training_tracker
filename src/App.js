/* Third parties */
import React, { Component } from 'react';
import {Router, navigate} from '@reach/router';
/* Components */
//import Header from './Components/Header';
import Regigter from './Components/Register';
import Login from './Components/Login';
import firebase from './Components/Firebase';
import Pull from './Components/Pull';
import Push from './Components/Push';
import Legs from './Components/Legs';
import Abs from './Components/Abs';
import Home from './Components/Home';
import Spartan from './Components/Spartan';
import PullStats from './Components/PullStats';
import PushStats from './Components/PushStats';
import LegsStats from './Components/LegsStats';
import AbsStats from './Components/AbsStats';
import SpartanStats from './Components/SpartanStats';
import Stats from './Components/Stats';
//import ExerciseListItem from './Components/ExerciseListItem';
/* client side static */
import "./client/css/general.css"

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null,
      last: {"Spartan":null, "Pull":null, "Push":null, "Abs":null, "Legs":null}
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });

        const pulls = firebase.database().ref('Pull/' + FBUser.uid).orderByChild("timestamp").limitToLast(1);
        const pushes = firebase.database().ref('Push/' + FBUser.uid).orderByChild("timestamp").limitToLast(1);
        const abs = firebase.database().ref('Abs/' + FBUser.uid).orderByChild("timestamp").limitToLast(1);
        const legs = firebase.database().ref('Legs/' + FBUser.uid).orderByChild("timestamp").limitToLast(1);
        const spartan = firebase.database().ref('Spartan/' + FBUser.uid).orderByChild("timestamp").limitToLast(1);
        const last = {"Spartan":this.state.last.Spartan,"Pull":this.state.last.Pull, "Push":this.state.last.Push, "Abs":this.state.last.Abs, "Legs":this.state.last.Legs};
        //get Pulls Spartan date done
        spartan.on('value',snapshot => {
          let FBSpartan = snapshot.val();
          for(let items in FBSpartan){
            this.setState(state => {
              last.Spartan = FBSpartan[items].date;
              return {last};
            });
          }
        })
        //get Pulls Last date done
        pulls.on('value',snapshot => {
          let FBpulls = snapshot.val();
          for(let items in FBpulls){
            this.setState(state => {
              last.Pull = FBpulls[items].date;
              return {last};
            });
          }
        })
        //get Push Last date done
        pushes.on('value',snapshot => {
          let FBpushes = snapshot.val();
          for(let items in FBpushes){
           this.setState(state => {
             last.Push = FBpushes[items].date;
             return {last};
           });
          }
        })
        //get Abs Last date done
        abs.on('value',snapshot => {
          let FBAbs = snapshot.val();
          for(let items in FBAbs){
            this.setState(state => {
              last.Abs = FBAbs[items].date;
              return {last};
            });
          }
        })
        //get Legss Last date done
        legs.on('value',snapshot => {
          let FBlegs = snapshot.val();
          for(let items in FBlegs){
            this.setState(state => {
              last.Legs = FBlegs[items].date;
              return {last};
            });
          }
        });
      }else{
        this.setState({
          user: null,
          displayName: null,
          userID: null,
        });
      }
    });
  }
  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() =>{
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate('/');
      })
    });
  }
  render() {
    return (
      <div>
        <div>
          <Router>
              <Regigter path="/register" registerUser= {this.registerUser}/>
              <Pull path="/pull" user={this.state.userID}/>
              <Push path="/push" user={this.state.userID}/>
              <Legs path="/legs" user={this.state.userID}/>
              <Abs path="/abs" user={this.state.userID}/>
              <Home path="/" last= {this.state.last}/>
              <Stats path="/stats" last= {this.state.last}/>
              <Spartan path="/spartan" user={this.state.userID}/>
              <PullStats path="/stats/pull" user={this.state.userID}/>
              <PushStats path="/stats/push" user={this.state.userID}/>
              <LegsStats path="/stats/legs" user={this.state.userID}/>
              <AbsStats path="/stats/abs" user={this.state.userID}/>
              <SpartanStats path="/stats/spartan" user={this.state.userID}/>
              <Login path="/login" />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
