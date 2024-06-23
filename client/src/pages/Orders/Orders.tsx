import { Card } from "@/components/ui/card";
import { OrderTable } from "./OrdersTable/OrdersTable";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

export const Orders = () => {
  return (
    <Card className="p-3">
      <Button asChild variant="outline" className="bg-green-600 text-slate-50">
        <Link to="/orders/add">Add Order</Link>
      </Button>

      <OrderTable />
    </Card>
  );
};
