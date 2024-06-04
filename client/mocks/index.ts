import jsonServer from "json-server";
import clientMock from "./data/clientMock.json";
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

    const clientRouter = jsonServer.router({ client: clientMock });
    clientRouter.db._.id = "clientId";

    const projectRouter = jsonServer.router({ project: projectMock });
    projectRouter.db._.id = "clientProjectId";

    const cropRouter = jsonServer.router({ crop: cropMock });
    cropRouter.db._.id = "cropId";

    const middleware = jsonServer.defaults();

    mockServer.use(middleware);
    mockServer.get(
      "*",
      jsonServer.rewriter({
        "/*": "/$1",
        // "/client/:clientId": "/client?clientId=:clientId",
        "/client/:clientId/project": "/project?clientId=:clientId",
        "/crop/:cropId": "/crop?cropId=:cropId",
        // "project/:clientProjectId": "/project?clientProjectId=:clientProjectId",
      })
    );

    mockServer.all(["/project", "/project/*"], projectRouter);
    mockServer.all(["/client", "/client/*"], clientRouter);
    mockServer.all(["/crop", "/crop/*"], cropRouter);

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
