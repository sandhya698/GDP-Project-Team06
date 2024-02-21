import React from 'react'
import styled from "styled-components";

export default function LoadingSpinner() {
  return (
    <Loader>
       <div className="main">
        <div className="load">
            <div className="circle"></div>
            <h1>~loading~</h1>
        </div>
    </div>
    </Loader>
  );
};

const Loader = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
  .main{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .load{
    width: 15em;
    height: 15em;
    position: relative;
    border-radius: 50%;
  }

  .circle{
    width: 15em;
    height: 15em;
    position: absolute;
    border-right: .5em solid red;
    border-radius: 50%;
    animation: load 1s linear infinite;
  }

  h1{
    color: #000;
    font-size: 2em;
    letter-spacing: 0.2em;
    font-weight: 500;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    font-family: 'Fredoka One', cursive;
  }

  @keyframes load {
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
  }

  @media (max-width: 490px) {
    .load, .circle {
      width: 12em;
      height: 12em;
    }

    .circle {
      width: 12em;
      height: 12em;
      border-right: .5em solid red;
    }

    h1 {
      font-size: 1.6em;
      font-weight: 600
    }

  }
          
`;