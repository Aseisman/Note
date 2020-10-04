const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("你好express")
})
app.get("/article", (req, res) => {
    res.send("新闻界面")
})
app.post("/doLogin", (req, res) => {
    res.send("执行登录")
})
app.put("/editUser", (req, res) => {
    res.send("修改用户")
})
app.delete("/deleteUser", (req, res) => {
    res.send("删除用户")
});
//动态路由:注意顺序，如果/article/:id在/article/add前面，则不会访问/article/add
app.get("/article/:id", (req, res) => {
    var id = req.params["id"]
    res.send("动态路由" + id)
})

//get请求
app.get("/product", (req, res) => {
    query = req.query;
    console.log(query);
    res.send("product");
})
app.listen(3000)