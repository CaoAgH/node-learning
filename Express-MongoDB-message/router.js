const express = require('express');
const Message = require('./data');
const tools = require('./tools');

const router = express.Router();

const title = '留言板';
const author = 'From cyq';


router.get('/', (req, res) => {
    Message.getAll((err, data) => {
        if (err) return res.status(500).send('Server error')
        res.render('message.html', {
            message: tools.formatTime(data),
            title: title,
            author: author
        })
    })
});

router.get('/post', (req, res) => {
    res.render('post.html');
})


//post版本
router.post('/submit', (req, res) => {
    Message.insertOne(req.body,(err)=>{
        if(err) return res.status(500).send('Server error')
        res.redirect('/');
    })
})

module.exports = router;

