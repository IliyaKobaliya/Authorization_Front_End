import SignIn from "../SignIn";
import SignUp from "../SignUp";

const AuthRoutes = [
    {
        component: SignIn,
        path: `/SignIn`,
        key: 1
    },
    {
        component: SignUp,
        path: `/SignUp`,
        key: 2
    }
];

export default AuthRoutes;