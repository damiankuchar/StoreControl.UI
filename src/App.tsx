import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Router from "./router/router";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Router />
          <Toaster closeButton richColors position="top-right" />
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
