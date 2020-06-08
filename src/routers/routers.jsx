import Home from "../containers/Home";
import Search from "../containers/Search";
import Details from "../containers/Details";

const myRoutes = [
  {
    path: "/",
    active: true,
    component: Home,
    routerProps: {},
  },
  {
    path: "/search",
    active: true,
    component: Search,
    routerProps: {},
  },
  {
    path: "/:movieID",
    active: true,
    component: Details,
    routerProps: {},
  },
];

export default myRoutes;
