const express = require('express');
const app = express();
const cors = require('cors')
const port = 5000;

app.use(cors());
const news = require('./news.json');
const category = require('./categories.json');

app.get('/', (req, res) => {
    res.send('server is running in port 5000')
})

app.get('/news', (req, res) => {
    // console.log(app)
    res.send(news)
})

app.get('/news/:id', (req, res) => {
    const id = req.params.id;
    const allNews = news.find(n => n._id === id);
    res.send(allNews)

})

app.get('/category', (req, res) => {
    res.send(category);
})
app.listen(port, () => {
    console.log(`port running on ${port}`);
})