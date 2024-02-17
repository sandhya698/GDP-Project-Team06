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
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .load{
    width: 15rem;
    height: 15rem;
    position: relative;
    border-radius: 50%;
  }

  .circle{
    width: 15rem;
    height: 15rem;
    position: absolute;
    border-right: .5rem solid red;
    border-radius: 50%;
    animation: load 1s linear infinite;
  }

  h1{
    color: #000;
    font-size: 2rem;
    letter-spacing: 0.2rem;
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
      width: 12rem;
      height: 12rem;
    }

    .circle {
      width: 12rem;
      height: 12rem;
      border-right: .5rem solid red;
    }

    h1 {
      font-size: 1.6rem;
      font-weight: 600
    }

  }
          
`;