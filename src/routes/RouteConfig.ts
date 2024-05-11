import Navbar from "../components/Navbar";
import { DashboardContainer, LoginContainer, RegisterContainer } from "../containers";
import CartContainer from "../containers/cart/CartContainer";
import OrderContainer from "../containers/order/OrderContainer";
import { IRouteConfig } from "../interface";
import { AppPath } from "./RouteNames";

const publicRoutes: IRouteConfig[] = [
    {
        path: AppPath.login,
        component: LoginContainer
    },
    {
        path: AppPath.register,
        component: RegisterContainer
    },
];

const privateRoutes: IRouteConfig[] = [
    {
        path: AppPath.dashboard,
        component: Navbar,
        children: [
            {
                path: AppPath.product,
                component: DashboardContainer
            },
            {
                path: AppPath.cart,
                component: CartContainer
            },
            {
                path: AppPath.order,
                component: OrderContainer,
            }
        ]
    },
];

export { publicRoutes, privateRoutes };