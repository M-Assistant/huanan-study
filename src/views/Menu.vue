<template>
    <div class="menu">
        <van-nav-bar :title="$route.meta.title.split('-')[1]" :border="false"/>
        <div class="list">
            <van-collapse v-model="activeNames">
                <van-collapse-item v-for="(item, i) in list" :key="i" :title="item.name" :name="i" :disabled="item.items.length === 0">
                    <van-cell v-for="(v, k) in item.items" :key="k" :title="v.title" :to="'/' + item.education + '/' + v.subject" is-link />
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script>
    import { Cell, Collapse, CollapseItem } from 'vant';
    export default {
        name: "Menu",
        data() {
            return {
                list: [
                    { name: '初中', education: 'chuzhong', items: [] },
                    { name: '高中', education: 'gaozhong', items: [] },
                    { name: '大专', education: 'dazhuan', items: [
                        { title: '计算机基础', subject: 'ComputerBasics' },
                        { title: '计算机网络', subject: 'ComputerNetwork' },
                        { title: 'C++程序设计', subject: 'CppProgramming' },
                        { title: '大学英语预备级', subject: 'UniversityEnglishBasics' },
                        { title: '远程学习方法', subject: 'DistanceLearningMethods' },
                    ] },
                    { name: '本科', education: 'benke', items: [] }
                ],
                activeNames: [],
            };
        },
        components: {
            [Cell.name]: Cell,
            [Collapse.name]: Collapse,
            [CollapseItem.name]: CollapseItem
        }
    }
</script>

<style scoped>
    .menu {
        width: 100%;
        height: 100vh;
    }
    .menu >>> .van-nav-bar {
        background-color: transparent;
    }
    .menu .list >>> .van-collapse-item__title {
        font-weight: bold;
        font-size: 1.2rem;
        background-color: transparent;
    }
    .menu .list >>> .van-collapse-item__content {
        padding: 0;
        background-color: transparent;
    }
    .menu .list >>> .van-collapse-item__content .van-cell {
        background-color: transparent;
    }
</style>