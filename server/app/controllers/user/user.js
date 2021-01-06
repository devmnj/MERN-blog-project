const User = require('../../models/user');

module.exports = {
    create: async (req, res) => {
        const {
            name,
            bio,
            email,
            website
        } = req.body;
        const user = await User.create({
            name,
            email,
            bio,
            website
        })

        return res.send(user)
    },

    find: async (req, res) => {
        const user = await User.find()
        return res.send(user)
    },
    postsByUser: async (req, res) => {
        try {
           const {  id  } = req.params;
        console.log('User:'+id);
        await User.findById(id).populate('posts').exec(function  (error,post) {
            console.log('User Post->' + post);
        res.send(post);// body..
        });
        
         } catch(e) {
             // statements
             console.log(e);
             res.sta(401).send({error:e})
         } 
    }
}