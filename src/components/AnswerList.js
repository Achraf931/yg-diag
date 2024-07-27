import Answer from "./Answer";

const AnswerList = ({ answers, selected, onSelectAnswer }) => (
	<div className="flex flex-col gap-2 mt-4">
		{answers.map((ans, index) => (
			<Answer
				key={index}
				text={ans}
				selected={selected === ans}
				onSelectAnswer={() => onSelectAnswer(ans)}
			/>
		))}
	</div>
);

export default AnswerList;
