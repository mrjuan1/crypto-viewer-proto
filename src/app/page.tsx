import { ReactNode } from "react";

import Dashboard from "./components/dashboard/dashboard";
import { metadata } from "./layout";
import Titlebar from "./components/titlebar/titlebar";

const Home = (): ReactNode => (
  <main>
    <Titlebar title={String(metadata.title)} />
    <Dashboard />
  </main>
);

export default Home;
