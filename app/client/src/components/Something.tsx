import React from "react";
import { Tab } from "@headlessui/react";
import { classNames } from "../utils/classNames";

function Something() {
	return (
		<div className="flex flex-col justify-center items-center text-center w-full p-2 z-50">
			<Tab.Group>
				<Tab.List className="flex space-x-1 rounded-xl bg-white p-1 w-full border">
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
					<Tab
						key="4"
						className={({ selected }) =>
							classNames(
								"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
								selected ? "bg-blue-100  shadow" : "text-blue-700 hover:bg-blue-50"
							)
						}
					>
						History
					</Tab>
				</Tab.List>

				<Tab.Panels className="mt-2">
					<Tab.Panel
						key="1"
						className={classNames(
							"rounded-xl bg-white p-3",
							"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
						)}
					>
						content 1
					</Tab.Panel>
					<Tab.Panel
						key="2"
						className={classNames(
							"rounded-xl bg-white p-3",
							"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
						)}
					>
						content 2
					</Tab.Panel>
					<Tab.Panel
						key="3"
						className={classNames(
							"rounded-xl bg-white p-3",
							"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
						)}
					>
						content 3
					</Tab.Panel>
					<Tab.Panel
						key="4"
						className={classNames(
							"rounded-xl bg-white p-3",
							"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
						)}
					>
						content 4
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}

export default Something;
