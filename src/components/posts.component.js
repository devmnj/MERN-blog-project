import React, { Component } from "react";
import axios from "axios";
 
const Post = (props) => (
  <div className="card m-2 p-2">
    <h3> {props.post.title}</h3>
    <div> {props.post.content}</div>
    <div> <i>Posted by :</i>  {props.post.user.name}  <i> Tags:</i>{" "}
    {props.post.tags.map((tag, index) => (
      <span className="label label-primary" key={index.toString()}>     
       <emphasize> {tag.tagName}</emphasize>
      </span> 
    ))}</div>
  </div>
);
export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3005/post/find")
      .then((response) => {
      
        if (response.data.length > 0) {
          this.setState({
            posts: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  PostList() {
         console.log(this.state.posts);
    return this.state.posts.map((curPost) => {
     // console.log(curPost);
      return <Post post={curPost} />;
    });
  }
  render() {
    return <div> {this.PostList()}</div>;
  }
}
