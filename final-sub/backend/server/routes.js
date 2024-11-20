const { postPredictHandler, getHistory } = require('../server/handler');

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
          payload: {
            allow: 'multipart/form-data',
            multipart: true,
            // output: 'stream',
            // parse: true,
            maxBytes: 1000000, // Batas ukuran file 1MB
          }
        }
      },
      {
        path: '/predict/histories',
        method: 'GET',
        handler: getHistory,
      }
    ]
     
module.exports = routes;