const Button = ({ children, disabled, customStyle, onClickButton }) => {
	let buttonStyle = `bg-secondary text-white font-bold p-4 flex items-center justify-center gap-2 ${customStyle}`;

	if (disabled) buttonStyle += ' bg-gray-300 text-gray-500 cursor-not-allowed';

	return (
		<button
			type="button"
			className={buttonStyle}
			onClick={onClickButton}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
