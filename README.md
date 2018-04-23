# Create Chatbot

간단한 챗봇만들기입니다.
현재 [카카오톡 플러스친구](https://github.com/plusfriend/auto_reply)만 지원합니다.

## Demo

[Live Demo](https://pf.kakao.com/_xcwBxnC)

## Install

config/db.json 파일이 없으면 자동으로 sqlite3를 사용합니다.

```bash
// install
$ npm i

// db
$ npm i --no-save sqlite3
$ npm i --no-save pg pg-hstore
$ npm i --no-save mysql2
$ npm i --no-save tedious // MSSQL
```

## Run the app

```bash
// start
$ DEBUG=create-chatbot:* npm start
```

## Reference

- express
- [카카오톡 플러스친구](https://github.com/plusfriend/auto_reply)
