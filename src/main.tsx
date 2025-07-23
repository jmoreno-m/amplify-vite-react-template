import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

import outputs from "../amplify_outputs.json";



Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator
      components={{
        SignIn: {
          Header() {
            return (
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <img src="/logo.png" alt="Logo"   style={{ width: 250, display: 'block', margin: '0 auto' }} />
                <h2>Welcome! Please sign in.</h2>
              </div>
            );
          }
        }
      }}
      formFields={{
        signUp: {
          username: {
            label: 'Username',
            placeholder: 'Enter your username',
          },
        },
      }}
    >
      <App />
    </Authenticator>
  </React.StrictMode>
);