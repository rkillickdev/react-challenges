import React, { Component } from 'react';
import axios from 'axios';
import API_KEY from "../secrets.js";
import css from "./css/Content.module.css";
import PostItemAPI from './PostItemAPI.js';
import Loader from './Loader';

export class ContentAPI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      posts: [],
      savedPosts: []
    }
  }
  
  componentDidMount() {
    this.fetchImages();
  }

  async fetchImages() {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&per_page=100&safesearch=true&editors_choice=true&orientation=horizontal`);
    const fetchedPosts = response.data.hits;

    this.setState({
        isLoaded: true,
        posts: fetchedPosts,
        savedPosts: fetchedPosts,
    })
  }
  

  handleChange = (event) => {
    const name = event.target.value.toLowerCase();
    const filteredPosts = this.state.savedPosts.filter((post)=>{
        return post.user.toLowerCase().includes(name)
    })
    this.setState({
        posts: filteredPosts
    })
  }
  
  render() {
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
                    onChange ={(event) => this.handleChange(event)}       
                />
                <h4>posts found: {this.state.posts.length}</h4>
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
              this.state.isLoaded ?
              <PostItemAPI savedPosts={this.state.posts} />
              : <Loader />  
            }
            
        </div>
      </div>
    )
  }
}

export default ContentAPI