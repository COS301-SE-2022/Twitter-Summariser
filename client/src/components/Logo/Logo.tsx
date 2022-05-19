// import './Logo.css';

const Logo = (props: any) => {
  return (
    <>
      {props.page === "login" ? (
        <div data-testid="logo" className="">
          <img
            src="assets/logo.png"
            alt="Twitter Summarizer Logo"
            width={props.width}
            height={props.height}
          />
        </div>
      ) : (
        <div data-testid="logo" className="fixed ml-14">
          <img
            src="assets/logo.png"
            alt="Twitter Summarizer Logo"
            width={props.width}
            height={props.height}
          />
        </div>
      )}
    </>
  );
};

export default Logo;
