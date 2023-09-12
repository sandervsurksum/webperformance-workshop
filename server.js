const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
    // Fake pause
    setTimeout(next, Math.floor( ( Math.random() * 1500 ) + 100 ) );

    // Add Cache control header
    res.set('Cache-control', 'public, max-age=3')
});

app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});