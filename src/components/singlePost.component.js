import React, { Component } from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";
const Tag=props=>(
    <div>{props.tag}</div>
)

const Post = (props) => (
  <div className="card m-2 p-2">
    <h3> {props.post.title}</h3>
    <div> {props.post.content}</div>
    <span> Posted By: {Object(props.post.user).name}</span>
    <span>Tags : </span> 
  </div>
);
class SinglePost extends Component {
  constructor(props) {

    super(props);
    this.state = {
      single_post: Object
    };
  }

  componentDidMount() {
    const { pid } = this.props.match.params;
    //   alert(pid)
    axios
      .get("http://localhost:3005/post/" + String(pid))
      .then((response) => {
        //    console.log(response.data.length)
        if (response.data) {
          //   alert("has data");
          this.setState({
            single_post: response.data,
          });
          // console.log(this.state.single_post)
        }
      })
      .catch((error) => {
        console.log("hass error");
        console.log(error);
      });
  }

 

  // renderObj = (obj) => { 
  //   Object.keys(obj).map((obj, i) => {
      
  //       return (
  //       <div>
  //         {obj[obj].tagName}
  //       </div>
  //     )})}

  render() {
    console.log('Objects to render :...'+ this.state.single_post)
    return <div> 
       
        <Post post={this.state.single_post}/>

    </div>;
     
  }
}

export default SinglePost;
