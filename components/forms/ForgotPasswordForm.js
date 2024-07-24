import {SyncOutlined} from "@ant-design/icons";

const ForgotPasswordForm = ({handleSubmit, name, setName, email, setEmail, newPassword, setNewPassword, secret, setSecret, loading, page}) => {
    return(
        <form onSubmit={handleSubmit} className="form-head">
                
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}  className="form-control my-2" type="email" placeholder="Johndoe@gmail.com" />
                </div>
                <div className="form-group">
                    <label className="text-muted">New Password</label>
                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)}  className="form-control my-2" type="password" placeholder="Enter New Password" />
                </div>
                <>
                    <div className="form-group">
                        <small>
                            <label className="text-muted">Pick A Question</label>
                        </small>
                        <select className="form-control">
                            <option>What's your favourite colour?</option>
                            <option>What's your mother's maiden name?</option>
                            <option>What state where you born</option>
                        </select>
                    </div>
                    <div>
                        <small>You can use these questions to reset your password</small>
                    </div>
                            
                    <div className="form-group">
                        <input value={secret} onChange={(e) => setSecret(e.target.value)}  className="form-control my-2" type="text" placeholder="Write your answer here" />
                    </div>
                </>

                <div className="py-1">
                    <button disabled={!email || !newPassword || !secret || loading } className="btn btn-primary form-control"
                        >
                        {loading ? <SyncOutlined spin className="py-1" />: "Submit"}
                    </button>
                </div>    
        </form>
    )
    
}


export default ForgotPasswordForm;