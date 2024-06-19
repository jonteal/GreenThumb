import { Card } from "@/components/ui/card";
import { OrderTable } from "./OrdersTable/OrdersTable";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

export const Orders = () => {
  return (
    <Card>
      {/* <CardHeader className="text-md font-semibold flex flex-row justify-center py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
        Graphs
      </CardHeader> */}

      <Button asChild variant="outline">
        <Link to="/orders/add">Add Order</Link>
      </Button>

      <OrderTable />
    </Card>
  );
};
