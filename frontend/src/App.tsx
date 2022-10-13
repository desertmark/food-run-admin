import { FC } from "react";
import { Providers } from "./providers/Providers";
import { Router } from "./screens/Router";
import "./App.css";
import { Layout } from "./components/Layout";

export const App: FC = () => {
  return (
    <Providers>
      <Layout>
        <Router />
      </Layout>
    </Providers>
  );
};

export default App;
