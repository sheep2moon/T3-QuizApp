import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../modules/layout";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
    // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

    return <h1>Twórz i rozwiązuj quizy</h1>;
};

export default Home;
