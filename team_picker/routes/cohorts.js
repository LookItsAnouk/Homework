const express = require("express");
const knex = require("../db/client"); // This allows us to interact with the database

const router = express.Router();

  // render cohort index
  router.get("/index", (req, res) => {
    knex("cohorts")
      .orderBy("created_at", "desc")
      .then(cohorts => {
        res.render("cohorts/index", { cohorts: cohorts });
      });
  });


//Render new cohort template
router.get("/", (req, res) => {
  res.render("cohorts/new", {cohort: false});
});

// create new cohort
router.post("/", (req, res) => {
    const formData = req.body;
    knex("cohorts")
      .insert({
        name: formData.name,
        members: formData.members,
        logourl: formData.logourl
      })
      .returning("*")
      .then(cohorts => {
        const cohort = cohorts[0];
        res.redirect(`/cohorts/${cohort.id}`);
      });
  });



//show single cohort
router.get("/:id", (req, res) => {
    const id = req.params.id;
    knex("cohorts")
      .where("id", id)
      .first()
      .then(cohort => {
        if (!cohort) {
          res.send("No Cohorts found")
        } else {
          res.render("cohorts/show", {cohort: cohort});
        }
      });
  });
//------------Render Edit template---------------
router.get('/:id/edit', (req, res) => {
  knex('cohorts')
  .where('id', req.params.id)
  .first()
  .then(cohort => {
    res.render('cohorts/edit', {cohort: cohort})
  })
})

//---------------------Update cohort---------------
router.patch('/:id', (req, res) => {
  const formData = req.body;
  knex('cohorts')
  .where('id', req.params.id)
  .update({
    name: formData.name,
    members: formData.members,
    logourl: formData.logourl
  })
  .then(() => {
      res.redirect(`/cohorts/${req.params.id}`)
  })
})

// --------------Delete/destroy a single cohort---------
router.delete("/:id", (req,res) => {
  knex('cohorts')
    .where('id', req.params.id)
    .del()
    .then(() => {
      console.log(req.params.id)
     res.redirect("/cohorts/index")
    })
})



module.exports = router;