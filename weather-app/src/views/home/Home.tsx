import {
  Header,
  GetTodayWidget,
  GetHourlyWidget,
  GetKakaoMapWidget,
  GetTodayHighlightsWidget,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  GetDayItem,
} from "@/components";

// import axios from "axios";

function HomePage() {
  // const fetchApi = async (localName: string) => {
  //   const API_KEY = "6d5e35ad77bf45e599205106241411";
  //   const BASE_URL = `http://api.weatherapi.com/v1/current.json?q=${localName}&key=${API_KEY}`;

  //   try {
  //     /** Promise 인스턴스 방법을 사용했을 땐, resolve에 해당 */
  //     const res = await axios.get(BASE_URL);
  //     console.log(res.data);
  //   } catch (error) {
  //     /** Promise 인스턴스 방법을 사용했을 땐, reject에 해당 */
  //     console.error(error);
  //   } finally {
  //     /** 비동기 로직이 실행되던 / 되지 않던 무조건 실행되어야만 하는 로직이 작성된다. */
  //     console.log("fetchApi 호출은 되었습니다.");
  //   }
  // };

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <div className="w-full h-full flex flex-col items-center justify-start pb-6 px-6 gap-5">
          {/* 상단 3개의 위젯 */}
          <div className="w-full flex items-center gap-5">
            <GetTodayWidget />
            <GetHourlyWidget />
            <GetKakaoMapWidget />
          </div>
          {/* 하단 2개의 위젯 */}
          <div className="w-full flex items-center gap-5">
            <GetTodayHighlightsWidget />
            <Card className="w-1/4 h-full">
              <CardHeader>
                <CardTitle>7 Days</CardTitle>
                <CardDescription>
                  이번주 날씨를 조회하고 있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <GetDayItem highTemp={20} lowTemp={10} />
                <GetDayItem highTemp={20} lowTemp={10} />
                <GetDayItem highTemp={20} lowTemp={10} />
                <GetDayItem highTemp={20} lowTemp={10} />
                <GetDayItem highTemp={20} lowTemp={10} />
                <GetDayItem highTemp={20} lowTemp={10} />
                <GetDayItem highTemp={20} lowTemp={10} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
