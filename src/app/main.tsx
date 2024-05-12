"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";

interface APIDetails {
  apiBaseURL?: string;
  apiDemoKeyHeader?: string;
  apiDemoKey?: string;
}

interface MainProps {
  title: string;
  apiDetails: APIDetails;
}

const Main = (props: MainProps): ReactNode => {
  const fetcher = async (endpoint: string): Promise<unknown> => {
    const { apiBaseURL, apiDemoKeyHeader, apiDemoKey } = props.apiDetails;

    if (!apiBaseURL) {
      throw new Error("API base URL not configured");
    }

    if (!apiDemoKeyHeader) {
      throw new Error("API demo key header not configured");
    }

    if (!apiDemoKey) {
      throw new Error("API demo key not configured");
    }

    const response: Response = await fetch(`${apiBaseURL}${endpoint}`, {
      headers: {
        accept: "application/json",
        [apiDemoKeyHeader]: apiDemoKey,
      },
    });

    return response.json();
  };

  return (
    <SWRConfig value={{ fetcher }}>titlebar and dashboard go here</SWRConfig>
  );
};

export default Main;
