import Home from '../containers/Home';
import Search from '../containers/Search';
import Details from '../containers/Details';

const myRoutes = [
  {
    path: '/',
    active: true,
    private: false,
    component: Home,
    routerProps: {},
  },
  {
    path: '/search',
    active: true,
    private: false,
    component: Search,
    routerProps: {},
  },
  {
    path: '/:movieID',
    active: true,
    private: false,
    component: Details,
    routerProps: {},
  },
];

export default myRoutes;
