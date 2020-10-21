1. mixins 带来了隐式依赖
2. mixins 与  mixins 之间，mixins 与组件之间容易导致命名冲突
3. 由于  mixins 是侵入式的，它改变了原组件，所以修改  mixins 等于修改原组件，随着需求的增长  mixins 将变得复杂，导致滚雪球的复杂性