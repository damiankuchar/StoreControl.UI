import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import { Toaster } from "./components/ui/toaster";
import Router from "./router/router";

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Router />
        <Toaster />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
