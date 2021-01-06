import React, { Component } from "react";
import axios from "axios";
class Post extends Component {
  constructor(props) {
    super(props);
    this.onChangeTittle = this.onChangeTittle.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onPublish = this.onPublish.bind(this);
    this.state = {
      title: "",
      content: "",
      tags: [],
    };
  }
  onChangeTittle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeContent(e) {
    this.setState({
      content: e.target.value,
    });
  }
  onChangeTags(e) {
    this.setState({
      tags: e.target.value.split(","),
    });
  }

  onPublish(e) {
    // e.preventDefault();
    let post = {
      title: this.state.title,
      content: this.state.content,
      user: "5fe4ab1e69b8d525c44ec293",
    };

    axios
      .post("http://localhost:3005/post/create/5fe4ab1e69b8d525c44ec293", post)
      .then((res) => {
        if (res.data) {
          console.log(this.state.tags.length);
          if (this.state.tags.length > 0) {
            console.log("Tags:" + this.state.tags);

            this.state.tags.forEach((element) => {
              console.log("preparing to create tag -> " + element);
              let tag = { tagName: element, user: "5fe4ab1e69b8d525c44ec293" };
              axios
                .post(
                  `http://localhost:3005/tag/create/${res.data._id}/5fe4ab1e69b8d525c44ec293`,
                  tag
                )
                .then((response) => {
                  if (response.data) {
                    console.log("Tag is created" + response.data);
                  }
                })
                .catch((error) => console.log(error));
            });
          }

          this.setState({
            title: "",
            content: "",
            tags: [],
          });

          console.log("Post published");
          alert("Post Published");
          // window.location='/'
        }
        console.log("Response ->" + res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div class="panel m-3 p-3">
        <div className="panel-heading">New Post </div>
        <div class="form-group has-success has-feedback">
          <label class="control-label sr-only" for="inputSuccess5">
            Hidden label
          </label>
          <input
            required
            type="text"
            placeholder="Title of the post"
            class="form-control"
            id="txt-title"
            value={this.state.title}
            onChange={this.onChangeTittle}
            aria-describedby="inputSuccess5Status"
          />
          <span
            class="glyphicon glyphicon-ok form-control-feedback"
            aria-hidden="true"
          ></span>
          <span id="inputSuccess5Status" class="sr-only">
            (success)
          </span>
        </div>

        <div class="form-group has-success has-feedback">
          <label class="control-label sr-only" for="inputSuccess5">
            Hidden label
          </label>
          <textarea
            placeholder="Content"
            class="form-control"
            id="txt-content"
            value={this.state.content}
            onChange={this.onChangeContent}
            aria-describedby="inputSuccess5Status"
          />
        </div>
        <div class="form-group has-success has-feedback">
          <label class="control-label sr-only" for="inputSuccess5">
            Hidden label
          </label>
          <input
            type="text"
            value={this.state.tags}
            onChange={this.onChangeTags}
            placeholder="tags"
            class="form-control"
            id="txt-tags"
            aria-describedby="inputSuccess5Status"
          />
          <span
            class="glyphicon glyphicon-ok form-control-feedback"
            aria-hidden="true"
          ></span>
          <span id="inputSuccess5Status" class="sr-only">
            (success)
          </span>
        </div>
        <div class="form-group has-success has-feedback">
          <button
            id="btn-publish"
            onClick={this.onPublish}
            className="btn btn-primary m-2"
          >
            Publish
          </button>
          <button id="btn-draft" className="btn btn-secondary">
            Save Draft
          </button>
          <button id="btn-cancel" className="btn btn-dark m-2">
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
