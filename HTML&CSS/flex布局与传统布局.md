## 传统布局：基于盒模型，依赖display属性，position属性，float属性；
 - 不容易实现垂直居中等情况。
 ---
## flex弹性布局：
- 设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。
---
### flex容器(父元素)设置的属性:
- `flex-direction` :主轴方向
    - row（默认值 水平方向，起点左端）；
    - row-reverse（水平方向，起点右端）；
    - column(垂直，上到下) ；
    - column-reverse（垂直，下到上）
- `flex-wrap`：一行放不下，怎么换行
  - nowrap:（默认值，不换行）
  - wrap：（换行，第一行在上）
  - wrap-reverse:(换行，第一行在下)
- `flex-flow`：`flex-wrap` + `flex-direction`
  - row nowrap(默认值,水平，不换行)
- `justify-content`:子元素水平方向的排列
  - flex-start（默认值）：左对齐
  - flex-end：右对齐
  - center： 居中
  - space-between：两端对齐，项目之间的间隔都相等。
  - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
- `align-items`:子元素垂直方向的排列
  - flex-start：顶部对齐。
  - flex-end：底部对齐。
  - center：中线对齐。
  - baseline: 项目的第一行文字的底线对齐。
  - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
- `align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
  - flex-start：与交叉轴的起点对齐。
  - flex-end：与交叉轴的终点对齐。
  - center：与交叉轴的中点对齐。
  - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
  - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
  - stretch（默认值）：轴线占满整个交叉轴。
---

### flex定义在子元素的属性：
- `order`:定义项目的排列顺序。数值越小，排列越靠前，默认为0;
- flex-grow:定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
  - 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
- flex-shrink:定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
  - 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
- flex-basis:属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
- `flex`: flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
  - 该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
  - 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
- align-self:


---
http://www.ruanyifeng.com/blog/2015/07/flex-examples.html

--- 
总结：