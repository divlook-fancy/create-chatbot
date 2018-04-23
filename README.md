# Create Chatbot

간단한 챗봇만들기입니다.
현재 [카카오톡 플러스친구](https://github.com/plusfriend/auto_reply)만 지원합니다.

## Demo

[Live Demo](https://pf.kakao.com/_xcwBxnC)

## Script


```bash
# install
$ npm i

# database
# config/db.json 파일이 없으면 자동으로 sqlite3를 사용합니다.
$ npm i --save sqlite3
$ npm i --save pg pg-hstore
$ npm i --save mysql2
$ npm i --save tedious // MSSQL

# start
$ npm run start
$ npm run dev

# unit test
$ npm run test
```

## Reference

- [express](http://expressjs.com/)
- [kakaotalk-plusfriend](https://github.com/plusfriend/auto_reply)
- [sequelize](http://docs.sequelizejs.com/)
- [mocha](https://mochajs.org)
