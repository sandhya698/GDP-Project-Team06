import React, { useState } from 'react';
import { menuList } from '../../utils/menuList';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useAuthContext } from '../../hooks/useAuthContext';
import SideBarMenu from './SideBarMenu';
import Badge from 'react-bootstrap/Badge';

export const Sidebar = () => {
  const { user } = useAuthContext();
  const userType = user?.userType;
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
      {user && (
        <motion.div
          initial={animateOptions}
          animate={animateOptions}
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
              menuList.filter(item => userType === item.userType || item.userType === "common").map((route, index) => {
                if (route.subRoutes) {
                return (
                  <SideBarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index}
                  />
                );
              }
                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className={`link ${route.path === location.pathname ? 'active' : ''}`}
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
            <div className='link user-info'>
              <div className="icon"><FaUserCircle /></div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                  {user.name} <Badge pill style={{fontSize: '12px'}} bg="danger" text="white"> {userType} </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </motion.div>
      )}
    </>
  );
};
