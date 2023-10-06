const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.json());

const Article = require("./models/Article");

mongoose
  .connect(
    "mongodb+srv://mohamed:mohamed1234@firstclusterdb.cyev4qn.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connect Success");
  })
  .catch((error) => {
    console.log("no connect", error);
  });

// ======= ARTICLES ENDPOINTS =====


// Add Articles
app.post("/articles", async (req, res) => {
  const newArticle = new Article();

  const title = req.body.title;
  const body = req.body.body;

  newArticle.title = title;
  newArticle.body = body;
  newArticle.numberOfLikes = 100;

  await newArticle.save();
  res.json(newArticle);
});

// Get All Articles
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get Article By ID

app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const findArticle = await Article.findById(id);
    res.json(findArticle);
    return;
  } catch (error) {
    res.json({
      message: "the error is" + error,
    });
  }
});

// Update Article

app.put("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const updateArticle = await Article.findById(id);
    updateArticle.title = req.body.title;
    updateArticle.body = req.body.body;

    await updateArticle.save()
    res.json(updateArticle);
  } catch (error) {
    res.json({
      message: "the error is" + error,
    });
  }
});
// Delete Article
app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;

  try {
    const deleteArticle = await Article.findByIdAndDelete(id);
    res.json(deleteArticle);
  } catch (error) {
    res.json({
      message: "the error is" + error,
    });
  }
});

app.listen(port, () => {
  console.log("I am listening in port " + port);
});
