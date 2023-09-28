

import { StateProvider } from "@/context/StateContext";
import reducer, { initialstate } from "@/context/StateReducers";
import "@/styles/globals.css";
import Head from "next/head";


export default function App({ Component, pageProps }) {
  return <>
    <StateProvider initialstate={initialstate} reducer={reducer}>
      <Head>
        <title>GearChat</title>
        <link rel="shortcut icon" href="/icon.png" />
      </Head>
      <Component {...pageProps} />
    </StateProvider>

  </>
}
