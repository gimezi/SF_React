import { Card } from "@/components";
import { HourlyData } from "@/types";
import { useFormattedTime } from "@/hooks/useFormattedTime";

interface Props {
  hourData: HourlyData;
}

function HourlyCard({ hourData }: Props) {
  const formattedTime = useFormattedTime(hourData.time);
  return (
    <Card
      key={hourData.time}
      className="w-24 min-w-24 h-fit flex flex-col items-center pt-[10px] pb-[6px] gap-1 bg-neutral-50"
    >
      <span className="text-sm">{formattedTime}</span>
      <img
        src={`src/assets/icons/${hourData.condition.code + (hourData.condition.icon.includes("day") ? "d" : "n")}.svg`}
        alt=""
        className=" h-14 w-14"
      />
      <div className="w-full flex items-start justify-center">
        <span className="poppins-medium scroll-m-20 text-xl font-medium tracking-tight">
          {hourData.temp_c}
        </span>
        <span className="text-[13px] ml-[1px] mt-[1px] font-medium">
          &#8451;
        </span>
      </div>
    </Card>
  );
}

export { HourlyCard };
