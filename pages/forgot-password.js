import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {Modal} from "antd";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

const forgotPassword = () => {
    const [email, setEmail] = useState('godspower@gmail.com');
    const [newPassword, setNewPassword] = useState('ffgefr3');
    const [secret, setSecret] = useState('blue');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const [state] = useContext(UserContext);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // console.log(name, email, password, secret);
          setLoading(true);
          const { data } = await axios.post(`/forgot-password`, {
            email,
            newPassword,
            secret,
          });
       
          console.log("forgot password res => ", data);
       
          if (data.error) {
            toast.error(data.error);
            setLoading(false);
          }
       
          if (data.success) {
            setEmail("");
            setNewPassword("");
            setSecret("");
            setOk(true);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
    };

    if(state && state.token){
        router.push("/");
    }

    return (
        <div className="container-fluid">
            <div className="row py-5 bg-secondary text-light">
                <div className="col text-center">
                    <h1>Reset Your Password</h1>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3 ">
                    <ForgotPasswordForm 
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
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
                        <p>Password reset successful</p>
                        <Link href="/login">
                            <a className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
        


export default forgotPassword;