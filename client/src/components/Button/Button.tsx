function Button(props: any) {
    const coloursAndEffects =
        "bg-dark-cornflower-blue rounded-full text-light-cyan2 hover:bg-midnight-blue group hover:shadow font-semibold";
    const smallStyle = "button_small text-md p-0.5 h-10 w-36 font-semibold " + coloursAndEffects;
    const largeStyle = "button_large text-lg p-0.5 h-10 w-56 " + coloursAndEffects;

    const buttonText = props.text;

    const size = (): boolean => {
        if (props.size === "small") return false;
        else return true;
    };
    const execute = () => {
        props.handle();
    };

    const type = (): boolean => {
        if (props.type === "authentication") return false
        else return true;
    }

    return (
        <div>
            {!size() && (
                <button
                    data-testid="btn-small"
                    type="submit"
                    className={smallStyle}
                    onClick={execute}
                >
                    {buttonText}
                </button>
            )}
            {size() && !type() && ( //authentication large button - no onclick
                <button
                    data-testid={props.testid}
                    type="submit"
                    className={largeStyle}
                >
                    {buttonText}
                </button>
            )}
            {size() && type() && ( //not authentication large button - has onclick
                <button
                    data-testid="btn-large"
                    type="submit"
                    className={largeStyle}
                    onClick={execute}
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
}

export default Button;
