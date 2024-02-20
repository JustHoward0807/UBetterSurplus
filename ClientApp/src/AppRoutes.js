import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import {History} from "./components/History";
import TrackedItems from "./components/TrackedItems";
import About from "./components/About";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/history',
    element: <History />
  },
  {
    path: '/trackedItems',
    element: <TrackedItems />
  },
  {
    path: '/About',
    element: <About />
  }
];

export default AppRoutes;
