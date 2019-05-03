/* Third Party */
import React from 'react';
/* Components */
import Exercise from './ExerciseListItem';
function Home (props) {
  return(
    <div>
        <Exercise date={props.last.Pull} exercise="Pull" />
        <Exercise date={props.last.Push} exercise="Push" />
        <Exercise date={props.last.Abs} exercise="Abs" />
        <Exercise date={props.last.Legs} exercise="Legs" />
        <Exercise date={props.last.Spartan} exercise="Spartan" />
    </div>
  )
}

export default Home;
