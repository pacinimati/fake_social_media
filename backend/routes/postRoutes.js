const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);

// Rutas protegidas
router.post('/', isAuthenticated, postController.createPost);

module.exports = router;
