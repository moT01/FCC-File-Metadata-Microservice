//Dependencies
var multer = require('multer');
var fs = require('fs');
require('dotenv').config();

module.exports = function(app) {
	
	//redirects to 'index.html' when no parameter is givin
	app.get('/', function(req,res) {
		console.log("Redirected to 'index.html'");
		return res.render('index');		
	}); //end app.get


	app.post('/', multer({ dest: 'uploads'}).single('photo'), function(req,res){
		console.log(req.file); //form files

		res.json({
			'originalName': req.file.originalname,
			'newName': req.file.filename,
			'size': req.file.size + ' bytes'
		});
		
		fs.unlink('uploads/'+req.file.filename, (err) => {
		  if (err) throw err;
		  console.log('successfully deleted ' + req.file.filename);
		});

		return res.status(204).end();
	});
}; //end module.exports
