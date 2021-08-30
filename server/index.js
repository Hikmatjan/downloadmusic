const express = require('express');
const path = require('path');
const cors = require('cors');
const routerSingleFile = require('./routes/routers');

const app = express();

// mongodbga ulanish
require('./database/database')();

app.use(express.json());
app.use(cors());
// vazifasi /uploads shu manizlga so'rov kelgan payt uploads papkasi ichidagi malumotlarni foydalanuvchiga ko'rsatish uchun ishlatilinadi
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// route ni ishlatib yuborish
app.use('/api', routerSingleFile);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on URL: http://localhost:${port}`);
})