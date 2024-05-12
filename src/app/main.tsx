"use client";

import Dashboard from "@components/dashboard";
import { ListItemSelectFunc } from "@components/list-item";
import Titlebar from "@components/titlebar";
import { APIDetails, getFetcher } from "@utils/fetcher";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

interface MainProps {
  title: string;
  logoURL: string;
  apiDetails: APIDetails;
}

const viewCoin: ListItemSelectFunc = (coinId: string): void => {
  console.log(coinId);
};

const Main = (props: MainProps): ReactNode => (
  <SWRConfig value={{ fetcher: getFetcher(props.apiDetails) }}>
    <Titlebar title={props.title} logoURL={props.logoURL} />
    <Dashboard onListItemSelect={viewCoin} />
  </SWRConfig>
);

export default Main;
