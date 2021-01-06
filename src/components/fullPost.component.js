import React, { Component } from "react";
import axios from "axios";
import Comment from "./comment.component";
class FullPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: Object,
      tags: [],
      comments: [],
    };
  }
  componentDidMount() {
    const { pid } = this.props.match.params;

    axios
      .get(`http://localhost:3005/post/${pid}`)
      .then((res) => {
        if (res.data) {
          this.setState({ post: res.data, tags: res.data.tags ,});
        }
      })
      .catch((error) => {
        console.log(error);
      });

       const id =`http://localhost:3005/comment/${pid}`
       console.log('id='+id);
     axios
       .get(id)
       .then((response) => {
         console.log("comp.did.mnt" + response.data)
         this.setState({comments:response.data})
       })
       .catch((e) => {
         console.log(e);
       });
  }
  render() {
    return (
      <div>
        <div className="card m-2 p-2">
          <h3>{this.state.post.title}</h3>
          <div>{this.state.post.content} </div>
          <div>
            {" "}
            Posted By: {Object(this.state.post.user).name}
            <span className="p-2 "> Tags:</span>{" "}
            {this.state.tags.map((element) => (
              <span
                className="badge badge-warning m-1"
                key={element._id.toString()}
              >
                {" "}
                <a href={`/tag/post/${element._id}`}> {element.tagName}</a>
              </span>
            ))}
          </div>
        </div>
        <Comment comments={this.state.comments} pid={this.state.post._id} />
      </div>
    );
  }
}

export default FullPost;
