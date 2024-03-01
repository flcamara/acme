import express from 'express'
import tasksRoutes from './tasksRoutes.js'

const router = express.Router({mergeParams: true})

router.use('/tasks', tasksRoutes)

export default router;