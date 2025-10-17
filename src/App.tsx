import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Swal from "sweetalert2";

import { AppRouter } from "@src/router/AppRouter";

import { useAuthStore } from "@src/hooks/useAuthStore";

function App(): JSX.Element {
  const { errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage) Swal.fire("Error", errorMessage, "error");
  }, [errorMessage]);

  return (
    <BrowserRouter>
      <AppRouter></AppRouter>
    </BrowserRouter>
  );
}

export default App;
