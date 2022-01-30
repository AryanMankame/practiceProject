const express = require('express');
const app = express();
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const Clarifai = require('clarifai');
const handleFaceRecog = (req,res) => {
    console.log(req.body);
    let app = new Clarifai.App({apiKey: '9ddbb7d468ed4071974f7c8daf947e45'});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data => res.json(data));
}
const database = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 4306,
      user : 'root@localhost',
      password : 'root',
      database : 'smart-brain'
    }
  });
// const m = database.select('*').table('users').then(data =>console.log(data)).catch(err => console.log('error found : ' +  err));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.get('/:id',(req,res)=>{
    let r = database('login').where({
        id:req.params.id
    }).select('*').then(data => {console.log(data); res.json(data[0])});
})
app.post('/register',(req,res)=>{
    const {email,name,password} = req.body;
    console.log(req.body);
    var hash = bcrypt.hashSync(password);
    console.log(hash);
    database('users').insert({
        email:email,
        name:name,
        joined: new Date()
    }).then(console.log).catch(err => console.log('some errors : ',err));
    database('login').insert({
        email,
        hash
    }).then(console.log).catch(err => console.log('some errors : ',err));
    res.json('register is also doing its work');
})
app.post('/signup',(req,res)=>{
    //var hash = bcrypt.hashSync(req.body.password);
    console.log(req.body.password);
    database('login').where({
        email:req.body.email,
    }).select('*').then(data => {
        var hash = ''
        if(data!=[])
        hash = data[0].hash;
        let result = bcrypt.compareSync(req.body.password, hash);
        if(result){
            res.json(data[0]);
            return ;
        }
        else{
            res.status(404).json('cant signin');
            return ;
        }
    });
    
    
})
app.put('/image',(req,res)=>{
    
})
app.post('/image',(req,res) => {
    handleFaceRecog(req,res);
})
app.get('/signup',(req,res)=>{
    res.send('Running smartBrain server');
})
app.listen(process.env.PORT || 3000);
