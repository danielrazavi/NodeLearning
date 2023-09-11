const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://netninja:test1234@cluster59031.hcnjzuf.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((response) => {
    console.log("Connected to DB.");
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine
app.set("view engine", "ejs");

app.listen(3000);

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//mongoose and mongodb sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "hello, welcome to my third blog!",
    snippet: "hi yall my name is Daniel and ...",
    body: "Hi yall, my name is Daniel and I am a person looking for a project to do!",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blog", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("64ff7d9f7a52a585ad835ffb")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname });
  const blogs = [
    { title: "batman", snippet: "THE DARK KNIGHT WAS A GREAT MOVIE" },
    { title: "superman", snippet: "Man of steel was okay, not that amazing." },
    {
      title: "robin",
      snippet:
        "Robin has never had his own movie but the last one with batman was absolute trash.",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/batman", (req, res) => {
  res.send("nananananananana batmannnn!");
});

app.get("/about", (req, res) => {
  //   res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "about" });
});

app.get("/html", (req, res) => {
  res.send("<p>home page<p>");
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
  console.log("redirecting...");
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  //   res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404!" });
});
