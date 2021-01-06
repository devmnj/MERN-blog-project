const Post = require('../../models/post');
const User = require('../../models/user');
const Comment = require('../../models/comment')
module.exports = {
    create: async (req, res) => {
        try {          
            console.log(req.params);
            const p = req.params['pid'];
            const u = req.params['uid'];
            console.log(p, u);
            const {
                comment
            } = req.body;
            Comment.create({
                comment: comment,
                post: p,
                user: u
            }, function(err, comment) {
                if (err) return handleError(err)
                if (comment) {
                    Post.findById(p, function(error, post) {
                        if (error) return handleError(error)
                        if (post) {
                            post.comments.push(comment)
                            post.save(function(err, pos) {
                                if (error) return handleError(error)
                                if (pos) {
                                    console.log(`Comments in the posts are ${pos.comments}`);
                                }
                            })
                        }
                    });
                }
                res.status(200).send(comment)
            });

        } catch (e) {           
            console.log(e);
            res.status(200).send({error:e})
        }
    },
    comments:async(req,res)=>{
        try {            
            const {
                pid
            } = req.params;   
            console.log(pid);        
            Comment.find({post:pid},function(error,comment){
                if(comment){
                    console.log('cmnt-->'+comment);
                    res.status(200).send(comment)
                }
                else{
                 res.status(200).send(comment)   
                }
            })
        } catch(e) {
            // statements
            console.log(e);
            res.status(400).send({error:e})
        }
    },
     findComments:async(req,res)=>{
        try {
            const {
                pid
            } = req.params;
            // console.log('pid='+pid);
            const postComments=await Comment.find({post:pid})
            res.status(200).send(postComments)
                
        } catch(e) {
            // statements
            console.log(e);
            res.status(400).send({error:e})
        }
    }

}