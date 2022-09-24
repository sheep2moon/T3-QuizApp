import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const session = useSession();
    useEffect(() => {
        console.log(session);
    }, [session]);
    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav status={session.status} name={session.data?.user?.name} image={session.data?.user?.image} />
            <main className="container  mx-auto  flex flex-col items-center justify-center p-1 small:p-4 min-h-screen">{children}</main>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <ToastContainer />
        </>
    );
};

export default Layout;
