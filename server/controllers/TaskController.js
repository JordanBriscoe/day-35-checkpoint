import _taskService from '../services/TaskService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'

//PUBLIC
export default class TasksController {
    constructor() {
        this.router = express.Router()
            .use(Authorize.authenticated)
            .get('/board/:boardId', this.getByBoardId)
            .post('', this.create)
            .put('/:id/comment', this.addComment)
            .put('/:id', this.edit)
            .delete('/:id/comment/:commentId', this.deleteComment)
            .delete('/:id', this.delete)
            .use(this.defaultRoute)
    }

    defaultRoute(req, res, next) {
        next({ status: 404, message: 'No Such Route' })
    }

    async getByBoardId(req, res, next) {
        try {
            let data = await _taskService.find({ authorId: req.session.uid, boardId: req.params.boardId }).populate('authorId')
            for (let i = 0; i < data.length; i++) {
                let newKids = await _taskService.populate(data[i].children, {
                    path: 'authorId'
                });
                data[i].children = newKids;
            }
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.authorId = req.session.uid
            let data = await _taskService.create(req.body)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await _taskService.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
            if (data) {
                return res.send(data)
            }
            throw new Error("invalid id")
        } catch (error) { next(error) }
    }

    async addComment(req, res, next) {
        try {
            req.body['authorId'] = req.session.uid
            let taskToUpdate = await _taskService.findOne({ _id: req.params.id, authorId: req.session.uid })
            if (taskToUpdate) {
                //@ts-ignore
                taskToUpdate.children.push(req.body)
                taskToUpdate.save();
                return res.send(taskToUpdate)
            }
            throw new Error("invalid id")
        } catch (error) { next(error) }
    }

    async delete(req, res, next) {
        try {
            await _taskService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }

    async deleteComment(req, res, next) {
        try {
            let taskToUpdate = await _taskService.findOne({ _id: req.params.id, authorId: req.session.uid })
            //@ts-ignore
            taskToUpdate.children.id(req.params.commentId).remove();
            taskToUpdate.save();
            return res.send(taskToUpdate)
        } catch (error) { next(error) }
    }
}


