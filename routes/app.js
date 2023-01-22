const multer = require("multer");
const path = require("path");
const express = require('express');
const router = express.Router();

// Access the Model file
const Post = require('../model/post');

// const MIME_TYPE_MAP = {
//     "image/png": "png",
//     "image/jpeg": "jpg",
//     "image/jpg": "jpg"
// };

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const isValid = MIME_TYPE_MAP[file.mimetype];
//         let error = new Error("Invalid mime type");
//         if (isValid) {
//             error = null;
//         }
//         cb(error, "./images");
//     },
//     filename: (req, file, cb) => {
//         const name = file.originalname
//             .toLowerCase()
//             .split(" ")
//             .join("-");
//         const ext = MIME_TYPE_MAP[file.mimetype];
//         cb(null, name + "-" + Date.now() + "." + ext);
//     }
// });

// Add Post
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/');
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");

        cb(null, Date.now() + "-" + name);
    }
});

// localhost:3000/api/posts
// These are the keys {title:content:image}
router.post("/api/posts", multer({ storage: storage }).single("image"),
    (req, res, next) => {
        const url = req.protocol + "://" + req.get("host");
        const post = new Post({
            title: req.body.title,
            content: req.body.content
            // imagePath: url + "/images/" + req.file.filename
        });

        post.save().then(createPost => {
            res.status(201).json({
                message: 'Post added successfully',
                post: {
                    id: createPost._id,
                    title: createPost.title,
                    content: createPost.content,
                    // imagePath: createPost.imagePath
                }
            });
        });
    })

router.post('/numbers', (req, res) => {
    const N1 = Number(req.body.n1);
    const N2 = Number(req.body.n2);
    if (N1 > N2) res.json({ result: N1 });
    else res.json({ result: N2 });
})

//Fetch Post
router.get("/api/posts", (req, res, next) => {
    Post.find()
        .then((documents) => {
            console.log(documents);
            return res.status(201).json({
                message: 'Post fetching',
                posts: documents
            });
        })
        .catch(err => {
            return res.status(201).json({ error: 'Issue in fetching' });
        });

})


module.exports = router;
