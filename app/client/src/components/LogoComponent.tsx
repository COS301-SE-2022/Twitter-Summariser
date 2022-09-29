// component to render the logo
function LogoComponent({ page, width, height }: any) {
	// page is the page that the logo is being rendered on

	// set the width and height of the logo depending on the page rendering the logo
	const currentPage = page;
	const logoWidth = width;
	const logoHeight = height;

	let logoStyle = "";

	if (currentPage === "auth" || currentPage === "splash") {
		// if the page is an authentication page
		logoStyle = "pr-2";
	} else currentPage === "landing"; // if the page is the landing page
	logoStyle = "fixed 2xl:ml-14 lg:ml-3";

	return (
		// return the logo based on set attributes
		<div data-testid={`logo_${currentPage}`} className={logoStyle}>
			<img
				src="assets/logo.png"
				alt="Twitter Summariser Logo"
				width={logoWidth}
				height={logoHeight}
			/>
		</div>
	);
}

export default LogoComponent;
