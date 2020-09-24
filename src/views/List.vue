<template>
  <div>
    <NavBar />
    <div class="items">
      <div class="item"
           v-for="item in list"
           :key="item.id">
        <router-link :to="'/detail/'+item.id">
          <img :src="item.images.small" />
          <span class="title">{{item.title.length > 6 ? item.title.substr(0,6)+'...' : item.title}}</span>
          <div v-if="item.rating.average==0"
               class="no-score">暂无评分</div>
          <div v-else
               class="star-box">
            <div v-for="(subitem,index) in item.startArr"
                 :key="index">
              <span v-if="subitem===1"
                    class="orange">★</span>
              <span v-else
                    class="gray">★</span>
            </div>
            {{item.rating.average}}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { provide, computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/Navbar'
import { getMovieList } from '@/api/movie'
export default {
  components: {
    NavBar,
  },
  setup() {
    const state = reactive({
      list: [],
    })
    const route = useRoute()
    const typeTitle = computed(() => {
      switch (route.params.type) {
        case 'in_theaters':
          return '正在热映'
        case 'coming_soon':
          return '准备上映'
        case 'top250':
          return 'top250'
      }
    })

    // 获取数据列表
    const getMoviesListData = async () => {
      const res = await getMovieList({
        start: 0,
        count: 10,
        type: route.params.type
      })
      // 处理数据 额外的增加一个 星星个数字段
      res.data.subjects.forEach(v => {
        // 为V增加一个字段 纯数字无法循环
        // 必须弄成数组
        // v.startNum = Math.floor(v.rating.stars/10);
        v.startArr = []
        // 计算星星个数
        const starNum = Math.floor(v.rating.stars / 10)
        // 遍历数组赋值即可 根据星星个数 赋值(黄星=1,灰星=0)
        // index 从0开始  0 , 1 ,2 ,3,4
        // 假设星星个数为 4
        for (let i = 0; i < 5; i++) {
          v.startArr[i] = starNum > i ? 1 : 0
        }
      })
      state.list = res.data.subjects
    }
    onMounted(()=>{
        getMoviesListData()
    })
    provide('title', typeTitle)
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang='scss' scoped>
</style>
