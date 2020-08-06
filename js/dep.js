class Dep{
    constructor(){
        // 存储依赖数据的所有观察者watcher
        this.subs=[]
    }
    // 添加watcher
    addSub(sub){
        if(sub && sub.update){
            this.subs.push(sub)
        }
    }
    // 通知watcher
    notify(){
        this.subs.forEach(sub =>{
            sub.update()
        })
    }
}