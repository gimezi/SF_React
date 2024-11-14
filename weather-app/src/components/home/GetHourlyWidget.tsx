import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components";
import { ForecastDay, HourlyData } from "@/types";
import { HourlyCard } from "./HourlyCard";

interface Props {
  data: ForecastDay;
}

function GetHourlyWidget({ data }: Props) {
  if (!data || !data.hour) {
    return <div>데이터를 불러오는 중입니다..</div>;
  }

  return (
    <Card className="flex-1 max-w-[calc(50%-40px)] h-full">
      <CardHeader>
        <CardTitle className="text-xl">Hourly</CardTitle>
        <CardDescription>
          오늘의 시간대별 날씨를 조회하고 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex items-center gap-4 overflow-x-scroll">
        {data.hour.map((item: HourlyData) => {
          return <HourlyCard key={item.time} hourData={item} />;
        })}
      </CardContent>
    </Card>
  );
}

export { GetHourlyWidget };
