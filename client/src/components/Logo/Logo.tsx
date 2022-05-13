import './Logo.css';

function Logo() {
    return (
        <div data-testid="logo" className="fixed ml-14">
            <img src="assets/logo.png" alt="Twitter Summarizer Logo" />
        </div>
    );
}

export default Logo;
