import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() =>import("react-quill"), {ssr: false});
import 'react-quill/dist/quill.snow.css';

const 
PostForm = ({content, setContent, postSubmit, handleImage, image, uploading}) => {
    return (
        <div className="card">
            <div className="card-body pb-1">
                <form className="form-group">
                    <ReactQuill 
                        theme="snow"
                        value={content}
                        onChange={(e) => setContent(e)} 
                        className="form-control .ql-editor" 
                        placeholder="write a blog post"
                        // style={{height: "150px"}}
                    />    
                </form>   
            </div>
            <div className="card-footer d-flex justify-content-between">

                <button onClick={postSubmit} className="btn btn-primary mt-1">Post</button>
                <span>
                    <label>
                        {
                            image && image.url ? (
                                <Avatar size={30} src={image.url} className="mt-1" />
                            ) : uploading ? (<LoadingOutlined className="mt-2" />) : 
                            (<CameraOutlined className="mt-2" />)
                        }
                        <input onChange={handleImage} type="file" accept="images/*" hidden />
                    </label>
                </span>
            </div>
        </div>
    )
}

export default PostForm;