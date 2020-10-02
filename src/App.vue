<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  letter-spacing: .1rem;
}
#app {
  width: 100%;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.correct {
  color: #d7003a;
}
.correct-unline {
  color: #d7003a;
  border-bottom: 1px solid #d7003a;
  padding: 0 .5rem;
}
</style>
