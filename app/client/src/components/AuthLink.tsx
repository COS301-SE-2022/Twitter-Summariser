function AuthLink({linkData} : any) {
  const linkStyle = "text-[#03045E] text-md text-center mt-6 font-medium";
  const buttonStyle = "text-[#0096C7] hover:text-[#03045E]";

  const currPage = linkData.page;
  const linkLabel = linkData.label;
  const buttonHandler = linkData.handler;
  const linkText = linkData.text;


	return (
		<>
      <p className={linkStyle}>
        {linkLabel}
        <button
          data-testid={`link_${currPage}_signup`}
          type="submit"
          className={buttonStyle}
          onClick={buttonHandler}
        >
          &nbsp; {linkText}
        </button>
      </p>
		</>
	);
}

export default AuthLink;
