import _taskService from '../services/TaskService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'

//PUBLIC
export default class TasksController {
    constructor() {
        this.router = express.Router()
            .use(Authorize.authenticated)
            .get('/list/:listId', this.getByListId)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
            .use(this.defaultRoute)
    }

    defaultRoute(req, res, next) {
        next({ status: 404, message: 'No Such Route' })
    }

    async getByListId(req, res, next) {
        try {
            let data = await _taskService.find({ authorId: req.session.uid, listId: req.params.listId })
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

    async delete(req, res, next) {
        try {
            await _taskService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }
}


