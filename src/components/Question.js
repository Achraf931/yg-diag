const Question = ({ current }) => (
	<>
		<p className="mt-6 text-2xl leading-tight">{ current?.question }</p>
		<p className="text-[13px] text-[#1A1C0C]">Choisissez une réponse pour passer à l’étape suivante</p>
	</>
);

export default Question;
