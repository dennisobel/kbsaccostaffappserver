var Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/of');
require('rxjs/add/operator/map');
let axios = require('axios');
var request = require("request");

exports.observable = (URL) =>{
    console.log(URL)
  let observable$ = Observable.create((observer)=>{
    axios.post(URL)
    .then((response)=>{
      observer.next(response.data);
      observer.complete();
    })
    .catch((error)=>{
      observer.error(error);
    })
  })

  return observable$;   
}

exports.sendMessage = (URL) => {
  let options = {
      "method":"POST",
      "url":URL,
      "headers":{
          "Content-Type": 'application/json;charset=utf-8'
      },
      body: { value: 8.5 },
      json: true 
  }

  request(options, function (error, response, body) {
      if (error) {throw new Error(error)};
      
      console.log(body);
  });    
}