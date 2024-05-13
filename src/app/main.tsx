"use client";

import CurrencySelector from "@components/currency-selector";
import Dashboard from "@components/dashboard";
import Titlebar from "@components/titlebar";
import { APIDetails, getFetcher } from "@utils/fetcher";
import { useState } from "react";
import { SWRConfig } from "swr";

interface MainProps {
  title: string;
  logoURL: string;
  apiDetails: APIDetails;
}

const Main = (props: MainProps) => {
  const [currency, setCurrency] = useState<string>("zar");

  return (
    <SWRConfig value={{ fetcher: getFetcher(props.apiDetails) }}>
      <Titlebar
        title={props.title}
        logoURL={props.logoURL}
        actionsArea={
          <CurrencySelector
            onCurrencyChange={(currency) => setCurrency(currency)}
          />
        }
      />

      <Dashboard currency={currency} />
    </SWRConfig>
  );
};

export default Main;
