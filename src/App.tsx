import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { IRouteConfig } from "./interface";
import { publicRoutes, privateRoutes, AppPath } from "./routes";
import { useVerifyQuery } from "./services";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.accessToken !== null
  );
  const auth = useSelector(
    (state: RootState) => state.auth.auth !== null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useVerifyQuery(undefined, { skip: isAuthenticated });
  


  const presistedPath = location.pathname;

  useEffect(() => {
    if (auth) {
      navigate(AppPath.login);
    }
  }, [auth])

  

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
        if (isAuthenticated || ( data?.isAuthenticated ?? false)) {
          return getRoute();
        } else {
          return (
            <Route
              key="catch-all"
              path="*"
              element={<Navigate to={auth ? AppPath.login : presistedPath} />}
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
              to={(isAuthenticated && (data?.isAuthenticated ?? false)) ? presistedPath : AppPath.login}
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
