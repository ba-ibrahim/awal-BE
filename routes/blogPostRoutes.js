

const upload = require("../config/upload")
const { createBlogPost, getBlogPostById, getBlogPosts, updateBlogPost, deleteBlogPost } = require("../controllers/blogPostController")


const router = require("express").Router()

router.post("/create", upload.single('thumbnail'), createBlogPost)

router.get("/:postId", getBlogPostById)

router.get("/", getBlogPosts)

router.put("/:postId", updateBlogPost)

router.delete("/:postId", deleteBlogPost)


module.exports = router