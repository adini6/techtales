const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

