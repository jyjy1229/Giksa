var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));
app.use(cors())

var User = require('./models/user');
var Post = require('./models/post');

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/dorm_change');

app.get('/login',function(req,res){
	res.status(200)
    res.end()
});

app.post('/login', function(req, res){
    var userid = req.body.user.userid
    var userpwd = crypto.scryptSync(req.body.user.password, 'salt', 32)

    User.find({ id: userid }, function(err, user){
    	if(err){
    		return res.status(500).sent({error: 'database failure'});
    	}
    	if(user == ""){
    		res.json({
	    		id_correct: false,
	    		pwd_correct: false
    		})
    	}
    	else{
    		User.find({ id: userid, password: userpwd }, function(err, user){
		       	if(err){
		       		return res.status(500).sent({error: 'database failure'});
		       	}
		       	if(user == ""){
		    		res.json({
			    		id_correct: true,
			    		pwd_correct: false
		    		})
		       	}
		       	else{
		       		res.json({
			    		id_correct: true,
			    		pwd_correct: true
		    		})
		       	}
		    })
    	}
    });
});

app.get('/logout', function(req, res){
    res.status(200)
    res.end()
})

app.post('/user', function(req, res){
	console.log(req.body.success)
	User.findOne({ id: req.body.userid }, function(err, user){
		var posts = new Array()
		if(err){
			return res.status(500).sent({error: 'database failure'})
		}
		if(!req.body.success){
			res.json({
				posts: posts
			})
		}
		else{
			Post.find({ postid: user.postid }, function(err, posts){
				if(err)	return res.status(500).sent({error: 'database failure'})
				res.json({
					user: user,
					posts: posts
				})
			})
		}
	})
})

app.post('/set', function(req, res){
	User.findOne({id: req.body.userid}, function(err, user){
		if(err)	return res.status(500).sent({error: 'database failure'})
		user.mydorm = req.body.mydorm
		user.save(function(err){
			if(err)	res.status(500).json({error: 'database failure'})
				else{
					res.json({
						user: user
					})
			}
		})
	})
})

app.get('/signup', function(req, res) {
    res.status(200)
    res.end()
})

app.post('/signup', function(req, res) {
    var newuser = new User()
    newuser.id = req.body.user.userid
    newuser.password = crypto.scryptSync(req.body.user.password, 'salt', 32)
    newuser.name = req.body.user.name
    newuser.signup_date = new Date()

    if(newuser.id == "" || newuser.password == "" || newuser.name == ""){
    	res.json({
    		require: true,
			id_exist: false,
			pwd_len: false
    	})
    }
    else{
    	User.find({ id: req.body.user.userid }, function(err, user){
			if(err){
				return res.status(500).sent({error: 'database failure'});
			}
			if(user != ""){
				res.json({
					require: false,
					id_exist: false,
					pwd_len: false
				})
			}
			else if(Object.keys(req.body.user.password).length < 8 || Object.keys(req.body.user.password).length > 17){
				res.json({
					require: false,
					id_exist: true,
					pwd_len: false
				})
			}
			else{
				newuser.save(function(err){
				    if(err){
				    	return	console.error(err);
				    }
				    else{
				    	res.json({
							require: false,
							id_exist: true,
							pwd_len: true
						})
				    }
				    
			   	})
			}
		})
    }
})

app.get('/exchangelist', function(req, res){    
	Post.find(function(err, posts){
		if(err) return res.status(500).sent({error: 'database failure'});
		res.json({
			postinfo: posts
		})
	})

})

app.post('/getdorm', function(req, res){
	console.log(req.body.userid)
	User.findOne({id: req.body.userid}, function(err, user){
		if(err)	return res.status(500).sent({error: 'database failure'})
		res.json({
			mydorm: user.mydorm
		})
	})
})

app.post('/post', function(req, res){
	var newpost = new Post()
	console.log(req.body.post.dorm_from)
	Post.find(function(err, posts){
		var postnum = Object.keys(posts).length
		if(postnum == 0){
			newpost.postid = 1
		}
		else{
			newpost.postid = posts[postnum-1].postid + 1
		}
	    newpost.postuser = req.body.user
	    newpost.dorm_from = req.body.post.dorm_from
	    newpost.dorm_to = req.body.post.dorm_to
	    newpost.num_people = req.body.post.num_people

	    if(newpost.dorm_from == "" || newpost.dorm_to == "" || newpost.num_people == ""){
	    	res.json({
				require: false,
				numispos: true
			})
	    }
	    else if(newpost.num_people <= 0){
	    	res.json({
	    		require: true,
	    		numispos: false
	    	})
	    }
	    else{
	    	newpost.save(function(err){
		    	if(err){
					return	console.error(err);
				}
				User.findOne({ id: req.body.user }, function(err, user){
					user.postid.push(newpost.postid)
					user.save(function(err){
						if(err)	res.status(500).json({error: 'database failure'})
						else{
							res.json({
								require: true,
								numispos: true
							})
						}
					})
				})
			})
	    }
	})
})

app.post('/comment', function(req, res){
	var commentpostnum = req.body.rowpostnum
	console.log(req.body.comment)
	Post.findOne({postid: commentpostnum}, function(err, post){
		post.comments.push([req.body.userid, req.body.comment])
		post.save(function(err){
			if(err) res.status(500).json({error: 'database failure'})
			Post.find(function(err, posts){
				if(err) return res.status(500).sent({error: 'database failure'});
				res.json({
					postinfo: posts
				})
			})
		})
	})
})

app.post('/like', function(req, res){
	var likepostnum = req.body.rowpostnum
	var userid = req.body.user
	console.log(likepostnum)
	Post.findOne({ postid: likepostnum }, function(err, post){
		var check = true
		for(var i=0;i<Object.keys(post.likes).length;i++){
			if(post.likes[i] == userid){
				res.json({
					id_exist: true
				})
				console.log(post.likes[i])
				check = false
				break
			}	
		}
		console.log(check)
		
		if(check){
			post.likes.push(userid)
			post.likenum = post.likenum + 1
			post.save(function(err){
				if(err) res.status(500).json({error: 'database failure'})
				else{
					res.json({
						id_exist: false
					})
				}
			})
		}
	})
})

var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
	console.log("Express server has started on port " + port)
});