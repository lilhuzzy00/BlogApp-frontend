import {SyncOutlined} from "@ant-design/icons";

const AuthForms = ({
                    profileUpdate,
                    handleSubmit, 
                    name, 
                    setName, 
                    email, 
                    setEmail, 
                    password, 
                    setPassword, 
                    secret, 
                    setSecret, 
                    loading, 
                    page,
                    username,
                    setUsername,
                    about,
                    setAbout
                }) => {
    return(
        <form onSubmit={handleSubmit} className="form-head">
                {profileUpdate && (<div className="form-group">
                    <label className="text-muted">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control my-2" type="text" placeholder="Choose a username" />
                </div>)}
                {profileUpdate && (<div className="form-group">
                    <label className="text-muted">About</label>
                    <input value={about} onChange={(e) => setAbout(e.target.value)} className="form-control my-2" type="text" placeholder="About you" />
                </div>)}
                {page !== "login" && (<div className="form-group">
                    <label className="text-muted">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="form-control my-2" type="text" placeholder="John Doe" />
                </div>)}
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}  className="form-control my-2" type="email" placeholder="Johndoe@gmail.com" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}  className="form-control my-2" type="password" placeholder="Johndoe63" />
                </div>
                { page !== "login" &&(<>
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
                </>)}

                <div className="py-1">
                    <button disabled={page === "login" ?  !email || !password || loading 
                                        : !name || !email || !password || !secret || loading} className="btn btn-primary form-control"
                        >
                        {loading ? <SyncOutlined spin className="py-1" />: "Submit"}
                    </button>
                </div>    
        </form>
    )
    
}


export default AuthForms