import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import ThemeContextProvider from "./contexts/ThemeContextProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./shared/AllRoutes.tsx";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./contexts/AuthContext.tsx";
import ConversationContextProvider from "./contexts/ConversationContext.tsx";
import SocketContextProvider from "./contexts/SocketContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <SocketContextProvider>
            <ConversationContextProvider>
              <AllRoutes />
              <Toaster position="top-right" reverseOrder={false} />
            </ConversationContextProvider>
          </SocketContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  </StrictMode>
);
