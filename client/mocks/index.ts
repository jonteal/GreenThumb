import jsonServer from "json-server";
import customerMock from "./data/customerMock.json";
import projectMock from "./data/projectMock.json";
import cropMock from "./data/cropMock.json";

const serverPort = 5174;

/** *
 * @param {MockServerConfig} config
 *
 * @throws {Error}
 *
 **/

export const startMockServer = () => {
  try {
    const mockServer = jsonServer.create();

    const customerRouter = jsonServer.router({ customer: customerMock });
    customerRouter.db._.id = "customerId";

    const projectRouter = jsonServer.router({ project: projectMock });
    projectRouter.db._.id = "customerProjectId";

    const cropRouter = jsonServer.router({ crop: cropMock });
    cropRouter.db._.id = "cropId";

    const middleware = jsonServer.defaults();

    mockServer.use(middleware);
    mockServer.get(
      "*",
      jsonServer.rewriter({
        "/*": "/$1",
        "/customer/:customerId": "/customer?customerId=:customerId",
        "/customer/:customerId/project": "/project?customerId=:customerId",
        "/crop/:cropId": "/crop?cropId=:cropId",
        // "project/:clientProjectId": "/project?clientProjectId=:clientProjectId",
      })
    );

    mockServer.all(["/crop", "/crop/*"], cropRouter);
    mockServer.all(["/customer", "/customer/*"], customerRouter);
    mockServer.all(["/project", "/project/*"], projectRouter);

    mockServer.listen(serverPort, () => {
      console.log(`JSON server is running on http://localhost:${serverPort}/`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("createMockServer failed", error);
    }
  }
};

startMockServer();
