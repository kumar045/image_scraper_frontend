const axios = require("axios");

const options = {
  method: 'POST',
  url: 'http://54.174.255.58:8000/api/start',
  data: {
    "query":'furniture',
    "color":"black",
    
    
  },
  headers: {
    'content-type': 'application/json',
  }
};

axios.request(options).then(function (response) {
	console.log(response.data[0].response.collection_of_streambytes);
}).catch(function (error) {
	console.error(error);
});