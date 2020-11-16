1. 字体图标或者SVG图标
2. 图片懒加载 onscroll-->IntersectionObserver(callback,options)
3. 能用css的就不用js，比如偏移，我们可以用transform，这个只会触发我们的重绘，而不会重排。如果是position就会
4. 1千个div的显示问题：文档碎片documentFragment  createDocumentFragment->frag.appendChild->dom.appendChild(frag)
5. script脚本用async和defer （CRP）

6. 尾递归调用
7. 节流防抖

8. 模块懒加载。路由懒加载，按需加载vite（没用过），vue还有keep-alive等等

9. 预加载（没用过）