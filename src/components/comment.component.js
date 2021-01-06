import React, { Component } from "react";
import axios from "axios";

const CommentCard = (props) => (
  <div className="container">
    <div className="card">
      <div className="card-header">Comments</div>
      <div>{props.comments.map((curComment,index) => (
        <div className="card-body" key={index.toString()}>{curComment.comment} </div>
      ))}
      </div>
    </div>
  </div>
);
class Comment extends Component {
  constructor(props) {
    super(props);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onPostComment = this.onPostComment.bind(this);
     console.log('--id'+this.props.pid);
    this.state = {
      comment: "",
    };
  }
  onChangeComment(e) {
    this.setState({ comment: e.target.value });
  }

  onPostComment(e) {
    try {
      let newComment = {
        comment: this.state.comment,
        post: this.props.pid,
      };
       console.log('pid='+this.props.pid);
      axios
        .post(
          `http://localhost:3005/comment/create/${this.props.pid}/5fe4ab1e69b8d525c44ec293`,
          newComment
        )
        .then((res) => {
          if (res.data) {
            console.log("comment posted" + res.data);
            alert("Thank you for comment");

            this.setState({
              comment: "",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
      console.log(newComment);
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    return (
      <div className="form-group  m-2 p-2">
        <textarea
          placeholder="Comment here"
          class="form-control"
          value={this.state.comment}
          onChange={this.onChangeComment}
          aria-describedby="inputSuccess5Status"
        />
        <button
          className="btn btn-primary m-1 p-2"
          onClick={this.onPostComment}
        >
          Comment
        </button>
         <CommentCard  comments={this.props.comments}/>
      </div>
    );
  }
}

export default Comment;
