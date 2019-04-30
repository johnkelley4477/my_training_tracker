/* Third Party*/
import React from 'react';
/* Components */
import ExerciseListItem from './ExerciseListItem';

class exerciseList extends React.Component {
	constructor(){
		super();
		this.state = {
			"exercisesTypes":[
				"Pull": {
					"destination":"/pull".
					"title":"Pull",
					"daysAgo":"0"
				},
				"Push": {
					"destination":"/push".
					"title":"Push",
					"daysAgo":"3"
				},
				"Abs": {
					"destination":"/abs".
					"title":"Abs",
					"daysAgo":"5"
				},
				"Legs": {
					"destination":"/legs".
					"title":"legs",
					"daysAgo":""
				}
			]
		}
	}
	render(){
		return(

		);
	}
}

export default exerciseList;