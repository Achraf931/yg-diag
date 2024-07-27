import { useState, useEffect } from 'react';
import AnswerList from './AnswerList';
import Question from './Question';
import Accordion from './Accordion';

const SubQuestion = ({ question, onSelectAnswer, currentResponse }) => {
	const [subQuestionResponses, setSubQuestionResponses] = useState(currentResponse || Array(question.subQuestions.length).fill(null));
	const [currentAccordionIndex, setCurrentAccordionIndex] = useState(0);

	useEffect(() => {
		setSubQuestionResponses(currentResponse || Array(question.subQuestions.length).fill(null));
	}, [currentResponse]);

	const handleSelectAnswer = (answer, subQuestionIndex) => {
		const updatedResponses = {
			...subQuestionResponses,
			[subQuestionIndex]: answer,
		};
		setSubQuestionResponses(updatedResponses);

		// Vérifie si toutes les sous-questions ont été répondues
		if (Object.values(updatedResponses).every(response => response !== null)) {
			onSelectAnswer(updatedResponses);
		}

		// Change automatiquement l'accordéon
		if (currentAccordionIndex === subQuestionIndex) {
			setCurrentAccordionIndex(currentAccordionIndex + 1);
		} else {
			setCurrentAccordionIndex(subQuestionIndex);
		}
	};

	return (
		<div className="px-4">
			<Question current={{ question: question.question }} />
			{question.subQuestions.map((subQuestion, index) => (
				<div key={index}>
					<Accordion
						title={subQuestion.question}
						isOpen={currentAccordionIndex === index}
						setIsOpen={() => setCurrentAccordionIndex(index)}
						isDisabled={false}
					>
						<AnswerList
							answers={[subQuestion.correctAnswer, ...subQuestion.incorrectAnswers]}
							selected={subQuestionResponses[index]}
							onSelectAnswer={(answer) => handleSelectAnswer(answer, index)}
						/>
					</Accordion>
				</div>
			))}
		</div>
	);
};

export default SubQuestion;
