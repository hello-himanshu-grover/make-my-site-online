const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express()
const port = 3000

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'user1/'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Unique filename
    },
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    if (req.subdomains[0]) {
        return res.sendFile(path.join(__dirname, req.subdomains[0] + '/index.html'));
    }
    return res.sendFile(path.join(__dirname, '/index.html'));
})


app.post('/upload', upload.array('files'), (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    const filenames = files.map(file => file.originalname);
    res.send({ message: `Files ${filenames.join(', ')} uploaded successfully.` });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})