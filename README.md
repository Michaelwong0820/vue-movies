# vue-movie

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

api文档:https://composition-api.vuejs.org/zh/api.html#setup

### vue3.x与vue2.x生命周期的差异

<!-- <img src="/Users/wangmq/Documents/md笔记/images/vue3.0生命周期.png" alt="vue3.0生命周期" style="zoom:50%;" />
 -->
https://www.shangmayuan.com/a/194a4343f12845858b1ba4b3.html

#### setup() 的作用 : 

1.介于created()与beforeCreate() 之间 , 所用需要操作的数据和方法都在里面定义 , 最后使用return 返回

语法 : 

​	

```js
 setup() {
        onMounted(() => {
            console.log('======onMounted=========')
        })
        const state = reactive({
            msg1: '我是msg1',
            num: 1,
            trebleNum: computed(() => state.num * 3)
        })
        const msg2 = ref('我是msg2')

        const changemsg2 = () => {
            msg2.value = '我是改变的msg2'
            state.msg1 = '我是改变的msg1'
        }
        const add = () => {
            state.num++
        }
        const doubleNum = computed(() => {
            return state.num * 2
        })
        watch(() => state.num, (newval, oldval) => {
            console.log(newval)
            console.log(oldval)
        })
        onUnmounted(() => {
            console.log('====onUnmounted====')
        })
        return {
            ...toRefs(state),
            msg2,
            changemsg2,
            add,
            doubleNum
        }
    }
```

**注意点: 所有的内部方法都需要导入**

```js
import {

​    reactive,

​    ref,

​    toRefs,

​    computed,

​    watch,

​    onMounted,

​    onUnmounted

} from '@vue/composition-api'
```

**reactive**  : 与2.0的data 作用相似 , 将数据定义在 **构造对象** 内 , 返回时使用toRefs(state) 将数据变为双向数据格式

**ref** : 同样是定义数据 , 返回是直接将定义的变量名返回 , 已经是双向数据绑定 , 无需使用toRefs() , 在修改数据时 , 修改变量的value值 , 

如 : num.value = 1 , 直接修改num 无效

#### computed和watch的使用

作用 : 与2.x一致

使用语法: 

```js
const state = reactive({
            num: 1,
            trebleNum: computed(() => state.num * 3)
 })
const doubleNum = computed(() => {
            return state.num * 2
 })
watch(() => state.num, (newval, oldval) => {
            console.log(newval)
            console.log(oldval)
 })
```

#### 组件间传值

##### 1 . 父组件传值给子组件

​	方式1 : 在父组件的子组件中定义传值的参数 , 子组件中props接受值 , setup(props) 的 props 中获取传过来的值 , 赋值给子组件

​	注 : 必须使用props接受传过来的值 , 否则 setup的 props参数无法获取

​	方式2 : 使用[provide / inject](https://cn.vuejs.org/v2/api/#provide-inject) 实现父组件传值给子组件 (使用方法参考文档)

​	好处 : 父组件传值 , 子孙组件都可以使用inject 接收到值

```js
  <!-- 父组件 -->
   import { provide } from '@vue/composition-api'
	setup() {
    provide('msg','我是传值的父组件')
  }

	<!-- 子组件 -->
    import {reactive, inject } from '@vue/composition-api'
	setup() {
    const state = reactive({
      msg1 : inject(msg) // 我是传值的父组件
    })
  }
```

#### vue3.0 项目搭建

1. vue create vue-movie
2. Vue add vue-next
