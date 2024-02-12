const blogModel = require("../models/blog");



const getAllBlog = (req, res) => {
    //return all blogs.
    blogModel.find({})
        .then((blog) => {
            res.status(200).send(blog);
        }).catch((err) => {
            res.status(500).send({message: err.message });
        })
}

const postBlog = (req, res) => {
    //post a blog.
    const blog = req.body
    blogModel.create(blog)
        .then((blog) => {
            res.status(201).send({
                message: "new blog posted successfully",
                data: blog
            })
        }).catch((err) => {
            res.status(400).send({messge: err.message})
        })
}


const openBlog = (req, res) => {
    //open a blog.
    const id = req.params.id
    blogModel.findById(id)
        .then((blog) => {
            res.status(200).send(blog);
        }).catch((err) => {
            res.status(400).send({message: err.message });
        })
}

const editBlog = (req, res) => {
    //edit a blog.
    const id = req.params.id
    const blog = req.body
    blogModel.findByIdAndUpdate(id, blog, { new: true })
        .then((blog) => {
            res.status(200).send({
                message: "successfully edited",
                data: blog
            });
        }).catch((err) => {
            res.status(400).send({message: err.message });
        })
}

const deleteBlog = (req, res) => {
    //delete a blog.
    const id = req.params.id
    blogModel.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send({
                message: "post deleted successfully",
                data: ""
            });
        }).catch((err) => {
            res.status(400).send({message: err.message });
        })
}



module.exports = { getAllBlog, postBlog, openBlog, editBlog, deleteBlog }