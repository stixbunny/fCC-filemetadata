const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const upload = multer().single("upfile");
require('dotenv').config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

app.post("/api/fileanalyse", (req, res) => {
  upload(req, res, (err) => {
    if (err) return console.error(err);
    const result = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    }
    res.json(result);
  })
});
