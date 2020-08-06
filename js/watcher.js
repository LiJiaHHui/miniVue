class Watcher{
    constructor(vm,key,cb){
        this.vm=vm
        // data中的属性名称
        this.key= key
        // 回调函数负责更新视图
        this.cb=cb
        // Watch记录到dep的target中 然后会触发get调用addSub
        Dep.target=this
        this.oldVal=vm[key]
        //防止重复添加watcher
        Dep.target=null
    }
    // 数据变化时更新视图
    update(){
        let newVal=this.vm[this.key]
        if(this.oldVal===newVal){
            return
        }
        this.cb(newVal)
    }
}