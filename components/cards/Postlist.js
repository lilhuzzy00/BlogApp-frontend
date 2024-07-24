import {useContext} from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UserContext } from "../../context";
import { useRouter } from "next/router";


const Postlist = ({posts, handleDelete}) => {
    const [state] = useContext(UserContext)
    const router = useRouter();

    return(
        <>   {
                posts && posts.map((post, i)=>(
                    <div className="card" style={{width: "22rem", margin: "5px"}} key={i}> 
                    {/* <div className="card-header">
                        <Avatar size={40} style={{marginRight: "4px"}}>
                            {post.postedBy.name[0]}
                        </Avatar>
                        <span>{post.postedBy.name}</span>
                    </div> */}
                        <>
                            {post.image && (
                                <div
                                    style={{
                                        backgroundImage: "url("+ post.image.url +")",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center center",
                                        backgroundSize: "cover", 
                                        height: "300px",
                                        marginTop: "7px"
                                    }}
                                >
                                </div>
                            )}
                        </>
                        <div className="card-body">
                            <h5 className="card-title"></h5>
                            <p className="card-text">{renderHTML(post.content)}</p>
                            {state && state.user && state.user._id === post.postedBy._id && (
                                <div className="updatePost">
                                <EditOutlined onClick={()=>router.push(`/user/post/${post._id}`)} style={{color: "blue"}} />
                                <DeleteOutlined onClick={()=> handleDelete(post)} style={{color: "red"}} />
                            </div>
                            )}
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Postlist;