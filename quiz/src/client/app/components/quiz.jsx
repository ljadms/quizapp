import React from 'react';
import {Question} from './Question.jsx';
import {QuestionService} from './../service/questionService.js'

import {SideBar} from './SideBar.jsx'

export class Quiz extends React.Component {

	componentDidMount(){
	new QuestionService().getQuestions( (questions) => {
			this.setState(state => {return {questions: questions, currentQuestionIndex: 0, answerHistory: [] }})
		});
	}

	answerQuestion(correct, points) {
		let answer = {
			result: correct ? "correct" : "incorrect",
			points: correct ? points : 0
		}

		let answerHistory = this.state.answerHistory.concat(answer);

		this.setState(state => Object.assign(this.state, {answerHistory: answerHistory}));
	}

	nextQuestion(){
		let currentQuestionIndex = this.state.currentQuestionIndex;

		this.setState(state => Object.assign(this.state, {currentQuestionIndex: ++currentQuestionIndex}))
	}

	render(){
		let {quiz} = this.props;
		
		if(this.state == void(0)) return null
		let{questions, currentQuestionIndex, answerHistory} = this.state;
		let score = 0;

		let completed = questions ? currentQuestionIndex >= questions.length : false
		console.log(completed)

		answerHistory.forEach(answer => score += answer.points);

		 return (
			<div>
				<SideBar score={score} previousAnswers = {answerHistory} />
				<div className="quizWrapper">
					<div className="quizHeader">
					{this.props.quiz.title}
					</div>
		
					{ !completed? 
						(<Question image={quiz.image} index={2} question={questions[currentQuestionIndex]} answerQuestion={this.answerQuestion.bind(this)} nextQuestion={this.nextQuestion.bind(this)} />)
					 :
						(
							<div>
								<h1>Done!</h1>
								<h2>How'd you do?</h2>
								<h2>Score: {score}</h2>
								<div><a onClick={this.props.handleGoBack.bind(this)} >Go Back</a></div>
							</div>
						)
					}

				</div>
			</div>

			)
	}

}