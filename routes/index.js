var express = require('express');
var router = express.Router();

const { v4: uuidv4 } = require('uuid');

const tasks=[
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { tasks:tasks });
});

/* POST /save page. */
router.post('/save', function(req, res, next) {
  // let title=req.title;
  // let description=req.description;
  let {title,description}=req.body;
  let newTask={
    id:uuidv4(),
    createdAt:new Date(),
    title,
    description
  }
  tasks.push(newTask);
  res.redirect('/');
});

/* GET /more/:id page. */
router.get('/more/:id', function(req, res, next) {
  var filteredTasks=tasks.filter(function(task){
    return task.id===req.params.id;
  });

  res.render('more', { task:filteredTasks[0] });
});

/* POST /update/:id page. */
router.post('/update/:id', function(req, res, next) {
  const {id}=req.params;
  const idx=tasks.findIndex(function(task){
    return id===task.id;
  })
  tasks[idx]={...tasks[idx],...req.body};
  res.redirect('/');
});

router.get('/delete/:id', function(req, res, next) {
  const {id}=req.params;
  const idx=tasks.findIndex(function(task){
    return id===task.id;
  })
  tasks.splice(idx,1);
  res.redirect('/');
});
module.exports = router;
