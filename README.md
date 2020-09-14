# miniVue
使用JS实现的一个响应式框架。

通过 Observer 把数据转换成响应式数据，
通过 Dep 收集依赖，发送通知，
通过 Watcher 监听数据的变化更新视图，
通过 Compiler 解析每个元素中的指令以及差值表达式，并替换成相应数据。
