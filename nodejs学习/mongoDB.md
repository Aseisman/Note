### mongodb数据库增删改查
- 假设数据库名称为itying  
- nosql集合-->mysql表
---
---
### 创表：

1. 使用数据库：  
`use itying`
---
2. 创建 or 插入 一个集合user：   
`use itying`   
`db.user.insert({"username":"张三",'age':23})`  
这样子便是在itying数据库里面创建了一个集合user.
---
3. 查看所有数据库：  
`show dbs`；  
默认有三个数据库：admin,local,config，不动它。
---
4. 查看itying数据库的表（集合）：  
`use itying`  
`show collections `
---
5. 删除user表（集合）：  
`use itying`  
`db.user.drop() `
---
6. 删除数据库：  
`use itying`  
`db.dropDatabase()`
---
---
### 查询：

7. 查询user集合数据:  
`use itying`  
`db.user.find()`
---
8. 查询user集合的指定数据：  
`use itying`  
`db.user.find({"age":23})`  
查找age为13的数据。
`db.user.find({"age":23,"name":"wangwu"})`  
查找age为13 name为wangwu的数据。
---
9. 查询age>22的记录:  
`use itying`  
`db.user.find({"age":{$gt:22}})`
10. 查询age<22的记录
`use itying`  
`db.user.find({"age":{$lt:22}})`
11. 查询age>=23的记录：
`use itying`  
`db.user.find({"age":{$gte:23}})`
12. 查询age<=23的记录：
`use itying`  
`db.user.find({"age":{$lte:23}})`
13. 查询age>=23且age<=26  
`db.user.find({"age":{$gte:23,$lte:26}})`
- gt: greater than  
lt: less than  
gte: gt equal  
lte: lt equal  
---
14. 查询name中包含mongo的数据：
`db.user.find({name:/mongo/})`
15. 查询name中以mongo开头的：
`db.user.find({name:/^mongo/})`
16. 查询name中以mongo结尾的：
`db.user.find({name:/mongo$/})`
---
17. 显示指定列的数据：  
`db.user.find({},{name:1,age:1})`  
name和age都显示  
`db.user.find({age:{$gte:23}},{name:1})`  
只显示name
---
18. 按照年龄排序：1升序 -1降序  
`db.user.find().sort({age:1})`  
---
19. 查询前5条数据
`db.user.find().limit(5)` 
20. 查询10条以后的数据
`db.user.find().skip(10)`  
21. 查询10条以后的5条数据
`db.user.find().skip(10).limit(5)`  
可用于分页，limit是pageSize，skip是(pageNumber-1)*pageSize
---
22. 给某个表新增一百条数据：  
```js
for(var i=0;i<99;i++){
    db.admin.insert({'username':'zhangsan'+i})
};
```
---
23. 统计数量：  
`db.user.find().count()`  
查看表有多少条数据  
`db.user.find({"age":{$gte:23}}).count()`  
查看大于23的有多少条数据
---
24. or查询：查询年龄是22或者25的：  
`db.user.find({$or:[{age:22},{age:25}]}) `
---
---
### 修改数据：
1. 修改student表中小明的年龄：  
`db.student.update({"name":'小明'},{$set:{"age":23}})`
2. 增加student表中小明的性别：
`db.student.update({"name":'小明'},{$set:{"sex":'男'}})`
3. 不写$set会直接把后面的一项覆盖掉原来的数据
4. 批量修改：假设age=13的有两条数据，把这两条数据都加sex
`db.student.update({"age":'13'},{$set:{"sex":"男"}},{multi:true})`
---
---
### 删除数据：
1. 删除一条数据：  
`db.user.remove({"name":"王五"})`    
`db.user.remove({"age":{$gt:30}},{justOne:true})`    
2. 删除多条数据：
`db.user.remove({"age":{$gt:30}})`
---
---
### 索引:优化查询数据
1. 创建索引：  
`db.user.ensureIndex({"username":1})`  
1升序 -1降序
2. 获取当前集合的索引：`db.user.getIndexes()`
3. 删除索引的命令：`db.user.dropIndex({"username"：1})`
4. 复合索引：  
   `db.user.ensureIndex({"username":1,"age":1})`  
    - 注意：当复合索引创建好后，只输入username，或两个都输入，都会通过索引快速查找；而只输入age则不会通过索引查找。
5. 唯一索引：设置唯一索引age后,age不能重复
`db.user.ensureIndex({'age':1},{'unique':true})`
---
---

### 账户权限配置：
1. 创建超级管理用户
```SQL
use admin

db.createUser({
    user:'admin',
    pwd:'123456',
    roles:[{role:'root',db:'admin'}]
})
# roles中 role是角色，表示全局角色
```
2. 修改mongodb数据库配置文件mongod.cfg
```sql
# 找到bin路径中的mongod.cfg
# security 进行修改
security
  authorizatuon:enabled
# 表示开启认证用户
```
3. 重新启动mongodb。
```sql
# window+R services.msc 找到mongoDB Server 然后重启
```
4. 用超级管理员连接数据库
```sql
mongo admin -u admin -p 123456
mongo 192.168.1.123:8080/test -u user -p password
```
5. 给某个数据库创建一个用户，只能访问eggcms不能访问其他数据库
```sql
use eggcms
db.createUser({
    user:'eggadmin',
    pwd:'123456',
    roles:[{role:'dbOwner',db:'eggcms'}]
})

use eggcms
show users
mongo eggcms -u eggadmin -p 123456
show dbs
show collections
```

6. 连接数据库时写法：
```js
const url='mongodb://admin:123456@localhost:27017/';
```
---
---
## MongoDB聚合管道：对集合中的数据进行变换组合。
- 表的关联查询和数据统计

管道操作符| 解释
- | -
$project|增加、删除、重命名字段
$match|条件匹配
$limit|限制结果数量
$skip|跳过数量
$sort|排序
$group|组合结果，统计
$lookup|引入其他集合的数据

管道表达式| 解释
-|-

---
假设有两个集合，order与order_item,代表订单与订单详情，一对多的关系；（一个订单里面有几件商品）

---
1. 查找order表中orderdb.order.find()_id为1的列表，只显示all_price这一列
```sql
db.order.find({},{"order_id":1,"all_price":1})
# 或者用管道
db.order.aggregate([
    {
        $project:{order_id:1,all_price:1}
    }
])
```

