function ButtonComponent({ page, text, type, size, handle, disableId, isLoading, loader }: any) {
	const fixedStyle = disableId
		? "bg-dark-cornflower-blue rounded-sm text-white font-semibold opacity-50"
		: "bg-dark-cornflower-blue rounded-sm text-white font-semibold hover:bg-midnight-blue group hover:shadow";

	const sizeStyle = size === "small" ? "text-md p-0.5 h-10 w-36" : "text-lg p-0.5 h-10 w-60";
	const buttonText = text;

	handle;

	return (
		<div>
			{type === "authentication" && isLoading && (
				<button
					data-testid={`button_${page}_loading_${text}`}
					type="button"
					className={`flex flex-col ${fixedStyle} group hover:shadow ${sizeStyle}  justify-center items-center`}
					disabled
				>
					{loader}
				</button>
			)}
			{type === "authentication" && !isLoading && (
				<button
					data-testid={`button_${page}_notLoading_${text}`}
					type="submit"
					className={`${fixedStyle} ${sizeStyle}`}
					disabled={disableId}
				>
					{buttonText}
				</button>
			)}
		</div>
	);
}

export default ButtonComponent;
