const path = require('path')
const sequelize = require('sequelize')
const dbConfig = require('../config/db')

class ChatLogsModelClass {
  constructor(dbConfig) {
    this.db = new sequelize(dbConfig)
    this.connect()
    this.model = this.db.define(
      'ChatLogs',
      ChatLogsModelClass.model(),
      ChatLogsModelClass.modelOption()
    )
    this.model.removeAttribute('id')
  }
  static model() {
    return {
      idx: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_key: {
        type: sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: sequelize.STRING,
        defaultValue: '',
      },
      reg_date: {
        type: sequelize.DATE,
        defaultValue: new Date(),
      },
    }
  }
  static modelOption() {
    return {
      timestamps: false,
    }
  }
  connect() {
    this.db
      .authenticate()
      .then(() => {
        console.log('** Connect database **')
      })
      .catch(error => {
        console.error('** Unable to connection database **\n', error)
      })
  }
  insert({ user_key, content }) {
    this.model.sync().then(() => {
      this.model.create({ user_key, content })
    })
  }
  reset() {
    this.model.sync({ force: true }).then(() => {
      this.model.truncate()
    })
  }
  table({ offset, limit }) {
    return new Promise(resolve => {
      this.model.sync().then(() => {
        resolve(
          this.model.findAndCountAll({
            offset: offset || 0,
            limit: limit || 100,
          })
        )
      })
    })
  }
}

const ChatLogsModel = new ChatLogsModelClass(dbConfig)

module.exports = {
  ChatLogsModelClass,
  ChatLogsModel,
}
