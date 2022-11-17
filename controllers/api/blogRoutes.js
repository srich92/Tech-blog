const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/createblog', withAuth, async (req, res) => {

  try {
    const blogData = await Blog.findAll({
      where: { userId: req.session.userId },
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('createblog', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/editblog/:id', withAuth, async (req, res) => {

  try {
    const blogData = await Blog.findByPk(req.body, {
      where: { id: req.body.id },
    });
    
   console.table(blogData);

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('/editblog', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/createpost', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.userId,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
