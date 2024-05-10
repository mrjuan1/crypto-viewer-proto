import Dashboard from "./dashboard";
import { metadata } from "./layout";
import Titlebar from "./titlebar";

export const Home = () => (
  <main>
    <Titlebar title={String(metadata.title)} />
    <Dashboard />
  </main>
);

export default Home;
