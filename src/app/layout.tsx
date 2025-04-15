import "./globals.css";
import Link from "next/link";
import styles from "./layout.module.css";

export const metadata = {
  title: "영화보자",
  description: "Next.js로 만든 영화 정보 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  
  return (
    <html lang="en">
      {/* body에는 기본 배경 판으로 background-color: 검정색이 설정되어 있다.*/}
      <body>

        {/* 상단 네비게이션 바  */}
        <nav className={styles["layout__nav"]}>
          <Link className={styles["layout__logo"]} href="/">
            영화보자
          </Link>
          <div className={styles["layout__nav-links"]}>
            <Link className={styles["layout__nav-link"]} href="/movies">
              영화 리스트
            </Link>
            <Link className={styles["layout__nav-link"]} href="/about">
              사이트 정보
            </Link>
            <Link className={styles["layout__nav-link"]} href="/login">
              로그인
            </Link>
          </div>
        </nav>
        {/* 콘텐츠 내용 max-width : 1000px 과 동시에 가운데정렬이 되어있다. (하얀색배경) */}
        <div className={styles["layout__content"]}>{children}</div>
      </body>
    </html>
  );
}
