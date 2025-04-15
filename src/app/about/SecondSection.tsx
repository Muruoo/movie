// app/about/SecondSection.tsx

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function SecondSection() {
  await sleep(4000); // 4초 지연
  return <h1>두 번째 섹션입니다.</h1>;
}