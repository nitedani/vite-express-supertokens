import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import * as reactRouterDom from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
  SuperTokensWrapper,
} from "supertokens-auth-react";
import { SuperTokensConfig } from "./config";
import { HomePage } from "./pages/home";
import { PageLayout } from "./pages/layout";
import { ProtectedPage } from "./pages/protected";

SuperTokens.init(SuperTokensConfig);
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: false,
    },
  },
});
const Router = () => (
  <BrowserRouter>
    <Routes>
      {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
      <Route path="/" element={<PageLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/protected" element={<ProtectedPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SuperTokensWrapper>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </SuperTokensWrapper>
  </React.StrictMode>
);
