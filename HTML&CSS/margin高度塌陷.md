## margin塌陷：父子元素都有margin的设置时，子元素应该相对于父元素进行定位，此时没有相对于父元素进行定位，造成了margin塌陷
> 弥补方法：触发bfc，使用下面4种方式触发bfc  
position:absolute;  
display:inline-block;  
float:left/right;  
overflow:hidden;  

## BFC 跨级格式化上下文