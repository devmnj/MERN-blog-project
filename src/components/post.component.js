import React, { Component } from "react";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
            type="text"
            placeholder="Ttitle of the post"
            class="form-control"
            id="txt-title"
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
            aria-describedby="inputSuccess5Status"
          />
        </div>
        <div class="form-group has-success has-feedback">
          <label class="control-label sr-only" for="inputSuccess5">
            Hidden label
          </label>
          <input
            type="text"
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
          <button id="btn-publish" className="btn btn-primary m-2">
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
