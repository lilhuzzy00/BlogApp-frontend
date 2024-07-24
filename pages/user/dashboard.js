import { useContext, useState, useEffect } from "react";
import {UserContext} from "../../context";
import UserRoute from "../../components/routes/Userroute";
import { useRouter, userRouter } from "next/router";
import axios from "axios";
import {toast} from "react-toastify";
import PostForms from "../../components/forms/PostForm";
import Postlist from "../../components/cards/Postlist";

const Home = () =>{
    const [state, setState] = useContext(UserContext);
    const [content, setContent] = useState("");
    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);
    const [posts, setPost] = useState([]);

    const router = useRouter();

    useEffect(()=>{
        if(state && state.token){
            fetchUserPosts()
        }
        
    }, [state && state.token])

    const fetchUserPosts = async (req, res) => {
        try {
            const {data} = await axios.get("/post-by-users");
            // console.log("post =>", data);
            setPost(data)
        } catch (error) {
            console.log(error)
        }
    }

    const postSubmit = async (e) => {
        e.preventDefault()
        // console.log("post =>", content)
        try {
            const {data} = await axios.post("/create-post",  {content, image});
            console.log("create post response =>", data);
            if(data.error){
                toast.error(data.error);
            } else {
                fetchUserPosts();
                toast.success("Post created successfully")
                setContent("");
                setImage({});
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleImage = async(e) =>{
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("image", file);
        // console.log([...formData]);
        setUploading(true);

        try{
            const {data} = await axios.post('/upload-image', formData);
            // console.log("uploaded image =>", data);
            setImage({
                url: data.url,
                public_id: data.public_id
            });
            setUploading(false);
        } catch(error){
            console.log(error);
            setUploading(false);
        }
    }

    const handleDelete = async (post) =>{
        try{
            const answer = window.confirm("Confirm delete");
            if(!answer) return;
            const {data} = await axios.delete(`/delete-post/${post._id}`);
            toast.error("Post deleted");
            fetchUserPosts()
        } catch(error){
            console.log(error)
        }
    }

    return(
        <UserRoute>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="display-1 text-center">Dashboard</h1>
                    </div>
                </div>
                
                <div className="row py-3">
                    <div className="col-md-8 offset-2">
                        <PostForms 
                            content={content} 
                            setContent={setContent} 
                            postSubmit={postSubmit} 
                            handleImage={handleImage}
                            uploading={uploading}
                            image={image}
                        />
                        <div className="row" style={{display: "flex", justifyContent: "center", marginTop: "15px"}}>
                            <Postlist posts={posts} handleDelete={handleDelete}  />
                        </div>
                    </div>
                    {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
                    
                    {/* <div className="col-md-4">Sidebar</div> */}
                </div>
            </div> 
        </UserRoute>       
    )
}

export default Home;