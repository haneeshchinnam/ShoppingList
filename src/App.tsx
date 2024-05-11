import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { IRouteConfig } from "./interface";
import { publicRoutes, privateRoutes, AppPath } from "./routes";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.accessToken !== null
  );

  const presistedPath = AppPath.login;

  const isPublicRoute = (pathname: string) => {
    return publicRoutes.some((route) => pathname.startsWith(route.path));
  };

  const renderRoutes = (routes: IRouteConfig[]): React.ReactElement[] => {
    return routes.map((route) => {
      const getRoute = () => {
        if (route.children) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            >
              {renderRoutes(route.children)}
            </Route>
          );
        } else {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          );
        }
      };

      if (isPublicRoute(route.path)) {
        return getRoute();
      } else {
        if (isAuthenticated) {
          return getRoute();
        } else {
          return (
            <Route
              key="catch-all"
              path="*"
              element={<Navigate to={presistedPath} />}
            />
          );
        }
      }
    });
  };

  return (
    <div>
      <Routes>
        {renderRoutes(publicRoutes)}
        {renderRoutes(privateRoutes)}

        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated ? AppPath.dashboard : AppPath.login}
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
