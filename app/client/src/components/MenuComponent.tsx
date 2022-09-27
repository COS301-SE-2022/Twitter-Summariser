import { Menu, Transition } from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";
import { Fragment } from "react";

function MenuComponent({ type, data, reorderUpHandler, reorderDownHandler,ArrowUpIcon, ArrowDownIcon, deleteTweetHandler, DeleteIcon }: any) {

	return (
		<div className="flex w-full justify-end">
			<div className="top-0 right-1">
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="inline-flex w-full justify-center rounded-md  bg-dark-cornflower-blue px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							<BsThreeDots />
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="px-1 py-1 ">
								{(type === "lastTweet" || type === "middleTweet") && <Menu.Item>
									{({ active }) => (
										<button
											type="button"
											className={`${
												active
													? "bg-slate-200 text-gray-900"
													: "text-gray-900"
											} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
											onClick={() =>
												reorderUpHandler(
													data.position
												)
											}
										>
											{
												// eslint-disable-next-line no-use-before-define
												<ArrowUpIcon
													className="mr-2 h-5 w-5"
													aria-hidden="true"
												/>
											}
											Move Tweet up
										</button>
									)}
								</Menu.Item>}
								{(type === "firstTweet" || type === "middleTweet") && <Menu.Item>
									{({ active }) => (
										<button
											type="button"
											className={`${
												active
													? "bg-slate-200 text-gray-900"
													: "text-gray-900"
											} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
											onClick={() =>
												reorderDownHandler(
													data.position
												)
											}
										>
											{
												// eslint-disable-next-line no-use-before-define
												<ArrowDownIcon
													className="mr-2 h-5 w-5"
													aria-hidden="true"
												/>
											}
											Move Tweet down
										</button>
									)}
								</Menu.Item>}
							</div>
							<div className="px-1 py-1 ">
								<Menu.Item>
									{({ active }) => (
										<button
											type="button"
											className={`${
												active
													? "bg-slate-200 text-gray-900"
													: "text-gray-900"
											} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
											onClick={() =>
												deleteTweetHandler(
													data.reportBlockID
												)
											}
										>
											{
												// eslint-disable-next-line no-use-before-define
												<DeleteIcon
													className="mr-2 h-5 w-5"
													aria-hidden="true"
												/>
											}
											Delete Tweet
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</div>

	);
}

export default MenuComponent;
