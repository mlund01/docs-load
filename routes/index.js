var express = require('express');
var hljs = require('highlight.js');
var https = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/reference', function (req, res, next) {
  var options = {
    hostname: 'api.ordercloud.io',
    path: '/v1/docs',
    method: 'GET'
  };
  console.log('caught route');
  var str = '';
  var request = https.request(options, function (response) {
    console.log('started request');
    response.on('data', function (d) {
      str += d;
      //console.log('data loaded');

    });
    response.on('end', function(){
      var data = JSON.parse(str);
      var result = {};
      data.Resources.forEach(function(r){
        result[r.ID] = {};
        r.Endpoints.forEach(function(e){
          console.log(r.ID, e.ID);
          var output ={};
          output.RequestBodyMarkdown = e.RequestBody ? hljs.highlight('json', e.RequestBody.Sample).value : null;
          output.ResponseBodyMarkdown = e.ResponseBody ? hljs.highlight('json', e.ResponseBody.Sample).value : null;
          result[r.ID][e.ID] = output;
        })
      });
      result = JSON.stringify(result);
      // data = JSON.stringify(data, null, 4);
      // var html = hljs.highlight('json', data).value;
      res.send(result);
      //res.render('reference', {docs: html})
    })
  });

  request.on('error', function (err) {
    console.log(err);
  });

  request.on('end', function () {
    console.log(str);

  })
  request.end();
  console.log(str);

});

router.get('/docs', function (req, res, next) {
  res.render('landing-page');
})

module.exports = router;
