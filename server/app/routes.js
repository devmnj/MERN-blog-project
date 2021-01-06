const express = require('express');
const router = new express.Router;
const User = require('./controllers/user/user');
const Post = require('./controllers/post/post');
const Comment = require('./controllers/comment/comment');
const Tag = require('./controllers/tag/tag');

router.get('/',(req,res)=>res.send('ok'));

// user routes
router.post('/user/create',User.create);
router.get('/user/find',User.find);
router.get('/user/find/post/:id', User.postsByUser);
// router.get('/user/find/post/co:id', User.postsByUser);
// post routes
router.post('/post/create/:id', Post.create);
router.get('/post/find', Post.find);
router.get('/post/:pid',Post.fullPost)
router.post('/post/populate/:id',Post.userByPost)
router.post('/post/comment/:id',Post.postComments)
router.get('/post/tags/:id',Post.postTags)
router.delete('/post/:pid',Post.delete)
//comments routes
router.post('/comment/create/:pid/:uid',Comment.create)
router.get('/comment/:pid/',Comment.comments)
// router.get('/comments/:pid/',Comment.findComments)

//tag routes
router.post('/tag/create/:pid/:uid',Tag.create)
router.get('/tag/find',Tag.find)
router.get('/tag/post/:tid',Tag.tagedPosts)

module.exports = router;
