function Logo(props: any) {
	return (
		<>
			{props.page === "login" ? (
				<div data-testid="logo" className="pr-2">
					<img
						src="assets/logo.png"
						alt="Twitter Summariser Logo"
						width={props.width}
						height={props.height}
					/>
				</div>
			) : (
				<div data-testid="logo" className="fixed 2xl:ml-14 lg:ml-3">
					<img
						src="assets/logo.png"
						alt="Twitter Summariser Logo"
						width={props.width}
						height={props.height}
					/>
				</div>
			)}
			{props.page === "login" && ""}
		</>
	);
}

export default Logo;
