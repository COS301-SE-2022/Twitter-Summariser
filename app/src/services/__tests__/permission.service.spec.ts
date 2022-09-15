import Permission from "@model/permission/permissions.model";
import PermissionService from "..";

import { DocumentClient, awsSdkPromiseResponse } from "../../__mocks__/aws-sdk";

const db = new DocumentClient();

describe("permission.service", () => {
	beforeAll(() => {
		jest.useFakeTimers("modern");
		jest.setSystemTime(new Date(2022, 1, 1));
	});

	beforeEach(() => {
		awsSdkPromiseResponse.mockReset();
	});

	describe("getPermission", () => {
		test("Get Permission", async () => {
			const addedPermission: Permission = {
				reportID: "1111",
				apiKey: "rdvsafbkjuk5",
				type: "EDITOR"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: addedPermission }));

			const permission: Permission = await PermissionService.permissionService.getPermission(
				"1111",
				"rdvsafbkjuk5"
			);

			expect(db.get).toHaveBeenCalledWith({
				TableName: "PermissionTable",
				Key: {
					reportID: "1111",
					apiKey: "rdvsafbkjuk5"
				}
			});

			const expected: Permission = {
				reportID: "1111",
				apiKey: "rdvsafbkjuk5",
				type: "EDITOR"
			};

			expect(permission).toEqual(expected);
		});
	});

	describe("getPermissions", () => {
		test("Get Permissions", async () => {
			const addedPermissions: Permission[] = [
				{
					reportID: "1111",
					apiKey: "rdvsafbkjuk5",
					type: "EDITOR"
				},
				{
					reportID: "1131",
					apiKey: "rdvsafbkjuk5",
					type: "EDITOR"
				},
				{
					reportID: "1231",
					apiKey: "rdvsafbkjuk5",
					type: "EDITOR"
				}
			];

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Items: addedPermissions }));
		});
	});
});
