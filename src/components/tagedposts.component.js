import React, { Component } from "react";
import axios from "axios";
 
const Post = (props) => (
  <div className="card m-2 p-2">
    <h3><a href={`/post/${props.post._id}`}>{props.post.title}</a></h3>
    <div> {props.post.content}</div>
    <div> <i>Posted by :</i>  {props.post.user.name}  <i> Tags:</i>{" "}
    {props.post.tags.map((tag, index) => (
      <span className="label label-primary" key={index.toString()}>     
       <emphasize className="badge badge-warning m-1"><a href={`/tag/post/${tag._id}`}> {tag.tagName}</a></emphasize>
      </span>
    ))}
    </div>
  </div>
);
export default class TagPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    const { tid } = this.props.match.params;
    axios
      .get(`http://localhost:3005/tag/post/${tid}`)
      .then((response) => {

        // if (response.data.length > 0) {
          console.log('Tag posts found:'+response.data);
          this.setState({
            posts: response.data,
          });
        // }
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
