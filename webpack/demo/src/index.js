// require("./index.css")

const quark = require('quarkhttp');
const app = quark();
app.get('/', (req, res) => res.send('hello world'))
app.listen(3000, () => {
    console.log('Server running on 3000');
});
//plugin把我html里面的css和js弄出来