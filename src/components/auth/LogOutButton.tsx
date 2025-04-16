"use client";
import React from "react";
import styles from "./LogOutButton.module.css";

interface LogOutButtonProps {
    onClick: () => void;
}
  

const LogOutButton = ({ onClick }: LogOutButtonProps) => {
    return (
        <button className={styles["logout-button"]} onClick={onClick}>
            <span className={styles["ogout-button__text"]} > 로그아웃 </span>
        </button>
    )
}

export default LogOutButton;