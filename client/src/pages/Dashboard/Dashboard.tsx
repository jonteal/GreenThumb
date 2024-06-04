import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Dashboard = () => {
  const trayItems = [
    {
      numOfTrays: 1,
      status: "Empty",
      border: "border-slate-500",
    },
    {
      numOfTrays: 12,
      status: "Prepped",
      border: "border-yellow-500",
    },
    {
      numOfTrays: 18,
      status: "Seeded",
      border: "border-orange-500",
    },
    {
      numOfTrays: 9,
      status: "Germinating",
      border: "border-lime-500",
    },
    {
      numOfTrays: 21,
      status: "Growing",
      border: "border-green-500",
    },
    {
      numOfTrays: 25,
      status: "Harvest Ready",
      border: "border-green-700",
    },
  ];
  return (
    <div className="flex flex-col">
      <Card className="flex flex-col items-center rounded-md mx-0">
        <CardHeader className="text-md font-semibold flex flex-row justify-center py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          Trays
        </CardHeader>
        <CardContent className="flex flex-row justify-between">
          {trayItems.map((tray) => (
            <Card
              className={`flex flex-col items-center justify-center py-4 px-6 w-48 m-3 border-b-8 ${tray.border} bg-neutral-600 text-neutral-50`}
              key={tray.status}
            >
              <p className="font-bold">{tray.status}</p>
              <p className="font-bold text-xl">{tray.numOfTrays}</p>
            </Card>
          ))}
        </CardContent>
      </Card>
      <Card className="flex flex-col items-center rounded-md mx-0">
        <CardHeader className="text-md font-semibold flex flex-row justify-center py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          Production
        </CardHeader>
        <CardContent className="flex flex-row justify-between">
          Charts charts charts
        </CardContent>
      </Card>
    </div>
  );
};
