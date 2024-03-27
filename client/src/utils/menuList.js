import { FaHome, FaUsers, FaUserInjured, FaWarehouse, FaUser } from "react-icons/fa";
import { BiSolidDonateBlood, BiSolidDonateHeart, BiHistory } from "react-icons/bi";
import { FaGear } from "react-icons/fa6";

export const menuList = [
    {
        name: "Home",
        path: "/dashboard",
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
        path: "/blood-donate",
        icon: <BiSolidDonateHeart />,
        userType: "donor"
    },
    {
        name: "Donation History",
        path: "/donation-history",
        icon: <BiHistory />,
        userType: "donor"
    },
    {
        name: "Blood Request",
        path: "/blood-request",
        icon: <BiSolidDonateBlood />,
        userType: "donor"
    },
    {
        name: "Request History",
        path: "/request-history",
        icon: <BiHistory />,
        userType: "donor"
    },
    {
        name: "Blood Request",
        path: "/blood-request",
        icon: <BiSolidDonateBlood />,
        userType: "patient"
    },
    {
        name: "Request History",
        path: "/request-history",
        icon: <BiHistory />,
        userType: "patient"
    },
    {
        path: "/settings",
        name: "Settings",
        icon: <FaGear />,
        exact: true,
        userType: "common",
        subRoutes: [
          {
            path: "/settings/profile",
            name: "Profile ",
            icon: <FaUser />,
          },
        ],
    },
];