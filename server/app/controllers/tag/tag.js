const Post = require('../../models/post');
const User = require('../../models/user');
const Tag = require('../../models/tag');

module.exports = {
	create: async (req, res) => {
		try {
			const pst = req.params['pid']
			const usr = req.params['uid']
			const {
				tagName
			} = req.body

			Tag.findOne({
				tagName: tagName
			}, function(error, ctag) {
				if (error) return handleError(err)
				if (!ctag && tagName.length>0) {
					console.log('new tag');
					Tag.create({
						tagName: tagName
					}, function(error, stag) {
						if (error) return handleError(error)
						console.log(`new tag saved : ${stag.tagName}`);
						Post.findById(pst, function(error, post) {
							if (error) return handleError(error)
							if (post) {
								console.log('Post found !');
								//add posts to the tags
								stag.posts.push(post)
								stag.save(function(error, cposts) {
									if (error) return handleError(error)
									console.log(`Current posts in tags ${stag}`)
								})

								//add posts to tags
								post.tags.push(stag)
								post.save(function(error, argument) {
									if (error) return handleError(error)
									console.log(`Current Tags in the posts ${post.tags}`);
								})

							}

						})
						res.status(200).send(stag)
					})

				} else {
					console.log('Tag found');
					//add tags to the post
					Post.findById(pst, function(error, post) {
						if (error) return handleError(error)
						if (post) {
							if (post.tags.filter(xtag => xtag == ctag) == false) {
								post.tags.push(ctag)
								post.save(function(error, argument) {
									if (error) return handleError(error)
									console.log(`Current Tags in the posts ${post.tags}`);
								})
							} else {
								console.log(`Tag ${newtag} already added`);
							}
						}
					})
					//add posts to tag 
					if (ctag.posts.filter(ps => ps == pst) == false) {
						ctag.posts.push(pst)
						ctag.save(function(error, cposts) {
							if (error) return handleError(error)
							console.log(`Current posts in tags ${ctag}`)
						})
					} else {
						console.log(`Post ${pst} already exist`);
					}

					res.status(200).send(ctag)
				}
			})

		} catch (e) {

			return res.send({
				error: e
			})
			console.log(e);
		}


	},

	tagsList: async (req, res) => {
		Tag.find(function(error, t) {
			return res.send(t)
		})
		// console.log(tags);

	},
	find: async (req, res) => {
		try {
			Tag.find().populate('posts').exec(function(error, tags) {
				if (error) return handleError(error)
				console.log(tags);
				return res.send((tags))
			})
		} catch (e) {
			// statements
			return res.status(401).send({
				error: e
			})
			console.log(e);
		}

	},

	tagedPosts: async (req, res) => {

		try {
			const tid = req.params['tid']
			Tag.findById(tid).populate({
				path: 'posts',
				populate: {
					path: 'tags'
				},
				populate: {
					path: 'user',
					select: 'name'
				}
			}).populate({
				path: 'posts',
				populate: {
					path: 'tags',
					select: 'tagName'
				}
			}).exec((err, post) => {
				if (err) return handleError(err)
				console.log('tagged posts are ' + post);
				return res.status(200).send(post.posts)


			})
		} catch (e) {

			console.log(e);
			return res.status(400).send({
				error: e
			})
		}

		// console.log(tags);


	}

}