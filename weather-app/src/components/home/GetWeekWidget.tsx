import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  GetDayItem,
} from "@/components";

interface WeatherInfo {
  maxTemp: number;
  minTemp: number;
  date: number;
  iconCode: number;
  isDay: boolean;
}

interface Props {
  data: WeatherInfo[];
}

function GetWeekWidget({ data }: Props) {
  return (
    <Card className="w-1/4 h-full">
      <CardHeader>
        <CardTitle>7 Days</CardTitle>
        <CardDescription>이번주 날씨를 조회하고 있습니다.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {data?.map((day: WeatherInfo) => {
          return <GetDayItem data={day} key={day.date} />;
        })}
      </CardContent>
    </Card>
  );
}

export { GetWeekWidget };
