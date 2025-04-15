
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function FirstSection() {
  await sleep(2000); // 2초 지연
  return <h1>첫 번째 섹션입니다.</h1>;
}