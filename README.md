# Cryptocurrencies

Simple app for viewing information about cryptocurrencies.

This app was meant as an assignment and is more of an incomplete prototype then an actual useful application.

Also, there are bugs here and there that can break the app and require a refresh.

## Setup

```sh
git clone https://github.com/mrjuan1/crypto-viewer-proto.git
cd crypto-viewer-proto
bun i # or npm i/yarn if you prefer those
```

Copy `.env.example` to `.env`. Next, get a CoinGecko demo API key and store it in you `.env` file.

This will be required for all calls to the CoinGecko demo API.

## Running dev server

```sh
./start-with-bun.sh # to start with bun in turbo mode

```

...or...

```sh
bun --bun run dev # or npm run dev/yarn dev if you prefer those
```

Note that `dev` can be replaced with `dev:turbo` to start in turbo mode. Check nextjs's docs for more info on turbo mode.

## Building the static site

First remove any old builds:

```sh
rm -Rfv out
```

Then build the application:

```sh
bun --bun run build # or npm run build/yarn build if you prefer those
```

The resulting build should be in the `out` directory. The contents thereof can be statically hosted anywhere.
