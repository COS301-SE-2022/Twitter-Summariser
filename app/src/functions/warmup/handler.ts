import { Lambda } from "aws-sdk";

const lambda = new Lambda();

export const warmupTextSummariser = async () => {
	try {
		const lambdaParams = {
			FunctionName: "text-summarisation-prod-summarise",
			InvocationType: "RequestResponse",
			Payload: JSON.stringify({
				text: "In SQL:2011, as in most programming languages, every instance of a UDT must be associated with exactly one most specific type, which corresponds to the lowest subtype assigned to the instance. Thus, if the UDT has more than one direct supertype, then there must be a single type to which the instance belongs, and that single type must be a subtype of all the types to which the instance belongs. In some cases, this can require the creation of a large number of types. For example, a type hierarchy might consist of a maximal supertype Person, with Student and Staff as subtypes; Student itself might have three direct subtypes: Undergraduate, Postgraduate, and PartTimeStudent, as illustrated in Figure 9.4(a). If an instance has the type Person and Student, then the most specific type in this case is Student, a nonleaf type, since Student is a subtype of Person. However, with the current type hierarchy an instance cannot have the type PartTimeStudent as well as Staff, unless we create a type PTStudentStaff, as illustrated in Figure 9.4(b). The new leaf type, PTStudentStaff, is then the most specific type of this instance. Similarly, some of the full-time undergraduate and postgraduate students may work part time (as opposed to full-time employees being part-time students), and so we would also have to add subtypes for FTUGStaff and FTPGStaff. If we generalized this approach, we could potentially create a large number of subtypes. In some cases, a better approach may be to use inheritance at the level of tables as opposed to types, as we discuss shortly.",
				min: 100,
				max: 200
			})
		};

		await lambda
			.invoke(lambdaParams, function (data, err) {
				if (err) {
					console.log(err);
				} else {
					console.log(data);
				}
			})
			.promise();

		console.log("Warmup complete");
	} catch (error) {
		console.error(error);
	}
};
