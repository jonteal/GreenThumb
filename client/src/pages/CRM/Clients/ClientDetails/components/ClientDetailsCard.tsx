import { NameValuePair } from "@/components/NameValuePair";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerType } from "@/services/client/types";

export const ClientDetailsCard = ({ client }: { client: CustomerType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{client?.customer}</CardTitle>
        {/* <CardDescription>{client?.clientStatus}</CardDescription> */}
      </CardHeader>
      <CardContent>
        <NameValuePair label="Email" value={client?.address} />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
