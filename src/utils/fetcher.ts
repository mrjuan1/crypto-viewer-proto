type FetcherFunc = (endpoint: string) => Promise<unknown>;
type GetFetcherFunc = (apiDetails: APIDetails) => FetcherFunc;

export interface APIDetails {
  apiBaseURL?: string;
  apiDemoKeyHeader?: string;
  apiDemoKey?: string;
}

export const getFetcher: GetFetcherFunc =
  (apiDetails: APIDetails): FetcherFunc =>
  async (endpoint: string): Promise<unknown> => {
    const { apiBaseURL, apiDemoKeyHeader, apiDemoKey } = apiDetails;

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
