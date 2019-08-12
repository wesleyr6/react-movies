import Home from '../containers/Home';
import Search from '../containers/Search';

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
];

export default myRoutes;
