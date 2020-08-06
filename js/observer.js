class Observer {
    // 类创建完对象后，将属性马上转换为getter和setter，所以在构造函数中调用walk
    constructor(data){
        this.walk(data)
    }
    // 遍历对象的所有属性
    walk (data) {
        // 判断是否为对象
        if(!data || typeof data!=='object'){
            return
        }
        // 遍历data对象的所有属性
        Object.keys(data).forEach(key=>{
            this.defineReactive(data,key,data[key])
        })
    }
    defineReactive (obj,key,val) {
        let that=this
        // 收集依赖，发送通知
        let dep=new Dep()
        // 如果val是对象，把内部的属性转换为响应式
        this.walk(val)
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get(){
                // 收集依赖
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set(newValue){
                if(newValue ===val){
                    return
                }
                val=newValue
                that.walk(newValue)
                // 发送通知
                dep.notify()
            }
        })

    }
}