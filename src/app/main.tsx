"use client";

import Dashboard from "@components/dashboard";
import Titlebar from "@components/titlebar";
import { APIDetails, getFetcher } from "@utils/fetcher";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

interface MainProps {
  title: string;
  logoURL: string;
  apiDetails: APIDetails;
}

const Main = (props: MainProps): ReactNode => (
  <SWRConfig value={{ fetcher: getFetcher(props.apiDetails) }}>
    <Titlebar
      title={props.title}
      logoURL={props.logoURL}
      actionsArea="ZAR" // TODO: Add currency selector
    />
    <Dashboard />
  </SWRConfig>
);

export default Main;
