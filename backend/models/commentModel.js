const pool = require('../db/config');

async function addComment({ content, post_id, user_id }) {
  const [result] = await pool.query(
    'INSERT INTO comments (content, post_id, user_id) VALUES (?, ?, ?)',
    [content, post_id, user_id]
  );
  return result.insertId;
}

async function getCommentsByPostId(postId) {
  const [rows] = await pool.query(
    `SELECT c.id, c.content, c.created_at, u.username 
     FROM comments c 
     LEFT JOIN users u ON c.user_id = u.id 
     WHERE c.post_id = ? ORDER BY c.created_at DESC`,
    [postId]
  );
  return rows;
}

module.exports = {
  addComment,
  getCommentsByPostId
};
