// component to render the Heading
function Heading({ page, type, hasSecond, text, text2 }: any) {
	const currentPage = page;
	const headingType = type;
	const hasSecondText = hasSecond;
	const headingText = text;
	const headingText2 = text2;

	return (
		<div data-testid={`heading_${currentPage}`}>
			{headingType === 1 && hasSecondText && (
				<h1 className="text-[#023E8A] text-center text-xl font-bold">
					{headingText} <br /> {headingText2}
				</h1>
			)}
			{headingType === 1 && !hasSecondText && (
				<h1 className="text-[#023E8A] text-center text-xl font-bold">{headingText}</h1>
			)}
		</div>
	);
}

export default Heading;
