import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import AuthForms from "../components/forms/AuthForms";
import {useRouter} from "next/router";
import { UserContext } from "../context";

const Login = () => {
    const [email, setEmail] = useState('godspower@gmail.com');
    const [password, setPassword] = useState('ffgefr3');
    const [loading, setLoading] = useState(false);

    const [state, setState] = useContext(UserContext);


    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault() 
        try {
            setLoading(true)
            const {data} = await  axios.post(`/login`, {
                email,
                password,
            })

            if(data.error){
                toast.error(data.error);
                setLoading(false)
            }
            else {
                setState({
                    user: data.user,
                    token: data.token
                })
                //save in local storage 
                window.localStorage.setItem("auth", JSON.stringify(data))
                router.push('/')

            }
        } 
            catch(error){
            toast.error(error.response.data)
            setLoading(false)
        }
    }
    if(state && state.token){
        router.push("/");
    }
    return (
        <div className="container-fluid">
            <div className="row py-5 bg-secondary text-light">
                <div className="col text-center">
                    <h1>Login</h1>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3 ">
                    <AuthForms 
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        loading={loading}
                        page="login"
                    />
                </div>
            </div>
            
            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Not registered{" "}
                        <Link href="/register">
                            <a>Register Here</a>
                        </Link>
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="text-center">
                        <Link href="/forgot-password">
                            <a className="text-danger">Forgot Password</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
        


export default Login;