import LogoComponent from "./LogoComponent";
import Heading from "./Heading";
import Input from "./Input";
import Checkbox from "./Checkbox";
import ButtonComponent from "./ButtonComponent";
import AuthLink from "./AuthLink";

function LoginPage({ loginPageData }: any) {
	const pageStyle = "flex justify-center flex-col items-center h-screen w-screen";
	const currPage = loginPageData.page;
	const submissionHandler = loginPageData.subHandler;
	const changeHandlerMethod = loginPageData.changeHandler;
	const changeValue = loginPageData.changeVal;
	const focusMethod = loginPageData.focusMeth;
	const blurMethod = loginPageData.blurMeth;
	const passwordHandlerMethod = loginPageData.passwordHandle;
	const passwordValue = loginPageData.passwordVal;
	const checkedChangeHandler = loginPageData.checkedChangeHandle;
	const checkedValue = loginPageData.checkedVal;
	const loading = loginPageData.isLoading;
	const loadIcon = loginPageData.loaderIcon;
	const validEmail = loginPageData.emailValidity;
	const validPassword = loginPageData.passwordValidity;
	const linkData = loginPageData.linkInfo;

	return (
		<div data-testid={`page_${currPage}`} className={pageStyle}>
			<LogoComponent page="login" width={136} height={121} />
			<br />
			<Heading
				page="login"
				type={1}
				hasSecond
				text="Sign in to "
				text2="Twitter Summariser"
			/>
			<br />
			{/* CODE TO SHOW - READY TO EXPLORE GOES HERE */}

			{/* CODE TO SHOW INCORRECT CREDENTIALS GOES HERE */}

			{/* CODE TO SHOW - SOMETHING WENT WRONG GOES HERE */}
			<div>
				<form onSubmit={submissionHandler} autoComplete="new-password" action="">
					<Input
						page="login"
						type="auth"
						inpFor="email"
						changeHandler={changeHandlerMethod}
						inputValue={changeValue}
						focus={focusMethod}
						blur={blurMethod}
						place="Email"
					/>
					{/* CODE FOR VALID EMAIL GOES HERE */}
					<br />
					<Input
						page="login"
						type="auth"
						inpFor="password"
						changeHandler={passwordHandlerMethod}
						inputValue={passwordValue}
						place="Password"
					/>
					<br /> <br />
					<Checkbox
						page="login"
						inpFor="remember"
						changeHandler={checkedChangeHandler}
						checked={checkedValue}
						text="Remember this device?"
					/>
					{loading && (
						<ButtonComponent
							page="login"
							text="Login"
							type="authentication"
							size="large"
							disableId
							isLoading
							loader={loadIcon}
						/>
					)}
					{!loading && (
						<ButtonComponent
							page="login"
							text="Login"
							type="authentication"
							size="large"
							disableId={!validEmail || !validPassword ? "true" : "false"}
							isLoading={false}
						/>
					)}
					<AuthLink linkData={linkData} />
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
