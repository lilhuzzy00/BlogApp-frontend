import { UserProvider } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import Head from "next/head";
// import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "antd/dist/antd.css";


const MyApp = ({Component, pageProps}) => {
    return(
        <UserProvider>
            <Head>
                <link href="/css/styles.css" rel="stylesheet" />
            </Head>
            <Nav />
            <ToastContainer position="top-center" />
            < Component {...pageProps} />
        </UserProvider>
    )
}

export default MyApp;