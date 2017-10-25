let express = require('express');
let app = express();
let PORT = process.env.PORT;
require('./routes/routes')(app);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});