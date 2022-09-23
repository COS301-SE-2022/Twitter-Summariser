import { Tab } from "@headlessui/react";
import { classNames } from "../utils/classNames";
import Reports from "./Reports";
import Drafts from "./Drafts";
import Shared from "./Shared";

function Something() {
	return (
		<div className="flex flex-col justify-center items-center text-center w-full p-2 mt-8">
			<div className="flex flex-row justify-around">
				<h1 className="text-3xl hidden lg:flex lg:flex-row lg:justify-center  pb-4 align-middle items-center">
					My Reports
				</h1>
			</div>
			<Tab.Group>
				<Tab.List className="flex space-x-1 rounded-xl bg-white p-1 w-full border sm:mt-0 mt-4">
					<Tab
						key="1"
						className={({ selected }) =>
							classNames(
								"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
								selected ? "bg-blue-100 shadow" : "text-blue-700 hover:bg-blue-50"
							)
						}
					>
						Published
					</Tab>
					<Tab
						key="2"
						className={({ selected }) =>
							classNames(
								"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
								selected ? "bg-blue-100  shadow" : "text-blue-700 hover:bg-blue-50"
							)
						}
					>
						Draft
					</Tab>
					<Tab
						key="3"
						className={({ selected }) =>
							classNames(
								"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
								selected ? "bg-blue-100  shadow" : "text-blue-700 hover:bg-blue-50"
							)
						}
					>
						Shared
					</Tab>
				</Tab.List>

				<Tab.Panels className="mt-2">
					<Tab.Panel key="1" className={classNames("rounded-xl bg-white")}>
						<Reports />
					</Tab.Panel>
					<Tab.Panel key="2" className={classNames("rounded-xl bg-white")}>
						<Drafts />
					</Tab.Panel>
					<Tab.Panel key="3" className={classNames("rounded-xl bg-white")}>
						<Shared />
					</Tab.Panel>
					{/* <Tab.Panel
						key="4"
						className={classNames(
							"rounded-xl bg-white",
							"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
						)}
					>
						<History />
					</Tab.Panel> */}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}

export default Something;
