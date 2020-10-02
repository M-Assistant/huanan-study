<template>
    <div class="start">
        <h1>{{ $route.meta.title }}</h1>
        <p>欢迎来到{{ $route.meta.title }}</p>
        <van-button round color="#2c5faa" to="/menu">点击进入</van-button>
    </div>
</template>

<script>
    import { Button } from 'vant';
    export default {
        name: "Start",
        components: {
            [Button.name]: Button
        }
    }
</script>

<style scoped>
    .start {
        width: 100%;
        height: 100vh;
        background-image: linear-gradient(45deg, #eaf4fc, #1e50a2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .start h1 {
        font-size: 3rem;
        letter-spacing: .5rem;
        font-weight: 600;
        color: #eaf4fc;
    }
    .start p {
        padding-top: .7rem;
        color: #ebf6f7;
    }
    .start .van-button {
        width: 70%;
        margin-top: 8rem;
    }
</style>