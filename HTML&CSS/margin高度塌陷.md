## margin塌陷：父子元素都有margin的设置时，子元素应该相对于父元素进行定位，此时没有相对于父元素进行定位，造成了margin塌陷
> 弥补方法：触发bfc，使用下面4种方式触发bfc  
position:absolute;  
display:inline-block;  
float:left/right;  
overflow:hidden;  

## BFC 跨级格式化上下文

## 清除浮动
1. 最后添加一个div clear:both;
2. 父级添加overflow:hidden方法：触发bfc
3. after伪元素清除浮动
4. 使用before和after双伪元素清除浮动