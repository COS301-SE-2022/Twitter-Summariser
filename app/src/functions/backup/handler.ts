import { DynamoDB } from "aws-sdk";


export const backupDynamoDB = async () => {

    const dynamoDB = new DynamoDB();

    let params: any = {};
    let tables: any = [];

    while (true) {
        const response = await dynamoDB.listTables(params).promise();
    
        tables = tables.concat(response.TableNames);

        if (undefined === response.LastEvaluatedTableName) {
            break;
        } else {
            params.ExclusiveStartTableName = response.LastEvaluatedTableName;
        }
    }

    tables.map(async (table: any) => {
        try {
            const date = new Date();

            const params = {
                BackupName: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                TableName: table
            };

            await dynamoDB.createBackup(params).promise();

        } catch (e) {
            console.error(e);
        }
    })
    
    
    
}