// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';


// ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "../src/registerServiceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth-config.json";
import history from "./utils/history";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

ReactDOM.render(
    <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();