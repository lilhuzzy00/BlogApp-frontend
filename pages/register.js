import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {Modal} from "antd";
import Link from "next/link";
import AuthForms from "../components/forms/AuthForms";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Register = () => {
    const [name, setName] = useState('Godspower');
    const [email, setEmail] = useState('godspower@gmail.com');
    const [password, setPassword] = useState('ffgefr3');
    const [secret, setSecret] = useState('blue');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const [state] = useContext(UserContext);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault() 
        try {
            setLoading(true)
            const {data} = await  axios.post(`/register`, {
                name,
                email,
                password,
                secret     
            })
            if(data.error){
                toast.error(data.error);
                setLoading(false)
            }

            else{
                setName("");
                setEmail("");
                setPassword("");
                setSecret("");
                setOk(data.ok);
                setLoading(false);
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
                    <h1>Register</h1>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3 ">
                    <AuthForms 
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        secret={secret}
                        setSecret={setSecret}
                        loading={loading}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Modal
                    title="Congratulation"
                    open={ok}
                    onCancel={()=> setOk(false)}
                    footer={null}
                    >
                        <p>You have successfully Registered</p>
                        <Link href="/login">
                            <a className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Already registered?{" "}
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
        


export default Register;