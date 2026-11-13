import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/APIContext";
import { i18nReady } from "./i18n";

const root = createRoot(document.getElementById("root")!);

function renderApp() {
  root.render(
    <StrictMode>
      <AuthProvider>
        <ProductProvider>
          <RouterProvider router={router} />
        </ProductProvider>
      </AuthProvider>
    </StrictMode>,
  );
}

void i18nReady
  .catch((error: unknown) => {
    console.error("Could not load translations. Continuing with fallbacks.", error);
  })
  .then(renderApp);
