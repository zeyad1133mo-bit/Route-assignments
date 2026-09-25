const express = require("express");
const { Op } = require("sequelize");
const sequelize = require("./config/database");
const User = require("./models/user.model");
const Post = require("./models/post.model");
const Comment = require("./models/comment.model");
const app = express();

app.use(express.json());

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });



User.hasMany(Comment, {
    foreignKey: "userId"
});
Comment.belongsTo(User, {
    foreignKey: "userId"
});
Post.hasMany(Comment, {
    foreignKey: "postId"
});
Comment.belongsTo(Post, {
    foreignKey: "postId"
});


app.get("/", (req, res) => {
    res.send("Server is running");
});

// User routes
app.post("/users/signup", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        };
        const user = User.build({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        res.status(401).json({ message: "Internal server error", error: error.message });
    }

});

app.put("/users/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            user.set(req.body);
            await user.save({
                validate: false
            });
            res.status(200).json({
                message: "User updated successfully",
                user
            })
        }

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

app.get("/users/by-email", async (req, res) => {

    try {
        const { email } = req.query;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

});

app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


// Post routes

app.post("/posts", async (req, res) => {

    try {

        const post = Post.build(req.body);
        await post.save();
        res.status(201).json({
            message: "Post created successfully",
            post
        })



    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

});



app.delete("/posts/:postId", async (req, res) => {

    try {

        const { postId } = req.params;
        const { userId } = req.body;


        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        await post.destroy();
        res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }


});

app.get("/posts/details", async (req, res) => {

    try {
        const post = await Post.findAll({
            attributes: ['id', 'title'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content'],
                }
            ]

        })
        res.json({
            post
        });


    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

});

app.get("/posts/comment-count", async (req, res) => {

    try {

        const posts = await Post.findAll({
            attributes: ['id', 'title',
                [sequelize.fn('COUNT',
                    sequelize.col('Comments.id')), 'commentCount']],
            include: [{
                model: Comment,
                attributes: []
            }],
            group: ['Post.id']
        });

        res.json({ posts });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});




// Comment routes


app.post("/comments", async (req, res) => {

    try {
        const comment = await Comment.bulkCreate(req.body);

        res.status(201).json({
            message: "Comments created successfully",
            comment
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });

    }
});

app.patch("/comments/:commentId", async (req, res) => {

    try {

        const { commentId } = req.params;
        const { userId, content } = req.body;

        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this comment" });
        }

        comment.content = content;
        await comment.save();
        res.json({
            message: "Comment updated successfully",
            comment

        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

});

app.post("/comments/find-or-create", async (req, res) => {
    try {
        const { content, postId, userId } = req.body;
        const [comment, created] = await Comment.findOrCreate({
            where: { content, postId, userId },
        });
        res.status(created ? 201 : 200).json({ comment, created });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get("/comments/search", async (req, res) => {

    try {

        const { word } = req.query;
        const { count, rows } = await Comment.findAndCountAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`
                }
            }
        });
        res.json({ count, rows });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });

    }


});

app.get("/comments/newest/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.findAll({
            where: { postId },
            attributes: ['id', 'content', 'createdAt'],
            order: [['createdAt', 'DESC']],
            limit: 3
        });
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get("/comments/details/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const comment = await Comment.findByPk(id, {
            include: [
                { model: User },
                { model: Post }]
        });
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json({ comment });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

 sequelize.sync({force:true})
    .then(() => {
        console.log("Database connected successfully");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.log("Database connection failed:", error);
    });




module.exports = User;