import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleDown, FaPowerOff } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useLogout } from "../../hooks/useLogout";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SideBarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const { logout } = useLogout();
  const handleLogout = async () => await logout();

  const LogoutModal = () => {
    return <Modal size="sm" show={show} onHide={handleClose} backdrop="static" >
      <Modal.Body>
      <Container>
          <Row>
            <Col>
              Are you sure do you want to logout?
            </Col>
          </Row>
          <Row>
          <Col className='d-flex flex-row-reverse gap-3' >
            <Button size='sm' variant="primary" onClick={handleLogout}>
              Logout
            </Button>
            <Button size='sm' variant="secondary" onClick={handleClose}>
              Close
            </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  }

  return (
    <>
      <div className="menu" onClick={toggleMenu}>
        <div className="menu_item">
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
        </div>
        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: -90,
                  }
                : { rotate: 0 }
            }
          >
            <FaAngleDown fontSize={20} />
          </motion.div>
        )}
      </div>{" "}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                <NavLink to={subRoute.path} className="link">
                  <div className="icon">{subRoute.icon}</div>
                  <motion.div className="link_text">{subRoute.name}</motion.div>
                </NavLink>
              </motion.div>
            ))}
            <Link onClick={handleShow} className="link">
              <div className="icon"><FaPowerOff /></div>
              <motion.div className="link_text">Logout</motion.div>
            </Link>
          </motion.div>
        )}{" "}
      </AnimatePresence>
      <LogoutModal />
    </>
  );
};

export default SideBarMenu;
