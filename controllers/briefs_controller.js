const Brief = require('../models/brief.js')

let briefsController = {
  //Route are important becasue you uses it to grab and dsipaly information. We don't
  //talk directly to the file itself it's always a thridparty.

  // Read
list: (req, res) => {
    Brief.find({}, function (err, index) {
      if (err) throw err
      res.render('briefs/allbriefs', {listed_briefs: index} )
    })
  },
  //below has need to find anythign for database so can be direct to go to the file path
  //could have been res.render('briefs/create_brief')
  new: (req, res) => {
      res.render('briefs/create_brief')
    },
  //listed_briefs has to reflect on my ejs briefs/allbriefs they link because controller is a reference point.
  //index has to be consisten as index is the req res.
  //
display_brief: (req, res) => {
    Brief.findById(req.params.id, function (err, index) {
      if (err){
      console.log(err)
      return res.json('Not Succesful')}
      res.render('briefs/display_brief', {singleBriefs:index})
    })
  },
edit: (req, res) => {
    Brief.findById(req.params.id, function (err, index) {
      if (err) return res.json('Not Succesful')
      res.render('briefs/edit_brief', {singleBriefs:index})
    })
  },

  // // Create
create:  (req, res) => {
  Brief.create({
    briefTitle: req.body.briefTitle,
      oneLiner: req.body.oneLiner,
     dueDate: req.body.dueDate,
     estimatedBudget: req.body.estimatedBudget,
     task: req.body.task,
     briefCreator: req.user.id
  }, function (err, index) {
      if (err) {
        return res.status(422).json('Error Message : Not Succesful')
      }
      res.redirect('/')
    });
  },

  //Update
  update: (req, res) => {
    Brief.findOneAndUpdate({_id:req.params.id},req.body, function (err, index) {
    if (err) {
      console.log(err);
        throw err
      }
      res.redirect(302, '/briefs/'+ index._id )
    })
  },

  //Destory
delete: (req, res) => {
    Brief.findOneAndRemove({_id:req.params.id}, function (err) {
      if (err) return res.json('Error Message: Not Succesful')
      res.redirect('/briefs')
    })
  },


}
module.exports = briefsController
