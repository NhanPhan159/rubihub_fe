import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { del } from "idb-keyval";
import { PageNotFound } from "./errors";
import configs from "./configs";
import { i18n } from "./utils";
import { useGlobalStore } from "./store";
import { Login, Register } from "./modules/auth";
import { useErrorHandler } from "./hooks";
import { AppError } from "./types";
import { LandingPage, PublicEChat } from "./modules/landingPage";
import { Spinner } from "./components/ui";
import { AdminPage } from "./modules/adminPage";

const parseJwt = (accessToken: string) => {
  try {
    return JSON.parse(atob(accessToken.split(".")[1]));
  } catch (e) {
    return <></>;
  }
};

const AuthenticatedRoute = ({ children }: { children: React.ReactNode[] }) => {
  const {
    value: { currentUser },
    actions: { clearStore, fetchCurrentUser },
  } = useGlobalStore();
  const location = useLocation();
  const { handleError } = useErrorHandler();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [isAccessTokenExpired, setIsAccessTokenExpired] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [fetchingCurrentUser, setFetchingCurrentUser] = useState(true);

  useEffect(() => {
    if (document.cookie) {
      localStorage.setItem("accessToken", document.cookie.split("=")[1]);

      setAccessToken(document.cookie.split("=")[1]);
    }
  }, [document.cookie]);

  useEffect(() => {
    const decodedJwt = parseJwt(accessToken);

    if (!decodedJwt || decodedJwt.exp * 1000 < Date.now()) {
      setIsAccessTokenExpired(true);
    }
  }, [accessToken, location]);

  useEffect(() => {
    (async () => {
      if (accessToken && !currentUser) {
        try {
          await fetchCurrentUser();
        } catch (error) {
          setError(error as AppError);
        } finally {
          setFetchingCurrentUser(false);
        }
      } else {
        setFetchingCurrentUser(false);
      }
    })();
  }, [accessToken, currentUser]);

  useEffect(() => {
    (async () => {
      if (isAccessTokenExpired) {
        localStorage.removeItem("accessToken");
        await del("global-store");
        clearStore();
      }
    })();
  }, [isAccessTokenExpired]);

  if (fetchingCurrentUser) {
    return <Spinner />;
  }

  if (error) {
    handleError(error);

    return <Navigate to="/auth/login" replace />;
  }

  if (!currentUser && !accessToken) {
    return <Navigate to="/public" replace />;
  }
  const isAdmin = currentUser?.role === "admin"
  if(isAdmin)
    return children[0]
  return children[1]
};

function UnauthenticatedRoute({ children }: { children: React.ReactNode }) {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function Router() {
  useEffect(() => {
    const loadLanguage = async () => {
      await i18n.changeLanguage(configs.DEFAULT_LANGUAGE_CODE);
    };

    loadLanguage();
  }, []);

  return (
    <Routes>
      <Route
        path="/auth/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/auth/register"
        element={
          <UnauthenticatedRoute>
            <Register />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/"
        element={
          <AuthenticatedRoute>
            <AdminPage />
            <LandingPage />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/public"
        element={
          <UnauthenticatedRoute>
            <PublicEChat />
          </UnauthenticatedRoute>
        }
      >
        <Route
          path="conversations/:conversationsId"
          element={<LandingPage />}
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
