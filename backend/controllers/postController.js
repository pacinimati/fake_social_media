// controllers/postController.js
const postModel = require('../models/postModel');

async function getPosts(req, res) {
  const posts = await postModel.getAllPosts();
  res.json(posts);
}

async function getPost(req, res) {
  const post = await postModel.getPostById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post no encontrado' });
  res.json(post);
}

// filepath: e:\Documentos\GitHub\odin-project\NODE\blog api\backend\controllers\postController.js
async function createPost(req, res) {
  try {
    // El middleware isAuthenticated ya verificó que req.user existe
    const newPostId = await postModel.createPost({ 
      ...req.body, 
      user_id: req.user.id // Accede directamente, si falla indicará claramente el error
    });
    res.status(201).json({ message: 'Post creado', id: newPostId });
  } catch (error) {
    console.error('Error al crear post:', error);
    res.status(500).json({ message: 'Error al crear el post', error: error.message });
  }
}

module.exports = {
  getPosts,
  getPost,
  createPost
};
