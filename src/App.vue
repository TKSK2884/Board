<template>
    <div :class="$style.index">
        <div :class="$style.container">
            <div :class="$style.headerSection">
                <Header />
            </div>

            <div :class="$style.viewSection">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";

@Component({
    components: {
        Header,
    },
})
export default class AppView extends Vue {}
</script>
<style lang="scss" module>
.container {
    width: 100%;
    height: auto;
}
</style>

<style lang="scss">
* {
    box-sizing: border-box;
    font-family: "Noto Sans KR", sans-serif;
}

html,
body {
    width: 100%;
    height: auto;
    margin: 0;
}
</style>
