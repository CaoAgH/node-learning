const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js')

const app = express();

app.use('/static', express.static('./public'));

app.engine('html', require('express-art-template'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

app.listen(3000, () => {
    console.log('running on port 3000....');
})
router(app);





