const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://back-end-projeto-springboot-production.up.railway.app',
    secure: false,
    loglevel: 'debug',
  }
];
module.exports = PROXY_CONFIG;
