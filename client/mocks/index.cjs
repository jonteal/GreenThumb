const jsonServer = require("json-server");
const clientMock = require("./data/clientMock.json");
const projectMock = require("./data/projectMock.json");

const serverPort = 5174;

/**
 *
 * @param {MockServerConfig} config
 *
 *
 * @throws {Error}
 */

export const startMockServer = () => {
  try {
    const mockServer = jsonServer.create();

    /* Add mock data entities here */

    const router = jsonServer.router({
      client: clientMock,
      project: projectMock,
    });

    const middleware = jsonServer.defaults();

    mockServer.use(middleware);
    mockServer.use(
      jsonServer.rewriter({
        "/*": "/$1",
        "/client/:clientId": "/client?clientId=:clientId",
        "/client/:clientId/project": "/project?clientId=:clientId",
        "/project/:clientProjectId":
          "/project?clientProjectId=:clientProjectId",
      })
    );

    mockServer.use(router);

    mockServer.listen(serverPort, () => {
      console.log(`JSON Server is running on http://localhost:${serverPort}/`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("createMockServer failed", error);
    }
  }
};

startMockServer();
