'use client';

import {useState, useEffect} from "react";

const currentTime = () => {
    const [currentTime, setCurrentTime] = useState('');
    useEffect(() => {
        // 처음 렌더링 시 시간 설정
        const updateTime = () => {
          const now = new Date().toLocaleString();
          setCurrentTime(now);
        };
    
        updateTime(); // 첫 렌더 때 바로 한 번 실행
        const interval = setInterval(updateTime, 1000); // 1초마다 업데이트
    
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
      }, []);

    return (
        <span>
            {currentTime}
        </span>
    )

}

export default currentTime;