const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mailer = require('nodemailer');

const app = express();

// MIDDLEWARE
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"' +
	':status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// req body middleware
app.use(bodyParser.urlencoded({ extended: false }));

// APIs

const pg = require('pg');
var pgClient = new pg.Client({
	user: 'matthewpengelly',
	password: 'postgres',
	database: 'mydb',
	host: 'localhost',
	port: 5432
});

// Projects API
// GET list of projects
app.get('/api/projects', (req, res) => {
	pgClient.connect((err) => {
		if (err) {
			res.status(500);
			throw err;
		}

		pgClient.query('SELECT * FROM projects', (err, result) => {
			if (err) {
				res.status(500);
				throw err;
			}

			// disconnect
			pgClient.end((err) => {
				if (err) {
					throw err;
				}
				res.status(200);
				if(result && result.rows) {
					res.send(result.rows);
				} else {
					res.send('no projects in the database');
				}
			});
		});
	});
});

// CREATE new project
app.post('/api/projects', (req, res) => {
	// authenticate?
	pgClient.connect((err) => {
		if (err) {
			res.status(500);
			throw err;
		}

		const querystring = `INSERT INTO projects VALUES ('${req.query.title}', '${req.query.description}')`;
		pgClient.query(querystring, (err, result) => {
			if (err) {
				res.status(500);
				throw err;
			}

			// disconnect
			pgClient.end((err) => {
				if (err) {
					throw err;
				}

				console.log(result.rows);
				res.status(200);
				res.send(result.rows);
			});
		});
	});
});

// Mailer
const transporter = mailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'gmail.user@gmail.com',
		pass: 'yourpass'
	}
});

app.post('/api/send-mail', (req, res) => {
	// setup email data with unicode symbols
	const mailOptions = {
		from: '"Burna" <burner@gmail.com>', // sender address
		to: 'pengelly.mat@gmail.com',
		subject: `Hello from: ${req.body.email}`,
		text: `${req.body.name} has sent you: ${req.body.message}`
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
	});
	res.status(200);
	res.send('email sent');
});

// REACT
// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
