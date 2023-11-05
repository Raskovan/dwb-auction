import React from "react";
import classes from "../styles/Header.module.css";
import logo from "../assets/dwb-logo-trnsp.png";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className={classes.content_container}>
      <div className={classes.leftBorder} />
      <div className={classes.rightBorder} />
      <div
        style={{
          marginLeft: "auto",
          background: `url(${logo}) no-repeat left top / 235px 47px`,
          width: "235px",
          position: "relative",
          top: "20px"
        }}
      />
    </header>
  );
};

export default Header;
