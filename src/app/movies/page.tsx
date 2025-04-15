const KOBIS_KEY = process.env.NEXT_PUBLIC_KOBIS_API_KEY;
const KMDB_KEY = process.env.NEXT_PUBLIC_KMDB_API_KEY;
const formatDateTime = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
};
// 하루 전 날짜 받아오기. (ex 20250330)
// API키 인자값 전용
const getYesterdayStr = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10).replace(/-/g, "");
};
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1); 

// 하루 전 날짜 받아오기. (ex 2025-03-30)
// UI 출력값 전용
const year = yesterday.getFullYear();
const month = String(yesterday.getMonth() + 1).padStart(2, "0");
const day = String(yesterday.getDate()).padStart(2, "0");
const targetDate = getYesterdayStr();


const getKobisList = async (targetDate: string) => {
  const calledAt = new Date();
  const res = await fetch(
    `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KOBIS_KEY}&targetDt=${targetDate}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return {
    data : data.boxOfficeResult.dailyBoxOfficeList,
    calledAt,
  }
};

const getPoster = async (movieName: string, openDay: string) => {
  const res = await fetch(
    `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&releaseDts=${openDay}&title=${encodeURIComponent(
      movieName
    )}&ServiceKey=${KMDB_KEY}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  const result = data.Data?.[0]?.Result?.[0];
  const posters = result?.posters?.split("|")[0] || null;
  return posters;
};

const MoivesPage = async () => {

  const { data: movieList, calledAt } = await getKobisList(targetDate);
  const nowFormatted = formatDateTime(calledAt); // formatDateTime은 "YYYY-MM-DD HH:mm:ss" 형식
  const movieWithPosters = await Promise.all(
    movieList.map(async (movie: any) => {
      const open = movie.openDt.trim().replace(/-/g, "");
      const poster = await getPoster(movie.movieNm, open);
      return {
        ...movie,
        poster,
      };
    })
  );

  movieWithPosters.sort((a, b) => Number(b.audiAcc) - Number(a.audiAcc));

  return (
    <div style={{ padding: "2rem" }}>
      <div>
        <h1>API 호출 시각 : {nowFormatted}</h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {movieWithPosters.map((movie, index) => (
          <div
            key={movie.movieCd}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.movieNm}
                style={{
                  width: "100%",
                  height: "240px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "240px",
                  backgroundColor: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                포스터 없음
              </div>
            )}
            <h3 style={{ marginTop: "1rem", fontSize: "1rem", fontWeight: "bold" }}>
              {index + 1}. {movie.movieNm}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#555" }}>
              누적 관객: {Number(movie.audiAcc).toLocaleString()}명
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoivesPage;
