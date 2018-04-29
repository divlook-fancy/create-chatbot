const fs = require('fs')
const path = require('path')
const sequelize = require('sequelize')
const dbConfigPath = path.resolve(__dirname, '../config/db.json')
const dbConfig = fs.existsSync(dbConfigPath)
  ? require(dbConfigPath)
  : {
      dialect: 'sqlite',
      storage: path.resolve(__dirname, '../config/ChatLogs.sqlite'),
      operatorsAliases: false,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }

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
    }
  }
  static modelOption() {
    return {
      createdAt: 'reg_date',
      deletedAt: false,
      updatedAt: false,
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
