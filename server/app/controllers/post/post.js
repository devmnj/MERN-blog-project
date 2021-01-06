const Post = require("../../models/post");
const User = require("../../models/user");

module.exports = {
  create: async (req, res) => {
    try {
      console.log(req.params);
      user = req.params;
      id = user.id;
      const { title, content } = req.body;
      const post = await Post.create({
        title,
        content,
        user: id,
      });
      await post.save();
      console.log("Post Created:->" + post._id);
      Post.findById(post._id)
        .populate("user")
        .exec(function (error, post) {
          console.log("New post - > " + post);
        });
      const userById = await User.findById(id);
      console.log("userById ->" + userById);
      console.log("Post to user ->" + post);
      userById.posts.push(post);
      await userById.save();

      return res.send(post);
    } catch (e) {
      // statements
      console.log(e);
      return res.sta(401).send({
        error: e,
      });
    }
  },
  find: async (req, res) => {
    //    const p = await Post.find().populate({path:'tags',model:'Tag'}).populate('user').exec(function (error,posts){
    await Post.find()
      .populate("tags")
      .populate("user")
      .exec(function (error, posts) {
        console.log(posts);
        return res.send(posts);
      });
  },
  delete:(req,res)=>{
    try {
       const pid = req.params["pid"];
       console.log('Delete->PID'+pid);
       Post.findByIdAndDelete(pid,function (error,depost){
        if(error) return handleError(error)
        res.status(200).send(depost)
        console.log('posts deleted');
       })
    } catch(e) {
        res.status(400).send({error:e})
      console.log(e);
    }
  }
,
  fullPost: (req, res) => {
    console.log(req.params);
    const pid = req.params["pid"];
    console.log("PID-" + pid);
    try {
      Post.findById(pid)
        .populate("tags")
        .populate("user")
        .populate("comments")
        .exec(function (error, p) {
          if (p) {
            res.status(200).send(p);
            console.log("Full post :" + p);
          } else {
            res.status(400).send(p);
          }
        });
    } catch (e) {
      console.log(e);
      res.status(400).send({
        error: e,
      });
    }
  },
  findPost: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await Post.findOne({
      _id: id,
    })
      .populate("user")
      .populate("tags")
      .exec(function (error, post) {
        console.log(post);
        res.send(post);
      });
  },
  postComments: async (req, res) => {
    const { id } = req.params;
    const postComments = await Post.findById(id).populate("comments");
    res.send(postComments);
  },
  postTags: async (req, res) => {
    const { id } = req.params;
    const postComments = await Post.findById(id).populate("tags");
    res.send(postComments);
  },
  userByPost: async (req, res) => {
    const { id } = req.params;
    const userByPost = await Post.findById(id).populate("user");
    res.send(userByPost);
  },
};
