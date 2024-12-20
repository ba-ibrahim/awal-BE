const upload = require("../config/upload");
const { createBlogPost, getBlogPostById, getBlogPosts, updateBlogPost, deleteBlogPost } = require("../controllers/blogPostController");

const router = require("express").Router();

/**
 * @swagger
 * /api/v1/create:
 *   post:
 *     summary: Create a new blog post
 *     description: This endpoint allows a user to create a new blog post and upload a thumbnail image.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: thumbnail
 *         type: file
 *         required: true
 *         description: The blog post's thumbnail image.
 *       - in: formData
 *         name: title
 *         type: string
 *         required: true
 *         description: The title of the blog post.
 *       - in: formData
 *         name: content
 *         type: string
 *         required: true
 *         description: The content or body of the blog post.
 *     responses:
 *       201:
 *         description: Blog post successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog post created successfully"
 *                 post:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "My First Blog Post"
 *                     content:
 *                       type: string
 *                       example: "This is the content of the blog post."
 *                     thumbnail:
 *                       type: string
 *                       example: "https://res.cloudinary.com/image/upload/v1634848583/my_thumbnail.jpg"
 *       400:
 *         description: Bad request, validation errors, or missing fields
 *       500:
 *         description: Server error
 */
router.post("/create", upload.single('thumbnail'), createBlogPost);

/**
 * @swagger
 * /api/v1/{postId}:
 *   get:
 *     summary: Get a specific blog post by ID
 *     description: This endpoint retrieves a specific blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the blog post to retrieve.
 *     responses:
 *       200:
 *         description: Blog post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "My First Blog Post"
 *                     content:
 *                       type: string
 *                       example: "This is the content of the blog post."
 *                     thumbnail:
 *                       type: string
 *                       example: "https://res.cloudinary.com/image/upload/v1634848583/my_thumbnail.jpg"
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Server error
 */
router.get("/:postId", getBlogPostById);

/**
 * @swagger
 * /api/v1/:
 *   get:
 *     summary: Get all blog posts
 *     description: This endpoint retrieves a list of all blog posts.
 *     responses:
 *       200:
 *         description: List of blog posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "My First Blog Post"
 *                   content:
 *                     type: string
 *                     example: "This is the content of the blog post."
 *                   thumbnail:
 *                     type: string
 *                     example: "https://res.cloudinary.com/image/upload/v1634848583/my_thumbnail.jpg"
 *       500:
 *         description: Server error
 */
router.get("/", getBlogPosts);

/**
 * @swagger
 * /api/v1/{postId}:
 *   put:
 *     summary: Update a blog post
 *     description: This endpoint allows a user to update the content of a blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the blog post to update.
 *       - in: formData
 *         name: title
 *         type: string
 *         required: true
 *         description: The title of the blog post.
 *       - in: formData
 *         name: content
 *         type: string
 *         required: true
 *         description: The content or body of the blog post.
 *       - in: formData
 *         name: thumbnail
 *         type: file
 *         required: false
 *         description: The blog post's new thumbnail image (optional).
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog post updated successfully"
 *                 post:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Updated Blog Post"
 *                     content:
 *                       type: string
 *                       example: "Updated content of the blog post."
 *                     thumbnail:
 *                       type: string
 *                       example: "https://res.cloudinary.com/image/upload/v1634848583/updated_thumbnail.jpg"
 *       400:
 *         description: Invalid input or missing fields
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Server error
 */
router.put("/:postId", updateBlogPost);

/**
 * @swagger
 * /api/v1/{postId}:
 *   delete:
 *     summary: Delete a blog post
 *     description: This endpoint allows a user to delete a blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the blog post to delete.
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog post deleted successfully"
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Server error
 */
router.delete("/:postId", deleteBlogPost);

module.exports = router;
