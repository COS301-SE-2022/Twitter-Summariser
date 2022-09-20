function PublishedText(props: any) {
	// console.log(props.data);

	// ######################### API FOR EDITING TEXT ###############################################

	// using localhost
	// const textEndpoint = "http://localhost:4000/dev/editBlock";

	// let data;

	// #############################################################################

	// let editButton = false;
	let style2 = "w-full h-auto mt-2 p-2";
	// let tempText = "";

	if (props.data.block === null) {
		// editButton = true;
	} else {
		// editButton = false;
		// console.log(props.data.block.text.length);

		props.data.block.style.length

		if(props.data.block.style.length !== 0){
			style2 =
				style2 +
				props.data.block.style[0].italic +
				props.data.block.style[0].bold +
				props.data.block.style[0].size +
				props.data.block.style[0].align +
				props.data.block.style[0].colour;
		}

		// style2 =
		// 	style2 +
		// 	props.data.block.style[0].italic +
		// 	props.data.block.style[0].bold +
		// 	props.data.block.style[0].size +
		// 	props.data.block.style[0].align +
		// 	props.data.block.style[0].colour;

		// tempText = props.data.block.text;

		// style = style2;

		// console.log(style2);
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
