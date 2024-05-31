import { NameValuePair } from "@/components/NameValuePair";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClientType } from "@/services/client/types";

export const ClientDetailsCard = ({ client }: { client: ClientType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{client?.clientName}</CardTitle>
        <CardDescription>{client?.clientStatus}</CardDescription>
      </CardHeader>
      <CardContent>
        <NameValuePair label="Email" value={client?.clientEmail} />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
