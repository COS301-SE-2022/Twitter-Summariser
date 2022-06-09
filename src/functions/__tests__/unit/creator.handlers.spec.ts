import expect from "chai";
import lambdaTester from "lambda-tester";
import { getAllCreators } from "../../creator/handler";

const mockData = {

}

jest.mock('@middyfy/core', () => {
    return (handler) => {
      return {
        use: jest.fn().mockReturnValue(handler), // ...use(ssm()) will return handler function
      }
    }
  });

lambdaTester(getAllCreators)
.event(mockData)
.expectResult((result) => {
    expect(result.statusCode).to.exist;

    expect(result.statusCode).to.equal(200);

    expect(result.body).to.exist;

    expect(result.body).to.be.a("array");
});