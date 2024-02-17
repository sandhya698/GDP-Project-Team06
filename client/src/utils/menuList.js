import { FaHome, FaUsers, FaUserInjured, FaWarehouse } from "react-icons/fa";
import { BiSolidDonateBlood, BiSolidDonateHeart, BiHistory } from "react-icons/bi";

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
        icon: <BiSolidDonateHeart />,
        userType: "admin"
    },
    {
        name: "Blood Request",
        path: "/requests",
        icon: <BiSolidDonateBlood />,
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
        icon: <BiSolidDonateHeart />,
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
        icon: <BiSolidDonateBlood />,
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
        icon: <BiSolidDonateBlood />,
        userType: "patient"
    },
    {
        name: "Request History",
        path: "/requests",
        icon: <BiHistory />,
        userType: "patient"
    }
];