import React, {useState, useEffect} from 'react'
import css from "./css/Content.module.css";
import PostItemAPI from "./PostItemAPI";
import Loader from "./Loader";
import axios from "axios";
import API_KEY from "../secrets";

function ContentAPIHooks() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        fetchImages()
    }, [])

    const fetchImages = async () => {
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&per_page=100&safesearch=true&editors_choice=true&orientation=horizontal`);
        const fetchedPosts = response.data.hits;

        setIsLoaded(true);
        setPosts(fetchedPosts);
        setSavedPosts(fetchedPosts);
    }

    const handleChange = (e) => {
        const name = e.target.value.toLowerCase();
        const filteredPosts = savedPosts.filter((post)=>{
            return post.user.toLowerCase().includes(name);
        })

        setPosts(filteredPosts);
    }

  return (
    <div className={css.Content}>
        <div className={css.TitleBar}>
            <h1>My Photos</h1>
            <form>
                <label htmlFor='searchInput'>Search</label>
                <input
                    type='search'
                    id='searchInput'
                    placeholder='By Author'
                    onChange ={(event) => handleChange(event)}       
                />
                <h4>posts found: {posts.length}</h4>
            </form>
        </div>
        <div className={css.SearchResults}>
            {/* {
                savedPosts.map((post) => {
                    return <div className={css.SearchItem} key={post.title}>
                        <p>{post.title}</p>
                        <p>{post.name}</p>
                        <img src={post.image} alt="random"/>
                        <p>{post.description}</p>    
                    </div>
                })
            } */}
            {
              isLoaded ?
              <PostItemAPI savedPosts={posts} />
              : <Loader />  
            }
        </div>
      </div>
  )
}

export default ContentAPIHooks