var express = require('express');
var router = express.Router();
const Post = require('../model/post')

const headers = {
	'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
	'Content-Type': 'application/json'
}


router.get('/', async function(req, res, next) {
	const getPost = await Post.find()
	res.writeHead(200,headers);
	res.write(JSON.stringify({
			status: "success",
			data: getPost,
	}));
	res.end();
})
router.post('/', async function(req, res, next) {
	try {
		const postPost = await Post.create(req.body)
		res.writeHead(200, headers)
		res.write(JSON.stringify({
			status: "success",
			data: postPost,
		}));
		res.end();
	} catch (error) {
		res.writeHead(400, headers);
		res.write({
			status: 'error',
			message: err
		})
		res.end()
	}
})

router.patch('/:id', async function(req, res, next) {
	try {
		const { id } = req.params;
		const data = req.body;
		const editPost = {
			name: data.name,
			content: data.content,
			image: data.image,
			likes: data.likes
		}
		const thePost = await Post.findByIdAndUpdate(id, editPost, { new: true });
		res.writeHead(200, headers);
		res.write(JSON.stringify({
			status: 'success',
			data: thePost
		}));
		res.end();
		} catch(err) {
			res.writeHead(400, headers);
      res.write({
        status: 'error',
        message: err
      })
      res.end()
		}
})

router.delete('/:id', async function(req, res, next){
	try{
		const id = req.params.id
		let deletePostRes = await Post.findByIdAndDelete(id);
      res.write(JSON.stringify({
        status: 'success',
        data: deletePostRes
      }))
      res.end();
	} catch(err) {
		res.writeHead(400, headers);
      res.write({
        status: 'error',
        message: err
      })
      res.end()
	}
})

module.exports = router;