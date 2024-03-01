import express from 'express'
import taskController from '../controllers/taskController.js'

const router = express.Router()

router.get('/', taskController.findAll)
router.get('/:id', taskController.findOne)
router.post('/', taskController.create)
router.put('/:id', taskController.update)
router.delete('/:id', taskController.destroy)

export default router;
