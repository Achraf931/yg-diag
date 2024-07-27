import Button from "./Button";
import React from 'react'

const ResultPage = ({ onClickTry }) => (
	<div className="flex flex-col gap-4 px-4 pb-4">
		<span className=" text-3xl">Congrats</span>

		<span className="block text-lg font-light">Quiz completed successfully.</span>

		<Button
			customStyle="w-full rounded text-white"
			onClickButton={onClickTry}
		>
			Let's do it again
		</Button>
	</div>
);

export default ResultPage;
