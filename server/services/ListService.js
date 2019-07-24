import mongoose from "mongoose"
import TaskService from "./TaskService"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: {
    type: ObjectId, ref: 'Board', required: true, set: function (v) {
      // @ts-ignore
      if (this.boardId) {
        return this.boardId
      } else {
        return v
      }
    }
  }
}, { timestamps: true })


//CASCADE ON DELETE
_schema.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    // @ts-ignore
    TaskService.deleteMany({ listId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default mongoose.model('List', _schema)