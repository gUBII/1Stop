import React from "react";
import { useNavigate  } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };
  return (
    <Auth0Provider
      domain='dev-vy3a256hkmnp3qm0.us.auth0.com'
      clientId='L1zoxcy9pj4Yqf2mpv4YXwRc7T51UO8W'
      connection="MongoDB"
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;