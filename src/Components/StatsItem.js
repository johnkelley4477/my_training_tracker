/* Third Party */
import React from 'react';
/* Client Side CSS */
import '../client/css/stats.css';
/* Custom Hooks */
import UseBuildChart from '../Hooks/useBuildChart';

function statsItem(props){
	return(
		<a href= {"/stats/" + props.exercise.toLowerCase()} className="no_dec text_center">
			<div className="stats">
				<h2 className="font_large">{props.exercise}</h2>
				<UseBuildChart exercise={props.exercise} min="true"/>
			</div>
		</a>
	)
}

export default statsItem;
