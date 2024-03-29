function Button(props: any) {
	const coloursAndEffects =
		props.disableId === "true"
			? "bg-dark-cornflower-blue rounded-full text-white  font-semibold opacity-50"
			: "bg-dark-cornflower-blue rounded-full text-white font-semibold hover:bg-midnight-blue group hover:shadow";
	const coloursAndEffectsDelete =
		props.disableId === "true"
			? "bg-crimson rounded-full text-white  font-semibold opacity-50"
			: "bg-crimson rounded-full text-white font-semibold hover:bg-midnight-blue group hover:shadow";
	const smallStyle = `button_small text-md p-0.5 h-10 w-36 font-semibold ${coloursAndEffects}`;
	const smallStyleDelete = `button_small text-md p-0.5 h-10 w-36 font-semibold ${coloursAndEffectsDelete}`;
	const largeStyle = `button_large text-lg p-0.5 h-10 w-60 ${coloursAndEffects}`;
	const buttonText = props.text;

	const size = (): boolean => {
		if (props.size === "small") {
			return false;
		}
		return true;
	};
	const execute = () => {
		props.handle();
	};

	const isDisabled = (): boolean => props.disableId === "true";

	const type = (): boolean => {
		if (props.type === "authentication") {
			return false;
		}
		return true;
	};

	const isDelete = (): boolean => props.type === "delete";

	return (
		<div>
			{!size() && !isDelete() && (
				<button
					data-testid="btn-small"
					type="submit"
					className={smallStyle}
					onClick={execute}
				>
					{buttonText}
				</button>
			)}
			{!size() && isDelete() && (
				<button
					data-testid="btn-small"
					type="submit"
					className={smallStyleDelete}
					onClick={execute}
				>
					{buttonText}
				</button>
			)}
			{size() &&
				!type() && ( // authentication large button - no onclick
					<button
						data-testid={props.testid}
						type="submit"
						className={largeStyle}
						disabled={isDisabled()}
					>
						{buttonText}
					</button>
				)}
			{size() &&
				type() && ( // not authentication large button - has onclick
					<button
						data-testid="btn-large"
						type="submit"
						className={largeStyle}
						onClick={execute}
					>
						{buttonText}
					</button>
				)}
		</div>
	);
}

export default Button;
