<template>
    <div :class="$style.index">
        <div :class="$style.container">
            <div :class="$style.title">MainPage</div>
            <div :class="$style.linkSection">
                <router-link
                    :to="{
                        path: '/board',
                        query: { category: `notice` },
                    }"
                >
                    <div :class="$style.link">공지사항</div></router-link
                >
                <router-link
                    :to="{
                        path: '/board',
                        query: { category: `event` },
                    }"
                    ><div :class="$style.link">이벤트 게시판</div></router-link
                >
            </div>
            <div v-if="getMYInfoAvailabe()" :class="$style.userSection">
                <div :class="$style.box">
                    <div :class="$style.title">유저 정보</div>
                    <div :class="$style.user">
                        유저:{{ getUserInfo().user_id }}
                    </div>
                    <div :class="$style.user">
                        이메일:{{ getUserInfo().email }}
                    </div>
                    <div :class="$style.user">
                        닉네임:{{ getUserInfo().nickname }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { api } from "@/api/api";
import { UserInfo } from "@/structure/types";
import axios from "axios";
import { Component, Vue, Watch } from "vue-property-decorator";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
    components: {
        // HelloWorld,
    },
})
export default class HomeView extends Vue {
    loggedUserInfo?: UserInfo;

    getMYInfoAvailabe(): boolean {
        return this.loggedUserInfo != null;
    }

    getIsLoggedIn(): boolean {
        if (this.$store.state.token == undefined) {
            return false;
        }

        return true;
    }

    mounted() {
        if (this.getIsLoggedIn()) {
            api(
                "userInfo",
                "get",
                {},
                this // is context
            )
                .catch(this.myInfoError)
                .then(this.myInfoSuccess);
        }
    }

    @Watch("$store.state.token")
    tokenChanged() {
        if (this.$store.state.token == undefined) {
            this.loggedUserInfo = undefined;
            this.$forceUpdate();
        }
    }

    myInfoError(err: any) {
        let errorCode = err.response.data.errorCode;

        if (errorCode == 500) {
            alert("서버 오류");
            return;
        }

        alert("정보 가져오기 오류가 발생했습니다.");
    }

    myInfoSuccess(res: any) {
        if (res == null) return;

        this.loggedUserInfo = res.data;
        this.$store.commit("setUser", this.loggedUserInfo ?? "");

        this.$forceUpdate();
    }

    getUserInfo(): UserInfo {
        return (
            this.loggedUserInfo ?? {
                user_id: "",
                nickname: "",
                email: "",
            }
        );
    }
}
</script>

<style lang="scss" module>
@import "@/assets/utils.scss";
.index {
    .container {
        max-width: 1080px;

        padding: 20px 0px;

        @include setCenter;

        .title {
            text-align: center;
        }

        .linkSection {
            display: flex;
            justify-content: center;

            margin-top: 10px;

            a {
                text-decoration: none;

                color: black;
            }

            .link {
                margin-left: 20px;
                margin-right: 20px;
            }
        }
        .userSection {
            max-width: 320px;

            margin-top: 20px;

            text-align: center;

            @include setCenter;

            a {
                text-decoration: none;

                color: black;
            }

            .box {
                padding: 32px;

                border: 1px solid rgb(164, 164, 164);

                .title {
                    padding-bottom: 10px;
                }
            }

            .post {
                margin-top: 20px;
            }
        }
    }
}
</style>
