import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
    const [current, setCurrent] = useState("")
    const [state, setState] = useContext(UserContext);

useEffect(()=>{
    process.browser && setCurrent(window.location.pathname);
},[process.browser && window.location.pathname]);


    const router = useRouter();

    const Logout = () =>{
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/login");
    }
       
    return(
        <ul className="nav d-flex" style={{backgroundColor: "#010a1a", justifyContent: "space-between"}}>
            <span style={{display: "flex", alignItems: "center"}}>
                <h5 style={{color: "white"}}>My Blog</h5>
            </span>
            {/* <div class="dropdown">
                <button class="btn dropdown-toggle" 
                    type="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false" 
                    style={{color: "white"}}
                >
                    Dropdown button
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div> */}
            <span style={{display: "flex", justifyContent: "flex-end"}}>
                <li className={`nav-item ${current === "/" && "active"}`}>
                    <Link href="/">
                        <a className="nav-link text-light" aria-current="page" >Home</a>
                    </Link>
                </li>

                {state !== null ?(
                    <>
                        <li className={`nav-item ${current === "#" && "active"}`}>
                            <Link href="/user/dashboard">
                                <a className="nav-link" style={{color: "yellow"}}>{state && state.user && state.user.name}</a>
                            </Link>
                        </li>
                        <li className={`nav-item ${current === "/user/profile/update" && "active"}`}>
                            <Link href="/user/profile/update">
                                <a className="nav-link" style={{color: "white"}}>Profile</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a onClick={Logout} className="nav-link text-light" >Logout</a>
                        </li>
                    </> 
                ): (
                    <>
                        <li className={`nav-item ${current === "/register" && "active"}`}>
                            <Link href="/register">
                                <a className="nav-link text-light" >Register</a>
                            </Link>
                        </li>
                        <li className={`nav-item ${current === "/login" && "active"}`}>
                            <Link href="/login">
                                <a className="nav-link text-light" >Login</a>
                            </Link>
                        </li>
                    </>
                )
            }
            </span>      
        </ul>
    )
    
}

export default Nav;