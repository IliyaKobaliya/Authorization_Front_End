import Home from "../Home";
import About from "../About";
import Contacts from "../Contacts";

const AppRoutes = [
    {
        component: Home,
        path: `/Home`,
        key: 1
    },
    {
        component: About,
        path: `/About`,
        key: 2
    },
    {
        component: Contacts,
        path: `/Contacts`,
        key: 3
    }

];

export default AppRoutes;