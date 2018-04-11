const path = require('path')

module.exports = {
  apps: [
    {
      name: 'chatbot-kakao',
      script: 'bin/www',
      cwd: './',
      env: {
        NODE_ENV: 'production', // development = 개발용, production = 서비스
        PORT: 56003,
      },
      watch: false,
      log_file: path.resolve(__dirname, './log/pi.log'),
      out_file: path.resolve(__dirname, './log/pi.log'),
      error_file: path.resolve(__dirname, './log/pi.log'),
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      ignore_watch: ['log'],
    },
  ],
}
