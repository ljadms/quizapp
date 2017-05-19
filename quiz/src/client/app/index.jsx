import React from 'react';
import {render} from 'react-dom';
import {Quiz} from './components/quiz.jsx';
import {QuizService} from './service/quizService.js';
import {QuizSelect} from './components/QuizSelect.jsx';

class QuizApp extends React.Component {

	componentDidMount(){
	 new QuizService().getQuizzes( (quizzes) => {
					this.setState(state => {return {quizzes: quizzes, selected: -1}});
				});
	}

	handleSelectQuiz(quizIndex) {
		this.setState(state => Object.assign(this.state, {selected: quizIndex}))
	}

	handleGoBack() {
		this.setState(state => Object.assign(this.state, {selected: -1}))
	}

	render() {
		if(this.state == void(0)) return null
		let {quizzes, selected} = this.state;

		let quiz = selected > -1 ? quizzes[selected] : null;

		
		return (
			<div>
		{selected > -1 ?
			 <Quiz quiz={quiz} handleGoBack={this.handleGoBack.bind(this)} /> 
			:
			 <QuizSelect quizzes={quizzes} selectQuiz={this.handleSelectQuiz.bind(this)} />
		}
			</div>
			);
	}
}

render(<QuizApp/>, document.getElementById("quizApp"));