import path from "./path";
import icons from "./icons";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { AiFillDashboard } from "react-icons/ai";
// import { VoteOption } from "../components";
export const navigation = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: "BLOGS",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "OUR SERVICES",
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 5,
    value: "FAQs",
    path: `/${path.FAQ}`,
  },
];
const {
  BsShieldShaded,
  BiSolidTruck,
  AiFillGift,
  MdTty,
  BsFillReplyFill,
  MdDashboard,
  MdGroups2,
  PiCirclesThreeFill,
  HiOutlineClipboardDocumentList,
} = icons;
export const ProductExtraInfomation = [
  {
    id: 1,
    title: "Guarantee",
    sub: "Quality Checked",
    icon: <BsShieldShaded />,
  },
  {
    id: 2,
    title: "Free Shipping",
    sub: "Free On All Products",
    icon: <BiSolidTruck />,
  },
  {
    id: 3,
    title: "Special Gift Cards",
    sub: "Special Gift Cards",
    icon: <AiFillGift />,
  },
  {
    id: 4,
    title: "Free Return",
    sub: "Within 7 Days",
    icon: <BsFillReplyFill />,
  },
  {
    id: 5,
    title: "Consultancy",
    sub: "Lifetime 24/7/356",
    icon: <MdTty />,
  },
];
export const productInfoTabs = [
  {
    id: 1,
    name: "DESCRIPTION",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 2,
    name: "WARRANTY",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 3,
    name: "DELIVERY",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 4,
    name: "PAYMENT",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
];
export const colors = [
  "black",
  "brown",
  "gray",
  "white",
  "pink",
  "yellow",
  "green",
  "blue",
  "CAM",
];
export const sorts = [
  {
    id: 1,
    value: "-sold",
    text: "Best selling",
  },
  {
    id: 2,
    value: "title",
    text: "A-Z",
  },
  {
    id: 3,
    value: "-title",
    text: "Z-A",
  },
  {
    id: 4,
    value: "-price",
    text: "Price, hight - low",
  },
  {
    id: 5,
    value: "price",
    text: "Price, low - hight",
  },
  {
    id: 6,
    value: "-createAt",
    text: "Date, new - old",
  },
  {
    id: 7,
    value: "createAt",
    text: "Date, old - new",
  },
];
export const voteOption = [
  {
    id: 1,
    text: "Terrible",
  },
  {
    id: 2,
    text: "Bad",
  },

  {
    id: 3,
    text: "Neutral",
  },
  {
    id: 4,
    text: "Good",
  },
  {
    id: 5,
    text: "Perfect",
  },
];
export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Dashboard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <AiFillDashboard size={25}></AiFillDashboard>,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Manage users",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <MdGroups2 size={25}></MdGroups2>,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Manage products",
    icon: <PiCirclesThreeFill size={25}></PiCirclesThreeFill>,
    submenu: [
      {
        text: "Create product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
      },

      {
        text: "Manage products",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
      },
    ],
  },
  {
    id: 4,
    type: "PARENT",
    text: "Manage category",
    icon: <BiSolidCategoryAlt size={25}></BiSolidCategoryAlt>,
    submenu: [
      {
        text: "Create category",
        path: `/${path.ADMIN}/${path.CREATE_CATEGORYS}`,
      },

      {
        text: "Manage category",
        path: `/${path.ADMIN}/${path.MANAGE_CATEGORY}`,
      },
    ],
  },
  {
    id: 5,
    type: "SINGLE",
    text: "Manage order",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: (
      <HiOutlineClipboardDocumentList
        size={25}
      ></HiOutlineClipboardDocumentList>
    ),
  },
];
export const roles = [
  {
    code: 1,
    value: "Admin",
  },
  {
    code: 2,
    value: "User",
  },
];
export const blockStatus = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Active",
  },
];
export const memberSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Personal",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <MdDashboard size={25}></MdDashboard>,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "My cart",
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <BsFillCartCheckFill size={25}></BsFillCartCheckFill>,
  },

  {
    id: 3,
    type: "SINGLE",
    text: "Buy histories",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: (
      <HiOutlineClipboardDocumentList
        size={25}
      ></HiOutlineClipboardDocumentList>
    ),
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Wish list",
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <MdFavorite size={25}></MdFavorite>,
  },
];
export const statusOders = [
  {
    label: "Cancelled",
    value: "Cancelled",
  },
  {
    label: "Successed",
    value: "Successed",
  },
];
