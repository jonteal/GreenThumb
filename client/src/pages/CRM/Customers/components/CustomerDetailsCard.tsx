import { NameValuePair } from "@/components/NameValuePair";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerType } from "@/services/customer/types";

export const CustomerDetailsCard = ({
  customer,
}: {
  customer: CustomerType;
}) => {
  // console.log("customer: ", customer);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{customer?.customer}</CardTitle>
      </CardHeader>
      <CardContent>
        <NameValuePair label="Email" value={customer?.address} />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
