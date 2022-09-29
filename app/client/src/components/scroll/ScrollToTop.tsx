import { useEffect, useState } from "react";
import { BiArrowFromBottom } from "react-icons/bi";

import { classNames } from "../../utils/classNames";

export function ScrollToTop() {
	const [isVisble, setIsVisible] = useState(false);

	function toggleVisibility() {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	}

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);

		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	return (
		<div className="fixed flex flex-row justify-end right-2 bottom-20 z-50">
			<button
				type="button"
				onClick={scrollToTop}
				className={classNames(
					isVisble ? "opacity-100" : "opacity-0",
					"inline-flex items-center p-3 rounded-full shadow-sm text-white bg-midnight-blue transition-opacity hover:bg-blue-800 focus:outline-none focus:ring-offset-2 focus:ring-blue-500"
				)}
			>
				<BiArrowFromBottom className="h-6 w-6" aria-hidden="true" />
			</button>
		</div>
	);
}

export default ScrollToTop;
