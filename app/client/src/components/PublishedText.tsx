function PublishedText(props: any) {
	let style2 = "w-full h-auto mt-2 p-2";

	if (props.data.block === null) {
		// editButton = true;
	} else {
		props.data.block.style.length;

		if (props.data.block.style.length !== 0) {
			style2 =
				style2 +
				props.data.block.style[0].italic +
				props.data.block.style[0].bold +
				props.data.block.style[0].size +
				props.data.block.style[0].align +
				props.data.block.style[0].colour;
		}
	}

	return (
		<div>
			{props.data.block !== null && (
				<div className="flex flex-col">
					<div className={style2}>{props.data.block.text.trim()}</div>
				</div>
			)}
		</div>
	);
}

export default PublishedText;
