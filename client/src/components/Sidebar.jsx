import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { menuList } from '../utils/menuList';


export const Sidebar = ({ userType, pageChange }) => {

  const [currentMenu, setCurrentMenu] = useState(0);

  const changeCurrentMenu = (index, page) => {
    pageChange(page);
    setCurrentMenu(index);
  }
   
  return (
    <>
      <Container>
        <div className="menu">
          {
            menuList.map((item, index) => {
              return (
                <Link key={index} className={`menu-item ${item.icon} ${index === currentMenu ? "selected" : ""}`}
                  onClick={() => changeCurrentMenu(index, item.name)}><p>{item.name}</p></Link>
              )
            })
          }
        </div>
      </Container>

    </>
  )
}

const Container = styled.div`
  height: 100%;
  background: #32373c;

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 0.8rem;
    padding-top: 0.8rem;

    .menu-item {
      min-height: 5rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 1.2rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      color: #f2f1ef;
      text-transform: Capitalize;
      font-size: 1.2rem;
      text-decoration: none;
      p {
        font-weight: normal;
        margin:0;
      }
      &:hover {
        background: #222528;
      }
      
    }

    .selected {
      background: #222528;
      border-radius: 0rem;
      p {
        font-weight: bold;
      }
      &:hover {
        background: #222528;
      }
    }
  }
`;