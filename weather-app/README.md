### 오픈 날씨 API를 활용한 리액트 대시보드 만들기

1. 리액트 라우터 설치 : `npm install react-router-dom`
2. SASS / SCSS 라이브러리 설치: `npm install -D sass-embedded`
3. 리액트 카카오맵 API SDK 설치: 
    - 참고문서: `https://react-kakao-maps-sdk.jaeseokim.dev/docs/intro`
    - `npm install react-kakao-maps-sdk`
4. HTTP 통신을 위한 라이브러리 설치: `npm install axios`


## 과제
### 11/14(목)
- `Home.tsx` 파일에 호출한 각종 API 함수 모듈화 하기
`src/api/index.tsx`를 만들어서 API 함수를 모아서 관리했습니다.
```typescript
// src/api/index.tsx
import axios from "axios";
import { Weather, ForecastTideDay, WeatherInfo, ForecastDay } from "@/types";

const API_KEY = "키값";
const BASE_URL = "http://api.weatherapi.com/v1";

const getWeather = async (localName: string): Promise<Weather | undefined> => {
  try {
    const res = await axios.get(
      `${BASE_URL}/forecast.json?q=${localName}&days=7&key=${API_KEY}`
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getTideWeather = async (): Promise<ForecastTideDay | undefined> => {
  ...
};

const getOneWeekWeather = async (): Promise<WeatherInfo[] | undefined> => {
  ...
};

export { getWeather, getTideWeather, getOneWeekWeather };

```
이 때 함수의 return값의 타입을 지정해주고, 나중에 저장할 data를 return해줘서 함수의 return값을 저장하는 형식으로 쓸 수 있도록 해주었습니다.
```typescript
// Home.tsx
import { getWeather, getTideWeather, getOneWeekWeather } from "@/api";

... 
function Home() {
    ...

    const fetchData = async () => {
    const fetchedWeatherData = await getWeather("seoul");
    if (fetchedWeatherData) {
      setWeatherData(fetchedWeatherData);
    }

    const fetchedTideData = await getTideWeather();
    if (fetchedTideData) {
      setTideData(fetchedTideData);
    }

    const fetchedOneWeekData = await getOneWeekWeather();
    if (fetchedOneWeekData) {
      setOneWeekWeatherSummary(fetchedOneWeekData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
}
```

- default 값 json으로 관리하기
이전 Home.tsx에 있던 default 값들을 `assets/defaultValue.json`에 저장하여 불러오는 형식으로 바꿨습니다.
```
// assets/defaultValue.json
{
  "defaultWeatherData": {
    "current": {
     ...
    }
  },
  "defaultTideData": {
    "astro": {
      ...
    },
      ...
  }
}
```

```typescript
// Home.tsx
import defaultValue from "@/assets/defaultValue.json";

const defaultWeatherData = defaultValue.defaultWeatherData as Weather;
const defaultTideData = defaultValue.defaultTideData as ForecastTideDay;
```

- Jotai 알아보기
### Jotai?
React의 상태 관리 라이브러리로, Atom 기반의 상태관리를 제공함
- 쓰는 이유?
  - 전역 상태를 작은 단위로 관리할 수 있다
  - 코드를 구조화하기 좋다
  - Redux나 Mobx보다 보일러 플레이트가 작다 => 상태관리가 용이함
  - 직관적임

- 설치방법
```
npm install jotai
```

- atom 생성
atom으로는 boolean, numbers, string, object, array등 모든 타입이 가능
```typescript
import { atom } from 'jotai'
const countAtom = atom(0)
const citiesAtom = atom(['Tokyo', 'Kyoto', 'Osaka'])
const animeAtom = atom([
  {
    title: 'Ghost in the Shell',
    year: 1995,
    watched: true
  },
  {
    title: 'Serial Experiments Lain',
    year: 1998,
    watched: false
  }
])
```

- atom 사용
```typescript
import { useAtom } from 'jotai'
const AnimeApp = () => {
  const [anime, setAnime] = useAtom(animeAtom)
  return (...)
}
```

