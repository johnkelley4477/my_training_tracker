/* Third Party */
import React from 'react';
/* Components */
import StatsItem from './StatsItem';
function Stats (props) {
  return(
    <div>
        <h3>Statistics</h3>
        <StatsItem date={props.last.Pull} exercise="Pull" />
        <StatsItem date={props.last.Push} exercise="Push" />
        <StatsItem date={props.last.Abs} exercise="Abs" />
        <StatsItem date={props.last.Legs} exercise="Legs" />
        <StatsItem date={props.last.Spartan} exercise="Spartan" />
    </div>
  )
}

export default Stats;