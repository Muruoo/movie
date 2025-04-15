"use client"

import {useEffect} from "react";


// 타입 스크립트 사용시 {error,reset} 만으로 사용 불가능
// 타입이 명시되어야 함.
const AboutError = ({error,reset} : {error:Error, reset : () => void}) => {

    useEffect( () => {
        console.error("에러 메시지 : ", error);
    },[error])

    return (
        <div style={{color:"black"}}>
            <h2>문제 발생!!!</h2>
            <p>{error.message}</p>
            <button onClick={() => reset()}>다시 시도</button>
        </div>
    )
}

export default AboutError;