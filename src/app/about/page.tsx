import CurrentTime from "./CurrentTime";

const getTimeData = async (): Promise<{ datetime: string }> => {
  const res = await fetch("https://worldtimeapi.org/api/timezone/Asia/Seoul", {
    cache : "force-cache" // SSG 처럼 동작
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const AboutPage = async () => {
  const { datetime } = await getTimeData();

  return (
    <div style={{ padding: "2rem" }}>
      <h1> 사이트 정보 </h1>
      <p>
        <strong> 사이트에 오신걸 환영합니다.</strong>
      </p>

      <p>
        <strong>슬기로운 문화생이 됩시다. 블라블라....</strong>
      </p>
    </div>
  );
};

export default AboutPage;
