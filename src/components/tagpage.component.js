import React, { Component } from "react";
import axios from "axios";

const PostTitles= props=>(
  <div>
    <div>Date: {props.post.createdAt} </div>    
    <a href={`/post/${props.post._id}`} >{props.post.title} </a>
  </div>
)
const Tag = (props) => (
  <div>
    <h6 className="badge badge-info" >{props.tag.tagName} <span class="badge badge-light">{props.tag.posts.length}</span></h6>
    <div>{props.tag.posts.map((post,index)=><span key={index.toString()}> <PostTitles post= {post}/> </span>)}</div>
  </div>
);
class TagPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }
  componentDidMount() {
    axios.get("http://localhost:3005/tag/find").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          tags: response.data,
        })
      }
    }).catch(error=>{
      console.log(error);
    });
  }

  tagList() {
    return this.state.tags.map((curTag) => {
      console.log(curTag);
      return <Tag tag={curTag} />;
    });
  }
  render() {
    return (
      <div>
        <h3>Post Tags</h3>
        {this.tagList()}
      </div>
    );
  }
}

export default TagPage;
