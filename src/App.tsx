import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Layout from "./components/layout";
import { Outlet } from "react-router-dom";
import ContextProvider from "./context";

function App() {
  return (
    <ContextProvider>
      <Layout>
        <Outlet />
      </Layout>
    </ContextProvider>
  );
}

export default App;
