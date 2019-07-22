//THIS FILE STAYS BASICALLY THE SAME
import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', err => {
  console.error('[DB] Error:', err)
})

import keys from './dbkeys'
const connectionString = `mongodb+srv://${keys.user}:${keys.password}@cluster0-egapb.mongodb.net/Kanban?retryWrites=true&w=majority`


export default class DbContext {
  static async connect() {
    try {
      let status = await mongoose.connect(connectionString)
      console.log("[DB] CONNECTED")
      return status
    } catch (e) {
      console.error(e)
    }
  }
}