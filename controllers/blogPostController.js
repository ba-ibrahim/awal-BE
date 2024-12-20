const BlogPost = require("../models/BlogPost");



const createBlogPost = async (req, res) => {
    const { title, content, author } = req.body;
    const thumbnail = req.file?.path; // Get the Cloudinary image URL

    try {
        // Create a new blog post with thumbnail
        const newBlogPost = await BlogPost.create({ title, content, author, thumbnail });

        res.status(201).json(newBlogPost);
    } catch (error) {
        res.status(500).json({ 
            msg: 'Server Error ::: Blog Post Creation -- Blog Post Controller', 
            error: error.message 
        });
    }
};


const getBlogPosts = async (req, res) => {
    try {
        // Get all blog posts
        const blogPosts = await BlogPost.find().sort({ createdAt: -1 });
        
        // Return the blog posts
        res.json({ blogPosts });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error ::: Blog Post Retrieval -- Blog Post Controller', error: error.message });
    }
}

const getBlogPostById = async (req, res) => {
    try {
        // Get a single blog post by ID
        const blogPost = await BlogPost.findById(req.params.postId);
        
        // Return the blog post
        res.status(200).json({ blogPost });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error ::: Blog Post Retrieval -- Blog Post Controller', error: error.message });
    }
}

const updateBlogPost = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        // Update a blog post by ID
        const updatedBlogPost = await BlogPost.findByIdAndUpdate(req.params.postId, { title, content, author }, { new: true });
        
        // Return the updated blog post
        res.status(200).json({ updatedBlogPost });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error ::: Blog Post Update -- Blog Post Controller', error: error.message });
    }
}

const deleteBlogPost = async (req, res) => {
    try {
        // Delete a blog post by ID
        await BlogPost.findByIdAndDelete(req.params.postId);
        
        // Return a success message
        res.status(200).json({ msg: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error ::: Blog Post Delete -- Blog Post Controller', error: error.message });
    }
}


module.exports = {
    createBlogPost,
    getBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost
}