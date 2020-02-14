import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

//pages admin

import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";

// pages

import Home from "../pages/Home";
import Contact from "../pages/Contact";

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
        component: Error
      }
      
    ]
  }
];
export default routes;
