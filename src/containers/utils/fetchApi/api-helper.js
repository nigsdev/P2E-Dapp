const axios = require('axios');

const httpsRequest = {};

httpsRequest.Get = async (url) => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.get(url)
          .then(response => {
              resolve(response.data)
          } );
      }
      catch (err) {
          reject(err);
      }
    });
  }

httpsRequest.Post = async (url, query) => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.post(url, { query })
          .then(response => resolve(response.data));
      }
      catch (err) {
          reject(err);
      }
    });
  }

export { httpsRequest };

