import { ReactNode } from "react";

import { metadata } from "./layout";
import Main from "./main";

const Home = (): ReactNode => (
  <main>
    <Main
      title={String(metadata.title)}
      apiDetails={{
        apiBaseURL: process.env["COINGECKO_API_BASE_URL"],
        apiDemoKeyHeader: process.env["COINGECKO_DEMO_API_KEY_HEADER"],
        apiDemoKey: process.env["COINGECKO_DEMO_API_KEY"],
      }}
    />
  </main>
);

export default Home;
