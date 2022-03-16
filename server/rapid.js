// From Rapid API
const options = {
  method: 'GET',
  url: 'https://job-search4.p.rapidapi.com/monster/search',
  params: { query: 'Software Engineer', state: 'CA', page: '1' },
  headers: {
    'x-rapidapi-host': 'job-search4.p.rapidapi.com',
    'x-rapidapi-key': '3900315a03msh16f7ce929516f14p1ce54djsn15145610ca19',
  },
};

// fetch('/rapid')

// app.use(express.static('../client'));

app.get('/rapid', (req, res) => {
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  res.status(200);
});
