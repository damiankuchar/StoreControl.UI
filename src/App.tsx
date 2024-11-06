import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Router from "./router/router";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Router />
        <Toaster closeButton richColors position="top-right" />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
