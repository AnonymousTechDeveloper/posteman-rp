import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="828027822764-e54fc64252kd0epk8moscmpmj0p4cbtl.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
);
