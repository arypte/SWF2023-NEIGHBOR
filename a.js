var request = require("request");

var options = {
  method: 'POST',
  url: 'https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud',
  headers: {
    'x-rapidapi-host': 'textvis-word-cloud-v1.p.rapidapi.com',
    'x-rapidapi-key': 'a0b17c85c4mshbb72796eac2abffp1717b3jsncc4e57ce603b',
    'content-type': 'application/json',
    accept: 'application/json'
  },
  body: {
    text: 'This is a test. I repeat, this is a test. We are only testing the functionality of this api, nothing else. End of test.',
    scale: 0.5,
    width: 400,
    height: 400,
    colors: ['#375E97', '#FB6542', '#FFBB00', '#3F681C'],
    font: 'Tahoma',
    use_stopwords: true,
    language: 'en',
    uppercase: false
  },
  json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});