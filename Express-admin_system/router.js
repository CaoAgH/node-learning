const fs = require('fs');
let database;

fs.readFile('./database/data.txt', 'utf8', (err, data) => {
    if (err) throw err;
    database = JSON.parse(data);
})

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.render('curd.html', {
            title: '管理系统',
            student: database
        });
    });

    app.get('/add', (req, res) => {
        res.render('add.html');
    });
    app.post('/addition', (req, res) => {
        req.body.key = database[0].key * 1 + 1;
        database.unshift(req.body);
        save_data();
        res.redirect('/')
    })

    app.get('/change', (req, res) => {
        if ('key' in req.query) {
            let changes = database.filter(function (el) {
                if (el.key * 1 === req.query.key * 1) return true;
                return false;
            });
            res.render('change.html', {
                name: changes[0].name,
                id: changes[0].id,
                sex: changes[0].sex,
                grade: changes[0].grade,
                subject: changes[0].subject,
                key: changes[0].key
            })
        } else {
            res.render('404.html');
        }
    })
    app.post('/save_change', (req, res) => {
        database.forEach((el, index, array) => {
            if (el.key * 1 === req.body.key * 1) {
                array[index] = req.body;
            }
        })
        save_data();
        res.redirect('/')
    })

    app.get('/delete', (req, res) => {
        let temp;
        if ('key' in req.query) {
            temp = database.filter((el) => {
                if (el.key * 1 !== req.query.key * 1) return true;
                return false;
            })
            database = temp;
            save_data();
            res.redirect('/')
        } else {
            res.render('404.html')
        }
    })

    app.get('/search', (req, res) => {
        if ('keywords' in req.query) {
            let keywords = req.query.keywords;
            let data_with_keywords = database.filter((el) => {
                for (let attr in el) {
                    if(attr !== 'key'){
                        if (el[attr].indexOf(keywords)!=-1) {
                            return true;
                        }
                    }
                }
                return false;
            })
            res.render('curd.html', {
                student: data_with_keywords
            })
        } else {
            res.render('404.html')
        }
    })
}

function save_data() {
    let data = JSON.stringify(database);
    fs.writeFile('./database/data.txt', data, (err) => {
        if (err) throw err;
        console.log('saved');
    })
}


