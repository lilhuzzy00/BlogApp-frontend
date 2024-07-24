import {useContext} from "react"
import { UserContext } from "../context";
const Home = () => {
    const [state, setState] = useContext(UserContext);

    return(
        <div>
            <h1 className="display-1 text-center py-5">Welcome to my blog</h1>
            {JSON.stringify(state)};
            <img src="/images/default.jpg" alt="rooster" />
        </div>
    )
    
}

export default Home;