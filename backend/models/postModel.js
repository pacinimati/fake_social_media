// models/postModel.js
const pool = require('../db/config');

async function getAllPosts() {
  const [rows] = await pool.query(
    `SELECT p.*, u.username 
     FROM posts p 
     LEFT JOIN users u ON p.user_id = u.id 
     WHERE p.published = 1`
  );
  return rows;
}

async function getPostById(id) {
  const [rows] = await pool.query(
    `SELECT p.*, u.username 
     FROM posts p 
     LEFT JOIN users u ON p.user_id = u.id 
     WHERE p.id = ?`, 
    [id]
  );
  return rows[0];
}

async function createPost(post) {
  const { title, content, published, user_id } = post;
  const [result] = await pool.query(
    'INSERT INTO posts (title, content, published, user_id) VALUES (?, ?, ?, ?)',
    [title, content, published, user_id]
  );
  return result.insertId;
}


module.exports = {
  getAllPosts,
  getPostById,
  createPost
};
