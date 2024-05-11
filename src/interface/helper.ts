export interface IRouteConfig {
    path: string;
    component: () => JSX.Element;
    children?: IRouteConfig[];
}