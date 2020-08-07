class Compiler {
    constructor (vm) {
        this.el = vm.$el
        this.vm = vm
        this.Compiler(this.el)
    }
    // 编译模板，处理文本、元素节点,遍历所有节点
    Compiler (el){
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node =>{
            if(this.isTextNode(node)){
                this.CompilerText(node)
            }else if(this.isElementNode(node)){
                this.CompilerElement(node)
            }
        // 判断是否有子节点
        if(node.childNodes && node.childNodes.length){
            this.Compiler(node)
        }
        })
    }
    CompilerElement(node){
        // 伪数组转换为数组,遍历所有属性节点
        Array.from(node.attributes).forEach(attr =>{
            let attrName = attr.name
            if(this.isDirective(attrName)){
                attrName=attrName.substr(2)
                let key=attr.value
                this.update(node,key,attrName)
            }
        })
    }
    update(node,key,attrName){
        let updateFn = this[attrName + 'Updater']
        // 指向compiler对象
        updateFn && updateFn.call(this,node,this.vm[key],key)
    }
    textUpdater(node,val,key){
        node.textContent = val
        new Watcher(this.vm,key,(newVal)=>{
            node.textContent=newVal
        })
    }
    modelUpdater(node,val,key){
        // 此处node为表单元素
        node.value = val
        new Watcher(this.vm,key,(newVal)=>{
            node.value = newVal
        })
        // 双向绑定
        node.addEventListener('input',() =>{
             this.vm[key] = node.value
        })
    }

    // 插值表达式,正则匹配
    CompilerText(node){
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if(reg.test(value)){
            let key = RegExp.$1.trim()
            // 将文本节点中的插值表达式替换成属性对应的值，重新赋给文本节点，即将msg替换为hi
            node.textContent = value.replace(reg,this.vm[key])
            // 创建watcher，回调函数中当数据改变更新视图
            new Watcher(this.vm, key, (newVal) => {
                node.textContent = newVal
            })
        }
    }
    // 判断元素属性是否为指令，即属性的名字是否以v-开头
    isDirective (attrName){
        return attrName.startsWith('v-')
    }
    isTextNode(node){
        return node.nodeType === 3
    }
    isElementNode(node){
         return node.nodeType === 1
    }
}