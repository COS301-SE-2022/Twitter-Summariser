// eslint-disable-next-line import/prefer-default-export
export function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}
