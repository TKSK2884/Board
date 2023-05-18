<template>
    <div :class="$style.index">
        <div :class="$style.container">
            <div :class="$style.coverBox">
                <div :class="$style.title">로그인</div>
                <div :class="$style.box">
                    <input
                        v-model="inputID"
                        :class="$style.input"
                        type="text"
                        placeholder="아이디 입력"
                    />
                    <input
                        v-model="inputPassword"
                        :class="$style.input"
                        type="password"
                        placeholder="비밀번호 입력"
                    />
                    <div v-on:click="tryLogin" :class="$style.button">
                        로그인
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { api } from "@/api/api";

@Component({
    components: {},
})
export default class LoginView extends Vue {
    inputID: string = "";
    inputPassword: string = "";

    tryLogin() {
        if (this.inputID == "") {
            return alert("아이디를 입력해주세요");
        }
        if (this.inputPassword == "") {
            return alert("비밀번호를 입력해주세요");
        }

        api(
            "login",
            "post",
            {
                id: this.inputID,
                pw: this.inputPassword,
            },
            this // is context
        )
            .catch(this.loginError)
            .then(this.loginSuccess);
    }

    loginError(err: any) {
        let errorCode = err.response.data.errorCode;

        if (errorCode == 500) {
            alert("서버 오류");
            return;
        }

        if (errorCode == 101) {
            alert("아이디 혹은 비밀번호를 확인 해주세요");
            return;
        }

        alert("로그인에 실패하였습니다.");
        return;
    }

    loginSuccess(res: any) {
        if (res == null) return;

        let tokenData: string = res.data.token as string;
        this.$store.commit("setToken", tokenData);
        this.$router.push("/");
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

        .coverBox {
            max-width: 360px;

            padding: 30px;

            border: none;
            border-radius: 10px;

            box-shadow: 0px 0px 1px 0px rgb(87, 87, 87);

            @include setCenter;

            .title {
                padding: 20px 0px;

                font-size: 24px;
                font-weight: bold;

                text-align: center;
            }

            .box {
                max-width: 300px;

                display: flex;
                flex-direction: column;

                @include setCenter;

                .input {
                    padding: 8px;

                    margin-top: 10px;
                    margin-left: 10px;

                    border: none;
                    border-bottom: solid 1px rgb(107, 107, 107);
                    border-radius: 2px;

                    outline: none;
                }

                .button {
                    padding: 6px 18px;

                    margin-top: 20px;

                    border: 1px solid rgb(58, 58, 58);
                    border-radius: 4px;

                    @include setCenter;
                }
            }
        }
    }
}
</style>
