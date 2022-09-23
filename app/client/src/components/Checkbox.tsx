
// component to render the Checkbox
function Checkbox({ page, text, inpFor, changeHandler, checked}: any) {

  const currentPage = page;
  const inputFor = inpFor;
  const changeHandlerMethod = changeHandler;
  const checkedValue = checked;
  const checkboxText = text;

  const checkBoxStyle = "w-5 h-5 text-blue-600 accent-dark-cornflower-blue border rounded-sm focus:ring focus:outline-none";
  const checkBoxLabelStyle = "ml-2 text-sm font-medium";


	return ( // return the checkbox based on set attributes
    <div className="flex items-center mb-4">
        <input
          id={inputFor}
          data-testid={`checkbox_${currentPage}_${inputFor}`}
          type="checkbox"
          onChange={changeHandlerMethod}
          checked={checkedValue}
          className={checkBoxStyle}
        />
        <label htmlFor={inputFor} className={checkBoxLabelStyle}>
          {checkboxText}
        </label>
    </div>
	);
}

export default Checkbox;
