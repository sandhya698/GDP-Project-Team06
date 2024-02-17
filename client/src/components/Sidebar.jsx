import React, { useState } from 'react'
import { menuList } from '../utils/menuList';
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { useGlobalState } from '../reducer/GlobalState';

export const Sidebar = () => {

  const { state } = useGlobalState();

  const [isOpen, setIsOpen] = useState(false);
  const animateOptions = {
    width: isOpen ? "200px" : "50px",
    padding: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 10,
    }
  }

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
       <motion.div
        initial={{ width: isOpen ? "200px" : "50px" }} 
        animate={animateOptions}
        transition={{ duration: 1 }}
        className={`sidebar `}
      >
        <div className="top_section">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="logo"
              >
                TransfuseNow
              </motion.h1>
            )}
          </AnimatePresence>

          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <section className="routes">
        {
          menuList.filter(item => state.user.userType === item.userType || item.userType === "common").map((route, index) => {
            return (
              <NavLink
                to={route.path}
                key={index}
                className="link"
                activeClassName="active"
              >
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })
        }
        </section>
      </motion.div>
    </>
  );
};