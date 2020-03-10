# 为了防止刚有一知半解的Markdown语法忘记，所以可能每天都是来这里记上一笔

`今天接触的新东西`

## art-template 模板引擎在node.js中的使用

###模板引擎不关心内容，只会处理{{}}中的表达式

-  安装并引入模块
 ```javascript
npm install art-template -D
let template = require('template');
```
- 服务端渲染页面
```javascript
template.render(string,obj);
//@string 含有模板语法的字符串
//@obj 模板语法中表达式的值
```
- 模板语法----列表
```html
{{each array}}
...........
{{$value}}
.........
{{/each}}
```
- 模板语法----条件
```html
{{if value}}......{{if}}
{{if value}}......{{else if value}}.......{{/if}}
```

> 总而言之本质上是插值表达式，类似于接触过的Vue，但是又有点像标签语言
