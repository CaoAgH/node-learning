const express = require('express');

const Student = require('./mongo_data')

//使用express提供的路由函数
//1.引入express模块
//2.创建路由容器
const router = express.Router();
//3.把路由处理函数挂载到路由容器中
router.get('/', (req, res) => {
    Student.get_columns((err, data) => {
        if (err) return res.status(500).send('Server Error');
        res.render('curd.html', {
            title: '管理系统',
            student: data
        });
    })
});

router.get('/add', (req, res) => {
    res.render('add.html');
});
router.post('/addition', (req, res) => {
    Student.add_column(req.body, (err) => {
        if (err) return res.status(500).send('Server Error');
        res.redirect('/')
    })
})

router.get('/change', (req, res) => {
    if ('key' in req.query) {
        Student.lock(req.query.key, (err, the_student) => {
            if (err) return res.status(500).send('Server Error');
            res.render('change.html', {
                name: the_student[0].name,
                id: the_student[0].id,
                sex: the_student[0].sex,
                grade: the_student[0].grade,
                subject: the_student[0].subject,
                key: the_student[0]._id
            })
        });
    } else {
        res.render('404.html');
    }
})
router.post('/save_change', (req, res) => {
    Student.change(req.body, (err) => {
        if (err) return res.status(500).send('Server Error')
        res.redirect('/')
    })
})

router.get('/delete', (req, res) => {
    let temp;
    if ('key' in req.query) {
        Student.delete(req.query.key, (err) => {
            if (err) return res.status(500).send('Server Error');
            res.redirect('/')
        });
    } else {
        res.render('404.html');
    }
})

router.get('/search', (req, res) => {
    if ('keywords' in req.query) {
        Student.search(req.query.keywords,(err,matched)=>{
           if(err) return res.status(500).send('Server Error');
            res.render('curd.html', {
                student: matched
            })
        })
    } else {
        res.render('404.html')
    }
})
// 4.导出路由容器router
module.exports = router;


