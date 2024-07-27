const Answer = ({ text, selected, onSelectAnswer }) => {
	const answerStyle = {
		label: `px-4 py-3 block cursor-pointer rounded-lg ${selected ? 'bg-[#143616] text-white' : 'bg-[#F4F4F4]'} active:bg-[#143616] active:text-white`,
		title: 'text-[15px] font-bold',
		text: 'text-[13px]'
	};

	return (
		<div onClick={onSelectAnswer} className={answerStyle.label}>
			<p className={answerStyle.title}>{text}</p>
			<p className={answerStyle.text}>{text}</p>
		</div>
	);
};

export default Answer;
