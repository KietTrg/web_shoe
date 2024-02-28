const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS__CATEGORY: ":category",
  BLOGS: "blogs",
  OUR_SERVICES: "service",
  FAQ: "faqs",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
  // DETAIL_PRODUCT: "san-pham",
  FINAL_REGISTER: "finalregister/:status",
  RESET_PASSWORD: "reset-password/:token",
  DETAIL_CART: "my-cart",
  CHECKOUT: "checkout",
  PRODUCTS: "products",
  //Admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_PRODUCTS: "manage-products",
  MANAGE_CATEGORY: "manage-category",
  MANAGE_ORDER: "manage-order",
  CREATE_PRODUCTS: "create-products",
  CREATE_CATEGORYS: "create-categorys",
  //Member

  MEMBER: "member",
  PERSONAL: "personal",
  MY_CART: "my-cart",
  HISTORY: "buy-history",
  WISHLIST: "wishlist",
};

export default path;
