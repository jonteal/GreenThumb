import jsonServer from "json-server";
import customerMock from "./data/customerMock.json";
import cropMock from "./data/cropMock.json";
import orderMock from "./data/orderMock.json";
import teamMock from "./data/teamMock.json";
import productMock from "./data/productMock.json";

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

    const cropRouter = jsonServer.router({ crop: cropMock });
    cropRouter.db._.id = "cropId";

    const orderRouter = jsonServer.router({ order: orderMock });
    orderRouter.db._.id = "orderId";

    const productRouter = jsonServer.router({ product: productMock });
    productRouter.db._.id = "productId";

    const teamRouter = jsonServer.router({ team: teamMock });
    teamRouter.db._.id = "teamMemberId";

    const middleware = jsonServer.defaults();

    mockServer.use(middleware);
    mockServer.get(
      "*",
      jsonServer.rewriter({
        "/*": "/$1",
        "/customer/:customerId": "/customer/:customerId",
        "/order/:orderId": "/order/:orderId",
        "/customer/:customerId/order": "/order?customerId=:customerId",
        "/crop/:cropId": "/crop?cropId=:cropId",
        "/team/:teamMemberId": "/team?teamMemberId=:teamMemberId",
        "/product/:productId": "/product/:productId",
      })
    );

    mockServer.all(["/product", "/product/*"], productRouter);
    mockServer.all(["/crop", "/crop/*"], cropRouter);
    mockServer.all(["/order", "/order/*"], orderRouter);
    mockServer.all(["/customer", "/customer/*"], customerRouter);
    mockServer.all(["/team", "/team/*"], teamRouter);

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
