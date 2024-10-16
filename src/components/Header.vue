<template>
    <div :class="$style.index">
        <div :class="$style.container">
            <div :class="$style.linkSection">
                <div :class="$style.left">
                    <router-link :to="`/`">
                        <div :class="$style.link">
                            <div :class="$style.icon" />
                        </div>
                    </router-link>
                </div>

                <div :class="$style.right">
                    <span v-if="isLoggeIn()" @click="logout()" :to="`/`">
                        <div :class="$style.link">Logout</div>
                    </span>
                    <div v-else :class="$style.cover">
                        <router-link :to="`/member/login`">
                            <div :class="$style.link">Login</div>
                        </router-link>

                        <router-link :to="`/member/join`">
                            <div :class="$style.link">Join</div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class Header extends Vue {
    isLoggeIn() {
        return this.$store.state.token !== undefined;
    }
    logout() {
        this.$store.commit("setToken", undefined);
        this.$store.commit("setUser", undefined);
    }
}
</script>

<style lang="scss" module>
.index {
    border-bottom: 1px solid #dbdbdb;

    > .container {
        max-width: 1080px;
        height: 80px;

        padding: 12px;
        margin-inline: auto;

        > .title {
            display: inline-block;
        }

        > .linkSection {
            display: flex;
            align-items: center;

            a {
                text-decoration: none;

                color: black;
            }

            > .left,
            > .right {
                width: 50%;

                display: flex;
            }

            > .right {
                justify-content: end;

                > span {
                    cursor: pointer;
                }
            }

            .cover {
                display: flex;
            }

            .link {
                font-size: 16px;

                padding-block: 16px;
                padding-inline: 12px;

                > .icon {
                    width: 16px;
                    height: 16px;

                    background-image: url("@/assets/icon/house-solid.svg");
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: contain;
                }
            }
        }
    }
}
</style>
