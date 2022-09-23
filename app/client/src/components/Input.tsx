
// component to render the Heading
function Input({ page, type, inpFor, changeHandler, val, focus, blur, place}: any) {

  const currentPage = page;
  const inputType = type;
  const inputFor = inpFor;
  const changeHandlerMethod = changeHandler;
  const inputValue = val;
  const focusMethod = focus;
  const blurMethod = blur;
  const placeholderValue = place;

  let inputStyle = "";

  if(inputType === "auth") {
    inputStyle = "w-60 h-10 mb-6 border-gray-200 border rounded-sm text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E]";
  }



	return ( // return the heading based on set attributes
    <div>
      {inputType === "auth" && inputFor !== "password" && inputFor !== "confirmPassword" &&
        <input
						data-testid={`input_${currentPage}_${inputFor}`}
						type="text"
						placeholder={placeholderValue}
						required
						className={inputStyle}
						onChange={event => changeHandlerMethod(event)}
						value={inputValue}
						onFocus={focusMethod}
						onBlur={blurMethod}
				/>}
        {inputType === "auth" && inputFor === "password" &&
        <input
						data-testid={`input_${currentPage}_${inputFor}`}
						type="password"
						placeholder={placeholderValue}
						required
						className={inputStyle}
						onChange={changeHandlerMethod}
						value={inputValue}
				/>}
    </div>
	);
}

export default Input;
