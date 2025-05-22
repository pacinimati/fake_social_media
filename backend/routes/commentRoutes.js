const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { isAuthenticated } = require('../middlewares/authMiddleware');


router.get('/:postId', commentController.getComments);


//Ruta protegida
router.post('/:postId',isAuthenticated, commentController.addComment);

module.exports = router;
