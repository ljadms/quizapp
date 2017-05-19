import React from 'react';
import Question from './Question.jsx';

export class SideBar extends React.Component {

	render(){
		let {previousAnswers, score} = this.props;

		let previousAnswerCards = previousAnswers.map((pa, index) => {
			return <div key={index} className={"answerCard "+pa.result} ><span>{index + 1}</span> {pa.result}</div>
		})

		return (
			<div className="sidebar">
				<h2 className="title">
					Quizzer
				</h2>
				<div className="scoreCard">
					SCORE: <span>{score}</span>
				</div>
				{previousAnswerCards}

			</div>

			)
	}

}