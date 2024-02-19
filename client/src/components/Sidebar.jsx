import React, { useState } from 'react';
import { menuList } from '../utils/menuList';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useGlobalState } from '../reducer/GlobalState';
import { Logout } from './Logout';

export const Sidebar = () => {
  const { state } = useGlobalState();
  const userType = state.user?.userType;
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);

  const animateOptions = {
    width: isOpen ? '200px' : '50px',
    padding: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 10,
    },
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
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
      {userType && (
        <motion.div
          initial={animateOptions}
          animate={animateOptions}
          className={`sidebar `}
        >
        <div className='h-100 d-flex flex-column'>
          <div>
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
                    className={`link ${route.path === location.pathname ? 'active' : ''}`}
                    // className="link"
                    // activeClassName="active"
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
          </div>
          <div className='user_section'>
             <Logout userId={state.user._id} />
             <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                      {state.user.name} 
                  </motion.div>
                )}
              </AnimatePresence>
          </div>
        </div>
        </motion.div>
      )}
    </>
  );
};
