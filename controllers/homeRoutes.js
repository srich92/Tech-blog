const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/', async(req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model: Comment }, { model: User }],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        blogs.forEach(blog => {
            console.log(blog)
            var date = new Date(blog.createdAt);
            blog.createdAt = date.toLocaleDateString("en-US");
        });



        res.render('homepage', {
            blogs,
            
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        console.log('LOGGED IN: ' + req.session.loggedIn);
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;