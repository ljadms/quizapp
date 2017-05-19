import React from 'react';


export class Question extends React.Component {

	componentDidMount(){
		this.setState(state => { return {answered: false, correct: false} });
	}

	handleAnswerClick(selectedAnswer, answerIndex){
		let correct = ((answerIndex + 1) == this.props.question.correct);
		
		this.props.answerQuestion(correct, this.props.question.level);

		this.setState(state => Object.assign(this.state,{answer: selectedAnswer, answered: true, correct: correct}));
	}

	handleNextQuestionClick(){
		this.props.nextQuestion();

		this.setState(state => Object.assign({answered:false}))
	}

	render(){
		if(this.state == void(0)) return null;

		let {image, index, question, nextQuestion} = this.props;
		let {answer, answered, correct} = this.state;

		let answers = question.answers.map((answer, i) => <div key={answer + i} onClick={this.handleAnswerClick.bind(this,answer,i)}>{answer}</div>)

		return (
			<div className="questionWrapper">
			<img src={image.filePath} alt={image.altText} title={image.credit}></img>
				<div className="questionOverlay">
					
					<h2>
						Question {index}
					</h2>
					<p>{question.level} point{question.level > 1 && 's'}</p>
					<h1  dangerouslySetInnerHTML={{__html:question.question}}>
					
					</h1>
					{ !answered ? (
					
					<div className="answers">
						{answers}
					</div>
					
					) :
					(
					<div>
						<h2>
							<p>{answer}</p>
							<p>{correct ? "Correct!" : "Incorrect"}</p>
						</h2>
						
						<div dangerouslySetInnerHTML={{__html:question.explanation}}></div>
						<button onClick={this.handleNextQuestionClick.bind(this)}>Next</button>
					</div>
					)
					
					}

				</div>
			
			</div>

			)
	}

}