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

	describe("addPermission", () => {
		test("Add Permission", async () => {
			const addedPermission: Permission = {
				reportID: "1111",
				apiKey: "rdvsafbkjuk5",
				type: "EDITOR"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({}));

			await PermissionService.permissionService.addPermission(addedPermission);

			expect(db.put).toHaveBeenCalledWith({
				TableName: "PermissionTable",
				Item: addedPermission
			});
		});
	});

	describe("verifyReportRetr", () => {
		test("Verify Report Retr", async () => {
			const addedPermission: Permission = {
				reportID: "1111",
				apiKey: "rdvsafbkjuk5",
				type: "EDITOR"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: addedPermission }));

			const permission = await PermissionService.permissionService.verifyReportRetr(
				"EDITOR",
				"rdvsafbkjuk5",
				"1111"
			);

			expect(permission.valueOf()).toEqual(true);
		});
	});

	describe("verifyEditor", () => {
		test("Verify Editor", async () => {
			const addedPermission: Permission = {
				reportID: "1111",
				apiKey: "rdvsafbkjuk5",
				type: "EDITOR"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: addedPermission }));

			const permission = await PermissionService.permissionService.verifyEditor(
				"1111",
				"rdvsafbkjuk5"
			);

			expect(permission.valueOf()).toEqual(true);

			const addedPermission2: Permission = {
				reportID: "1111",
				apiKey: "rdvsafbkjuk5",
				type: "VIEWER"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: addedPermission2 }));

			const permission2 = await PermissionService.permissionService.verifyEditor(
				"1111",
				"rdvsafbkjuk5"
			);

			expect(permission2.valueOf()).toEqual(false);
		});
	});

	describe("updatePermission", () => {
		test("Update Permission", async () => {
			const addedPermission: Permission = {
				reportID: "1111",
				apiKey: "rdvsafbkjuk5",
				type: "EDITOR"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: addedPermission }));

			await PermissionService.permissionService.updatePermission(
				"1111",
				"rdvsafbkjuk5",
				"VIEWER"
			);

			expect(db.update).toHaveBeenCalledWith({
				TableName: "PermissionTable",
				Key: {
					reportID: "1111",
					apiKey: "rdvsafbkjuk5"
				},
				UpdateExpression: "SET type = :type",
				ExpressionAttributeValues: {
					":type": "VIEWER"
				}
			});
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
