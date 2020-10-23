<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
    <imooc-footer></imooc-footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { v4 as uuid } from 'uuid';
export default {
  name: 'app',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer,
  },
  created() {
    let sid = '';
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid');
    } else {
      sid = uuid();
      localStorage.setItem('sid', sid);
    }
    this.$store.commit('setSid', sid);
  },
};
</script>

<style lang="scss">
@import 'assets/layui/css/layui.css';
@import 'assets/css/global.css';
@import 'assets/layui/css/modules/layer/default/layer.css';
@import 'assets/css/common.css';
</style>
