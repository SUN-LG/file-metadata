const express = require('express')
const multer = require('multer')
const fs = require('fs')
const router = express.Router()

const upload = multer({dest: 'uploads/'})

router.post('/fileanalyse', upload.single('uploadFile'), (req, res, next) => {
  const uploadFile = req.file
  const fileSize = uploadFile.size + ''
  const filePath = uploadFile.path

  fs.unlink(filePath, (err) => {
    if (err) return console.log(err);
  })
  res.send(fileSize)
})

module.exports = router;
