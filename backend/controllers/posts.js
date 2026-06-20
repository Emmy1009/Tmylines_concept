import { sql } from "../config/db.js";

export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await sql`
      SELECT * FROM posts
    `;
        res.status(200).json({ success: true, data: allPosts });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error in getting all posts"
        });
    }
};

export const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await sql`
      SELECT * FROM posts WHERE id = ${id} 
    `;
        if (post.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Post is not found or might be deleted"
            });
        }
        res.status(200).json({ success: true, data: post[0] });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error in getting  post" + e
        });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, content, category, location, image_url } = req.body;
        const { id } = req.user;
        if (!content && !image_url) {
            return res.status(409).json({ message: "All fields are required" });
        }
        if (!image_url) {
            return res
                .status(409)
                .json({ message: "Image url is field is required" });
        }
        const post = await sql`
      INSERT INTO posts (title,content,category,location,image_url,user_id) VALUES (${title},${content},${category},${location},${image_url},${id})
      RETURNING *
    `;
        res.status(201).json({ success: true, data: post[0] });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error in creating posts"+e
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { title, content, category, location, image_url } = req.body;
        const { id: userId } = req.user;
        const { id } = req.params;
        let ownerId;

        const post = await sql`
      SELECT * FROM posts WHERE id = ${id}
    `;
        const postOwnerId = Number(post[0].user_id);
        if (req.user.owner) {
            ownerId = Number(req.user.id);
        }
        if (postOwnerId !== Number(userId) || !req.user.owner) {
            return res
                .status(409)
                .json({ message: "Unauthorised to update post" });
        }
        if (!content && !image_url) {
            return res.status(400).json({ message: "Fields can't be empty" });
        }
        const updatedPost = await sql`
  UPDATE posts 
  SET
    title = COALESCE(${title},title),
    content = COALESCE(${content}, content),
    category = COALESCE(${category},category),
    location = COALESCE(${location},location),
    image_url = COALESCE(${image_url}, image_url)
  WHERE id = ${id}
  RETURNING *
`;

        res.status(200).json({ success: true, data: updatedPost[0] });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error in updating the posts" + e
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { id } = req.params;
        let ownerId;

        const post = await sql`
      SELECT * FROM posts WHERE id = ${id}
    `;
        const postOwnerId = Number(post[0].user_id);
        if (req.user.owner) {
            ownerId = Number(req.user.id);
        }
        if (postOwnerId !== Number(userId) || !req.user.owner) {
            return res
                .status(409)
                .json({ message: "Unauthorised to update post" });
        }
        const deletedPost = await sql`
          DELETE FROM posts WHERE id = ${id}
          RETURNING *
        `;
        res.status(200).json({ success: true, data: deletedPost[0] });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error in Deleting posts" + e
        });
    }
};
