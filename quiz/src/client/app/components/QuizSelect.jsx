import React from 'react';

export class QuizSelect extends React.Component {

	render(){
		let {quizzes, selectQuiz} = this.props;
	
		let quizCards = quizzes.map((quiz,i) => {
			return (
				<div key={"quiz"+i} className="quizCard" onClick={() => this.props.selectQuiz.bind(this)(i)} >
					<h1> {quiz.title} </h1>
					<img src = {quiz.thumbnail.filePath} alt={quiz.thumbnail.altText} />
					<div dangerouslySetInnerHTML={{__html:quiz.description}}></div>
				</div>
				)
		});

		return(
			<div>
				<h1 style={{textAlign:"center"}}>Select A Quiz</h1>
				
				<div className="quizCardsWrapper" >
					{quizCards}
				</div>
				
			</div>	
		)
	}

}