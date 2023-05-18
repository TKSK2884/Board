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
import axios from "axios";
import { Component, Vue, Watch } from "vue-property-decorator";
import Header from "./components/Header.vue";
import { UserInfo } from "./structure/types";

@Component({
    components: {
        Header,
    },
})
export default class AppView extends Vue {
    // @Watch("$store.state.user")
    // userInfoChanged() {
    //     console.log("userInfo changed");
    // }
    // @Watch("$store.state.token")
    // tokenChanged() {
    //     console.log("token changed");
    // }
}
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
