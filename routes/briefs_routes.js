const express = require('express')
const router = express.Router()
const briefsController = require('../controllers/briefs_controller')


router.get('/', briefsController.list)
// list is a key. It's also a function. Check controller brief_controller to understand how this is called out.

router.get('/create', briefsController.new)

router.get('/:id', briefsController.display_brief)
//using :id as a consistent we can also call it anything we want
//such as /:briefId but using id for clarity.

router.get('/:id/edit', briefsController.edit)

router.post('/chicken', briefsController.create)

router.put('/:id', briefsController.update)

router.delete('/:id', briefsController.delete)

module.exports = router
