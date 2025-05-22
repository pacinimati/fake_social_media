const commentModel = require('../models/commentModel');

async function getComments(req, res) {
  const postId = req.params.postId;
  const comments = await commentModel.getCommentsByPostId(postId);
  res.json(comments);
}

async function getComments(req, res) {
  const postId = req.params.postId;
  const comments = await commentModel.getCommentsByPostId(postId);
  res.json(comments);
}

async function addComment(req, res) {
  try {
    const { content } = req.body;
    const post_id = req.params.postId;
    
    // Obtener el ID del usuario autenticado directamente de req.user
    const user_id = req.user.id;
    
    const id = await commentModel.addComment({ content, post_id, user_id });
    res.status(201).json({ message: 'Comentario agregado', id });
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    res.status(500).json({ message: 'Error al agregar comentario', error: error.message });
  }
}

module.exports = {
  getComments,
  addComment
};

