const jsonServer = require("json-server");
const customerMock = require("./data/customerMock.json");
const projectMock = require("./data/projectMock.json");
const cropMock = require("./data/cropMock.json");
const orderMock = require("./data/orderMock.json");

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
      customer: customerMock,
      project: projectMock,
      crop: cropMock,
      order: orderMock,
    });

    const middleware = jsonServer.defaults();

    mockServer.use(middleware);
    mockServer.use(
      jsonServer.rewriter({
        "/*": "/$1",
        "/crop/:cropId": "/crop?cropId=:cropId",
        "/order/:orderId": "/order?orderId=:orderId",
        "/customer/:customerId": "/customer?customerId=:customerId",
        "/customer/:customerId/project": "/project?customerId=:customerId",
        // "/project/:clientProjectId":
        //   "/project?clientProjectId=:clientProjectId",
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
