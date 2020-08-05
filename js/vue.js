class Vue {
    constructor (options) {
        // 利用属性保存数据
        this.$options = options || {}
        this.$data = options.data || {}
        // 传入字符串则为选择器，或是一个dom对象
        this.$el = typeof options.el ==='string' ? document.querySelector(options.el) : options.el
        // data中的成员转换为getter和setter，注入到vue实例，this指向vue实例
        this._proxyData(this.$data)
        // 监听数据变化
        new Observer(this.$data)
    }
    // 代理data中的属性
    _proxyData (data) {
        // 获取data中的所有属性，返回一个数组
        Object.keys(data).forEach(key => {
            Object.defineProperty(this,key,{
                enumerable: true,
                configurable: true,
                get () {
                    return data[key]
                },
                set (newValue) {
                    // 判断值是否相同，若相同直接返回
                    if(newValue === data[key]){
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }
}