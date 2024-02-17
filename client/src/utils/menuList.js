import { FaHome, FaUsers, FaUserInjured, FaWarehouse } from "react-icons/fa";
import { BiDonateBlood, BiDonateHeart, BiHistory } from "react-icons/bi";

export const menuList = [
    {
        name: "Home",
        path: "/home",
        icon: <FaHome />,
        userType: "common"
    },
    {
        name: "Donors",
        path: "/donors",
        icon: <FaUsers />,
        userType: "admin"
    },
    {
        name: "Patients",
        path: "/patients",
        icon: <FaUserInjured />,
        userType: "admin"
    },
    {
        name: "Donations",
        path: "/donations",
        icon: <BiDonateHeart />,
        userType: "admin"
    },
    {
        name: "Blood Request",
        path: "/requests",
        icon: <BiDonateBlood />,
        userType: "admin"
    },
    {
        name: "Inventory",
        path: "/inventory",
        icon:  <FaWarehouse />,
        userType: "admin"
    },
    {
        name: "Donate Blood",
        path: "/donate",
        icon: <BiDonateHeart />,
        userType: "donor"
    },
    {
        name: "Donation History",
        path: "/donations",
        icon: <BiHistory />,
        userType: "donor"
    },
    {
        name: "Blood Request",
        path: "/request",
        icon: <BiDonateBlood />,
        userType: "donor"
    },
    {
        name: "Request History",
        path: "/requests",
        icon: <BiHistory />,
        userType: "donor"
    },
    {
        name: "Blood Request",
        path: "/request",
        icon: <BiDonateBlood />,
        userType: "patient"
    },
    {
        name: "Request History",
        path: "/requests",
        icon: <BiHistory />,
        userType: "patient"
    }
];