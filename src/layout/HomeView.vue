<template>
    <div :class="$style.index">
        <div :class="$style.container">
            <div :class="$style.title">Hello World</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
    components: {
        // HelloWorld,
    },
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" module>
@import "@/assets/utils.scss";
.index {
    width: 100%;
    height: auto;

    .container {
        width: 800px;

        margin-left: auto;
        margin-right: auto;
        .title {
            font-size: 24px;
        }
    }
}
</style>
