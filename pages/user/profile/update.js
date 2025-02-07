import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {Modal} from "antd";
import Link from "next/link";
import AuthForms from "../../../components/forms/AuthForms";
import { UserContext } from "../../../context";
import { useRouter } from "next/router";

const ProfileUpdate = () => {
    const [username, setUsername] = useState('');
    const [about, setAbout] = useState(''); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secret, setSecret] = useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const [state] = useContext(UserContext);
    const router = useRouter();

    useEffect(()=>{
        if(state && state.user){
            // console.log("Found user =>" state.user)
            setUsername(state.user.username);
            setAbout(state.user.about);
            setName(state.user.name);
            setEmail(state.user.email);
        }

    },[state && state.user])

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


    return (
        <div className="container-fluid">
            <div className="row py-5 bg-secondary text-light">
                <div className="col text-center">
                    <h1>Profile</h1>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3 ">
                    <AuthForms 
                        profileUpdate={true}
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
                        username={username}
                        setUsername={setUsername}
                        about={about}
                        setAbout={setAbout}

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
            {/* <div className="row">
                <div className="col">
                    <p className="text-center">
                        Already registered?{" "}
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </p>
                </div>
            </div> */}
        </div>
    )
}
        


export default ProfileUpdate;