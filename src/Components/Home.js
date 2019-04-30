/* Third Party */
import React from 'react';
/* Components */
import Exercise from './ExerciseListItem';
class Home extends React.Component {
  render(){
    return(

      <div>
          <Exercise date={this.props.last.Pull} exercise="Pull" />
          <Exercise date={this.props.last.Push} exercise="Push" />
          <Exercise date={this.props.last.Abs} exercise="Abs" />
          <Exercise date={this.props.last.Legs} exercise="Legs" />
          <Exercise date={this.props.last.Spartan} exercise="Spartan" />
      </div>
    )
  }
}

export default Home;
