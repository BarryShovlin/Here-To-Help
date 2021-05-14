import react, { useState, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import { SearchPostList } from "./SearchPostList"
import { UserProfileContext } from "../../providers/UserProfileProvider";

export const SearchPosts = () => {
    const { posts, searchPost } = useContext(PostContext);
    const [post, setPost] = useState("");

    const handleControlledInputChange = (event) => {
        setPost(event.target.value);
    }

    return (
        <section className="search_post">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="search">Search</label>
                    <input type="text" id={post} onChange={handleControlledInputChange} required className="form-control" placeholder="Search..." value={post} />

                </div>
            </fieldset>
            <Button size="sm" style={{ width: "100px" }} className="save_post btn btn-primary" onClick={(event) => {
                event.preventDefault();
            }}><Link to={`/Post/search?q=${post}`} style={{ color: `#f9f5ed`, fontWeight: 500 }}>Search</Link>
            </Button>

        </section>

    )
}

export default SearchPosts;