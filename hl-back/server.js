const express =require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');


knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : '',
    database : 'myapp_test'
  }
});

const app=express();

app.use(bodyParser.json());
app.use(cors());

const database={
	users:[
		{
			id:'123',
			name:'john',
			email:'john@gmail.com',
			password:'cookies',
			entries:0,
			joined:new Date()
		},
		{
			id:'124',
			name:'sally',
			email:'sally@gmail.com',
			password:'bananas',
			entries:0,
			joined:new Date()
		}
	],
	login:[
		{
			id:'987',
			hash:'',
			email:'john@gmail.com'
		}
	]
}

app.get('/',(req,res)=>{
	res.send(database.users);
})

app.post('/signin',(req,res)=>{
	// Load hash from your password DB.
	bcrypt.compare("apples", '$2a$10$94TIcI7i1iS/6F.hstc9QOYPf9n7WEadPOAVDoDogXcUNIs5RaYYi', function(err, res) {
	    console.log(res);
	});
	bcrypt.compare("veggies", '$2a$10$94TIcI7i1iS/6F.hstc9QOYPf9n7WEadPOAVDoDogXcUNIs5RaYYi', function(err, res) {
	    console.log(res);
	});
	if(req.body.email===database.users[0].email &&
		req.body.password===database.users[0].password){
		res.json(database.users[0]);
	}
	else
	{
		res.status(400).json('wrong id/password');
	}
})

app.post('/register',(req,res)=>{
	const {email,password,name} =req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
		console.log(hash);
    // Store hash in your password DB.
	});

	database.users.push({
		id:'125',
		name:name,
		email:email,
		entries:0,
		joined:new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id',(req,res)=>{
	const {id}=req.params;
	let found=false;
	database.users.forEach(user=>{
		if(user.id===id){
			found=true;
			return res.json(user);
		}
	})
	if(found==false)
	{
		res.status(400).json('no such user');
	}
})

app.put('/image',(req,res)=>{
	const {id}=req.body;
	let found=false;
	database.users.forEach(user=>{
		if(user.id===id){
			found=true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if(found==false)
	{
		res.status(400).json('no such user');
	}
})


app.listen(3000,()=>{
	console.log('hellooo');
})	