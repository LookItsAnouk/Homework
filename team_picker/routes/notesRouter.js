const express = require("express");
const knex = require("../db/client"); // This allows us to interact with the database

const router = express.Router();


router.get("/", (req, res) => {
  knex("notes")
    .orderBy("createdAt", "desc")
    .then(notes => {
      // notice the res.render is within the callback to `.then`
      console.log(notes);
      res.render("notes/index", { notes: notes });
    });
});

// this route is automatically prepended with "/posts"
// meaning that it is the path: "/posts/new", NOT just "/new"
// NAME: posts#new, METHOD: GET, PATH: '/posts/new'
router.get("/new", (req, res) => {
    // This will render the new.ejs file located within the posts
    // directory of the views directory
    res.render("notes/new");
  });


  // NAME: posts#create, METHOD: POST, PATH: /posts
router.post("/", (req, res) => {
    const formData = req.body;
    knex("notess")
      .insert({
        title: formData.title,
        content: formData.content,
        imageUrl: formData.imageUrl
      })
      .returning("*")
      .then(notes => {
        // This is called "destructuring" the array
        const [note /*, post2 */] = notes;
        // const post = posts[0];
        // const post2 = posts[1];
  
        // If we want to use a terminating method like
        // res.send, res.render, or res.redirect
        // And we want to do this after inserting something,
        // updating something, reading something, etc from our db
        // We need to use that terminating method
        // within the callback to `.then`
        res.redirect(`/notes/${note.id}`);
      });
  });

  // NAME: posts#show, METHOD: GET, PATH: /posts/:id
router.get("/:id", (req, res) => {
    // In the URL above, all the words prefixed with  `:`
    // are called URL params. You can view the values of URL params
    // with the `req.params` object property. It contains an object
    // where the property name corresponds to the name of the url param
    // and its associated value.
  
    // `req.params` is an object with key value pairs created by
    // pattern-matching against "variables" named in the URL/path
    // route /posts/:id/:name/:job the route then accessed was: /posts/100/Bob/developer
    // req.params === { id: "100", name: "Bob", job: "developer" }
    const id = req.params.id;
    knex("posts")
      .where("id", id)
      .first()
      // first is a Knex method that works with SELECT queries
      // It will return the first result from the array of results
      // that matched the where clause
      // Without `first` the result returned from the query will always be an
      // array of values, even if we know that it is returning only a single value
      .then(post => {
        // res.send(post);
        // If there is a post with that id, we will show it, otherwise
        // we will redirect the user to the list of all posts
        if (post) {
          res.render("posts/show", { post: post });
        } else {
          res.redirect("/posts");
        }
      });
  });


module.exports = router;