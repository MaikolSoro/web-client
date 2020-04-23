import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

// admin pages

import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
import AdminBlog  from "../pages/Admin/Blog";

// pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";

// others

import Error from "../pages/Error";

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true
      },
      {
        path: "/admin/login",
        component: AdminSignIn,
        exact: true
      },
      {
        path: "/admin/users",
        component: AdminUsers,
        exact: true
      },
      {
        path:"/admin/menu",
        component: AdminMenuWeb,
        exact : true
      },
      {
        path:"/admin/blog",
        component: AdminBlog,
        exact : true
      },
      {
        component: Error
      }
    ]
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true
      },
      {
        path: "/contact",
        component: Contact,
        exact: true
      },
      {
        path: "/blog",
        component: Blog,
        exact: true
      },
      {
        path: "/blog/:url",
        component: Blog,
        exact: true
      },
      {
        component: Error
      }
      
    ]
  }
];
export default routes;
