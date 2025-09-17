const Comment = require('../models/comment')
const commentsRouter = require('express').Router()
const logger = require('../utils/logger')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
  response.status(200).json(comments)
})

module.exports = commentsRouter

commentsRouter.post('/', async (request, response, next) => {
  const { text, blogId } = request.body

  if (!text || !blogId) {
    return response.status(400).json({ error: 'text and blogId are required' })
  }

  const commentToAdd = new Comment({
    text,
    blogId,
  })

  try {
    const savedComment = await commentToAdd.save()
    response.status(201).json(savedComment)
    logger.info(`${savedComment.text} saved successfully`)
  } catch (error) {
    next(error)
  }
})

commentsRouter.get('/:blogId', async (request, response, next) => {
  const { blogId } = request.params

  try {
    const comments = await Comment.find({ blogId })
      .sort({ createdAt: -1 })
      .limit(100)

    response.json(comments)
    // logger.info(`${comments.length} comments fetched`)
  } catch (error) {
    next(error)
  }
})

module.exports = commentsRouter
