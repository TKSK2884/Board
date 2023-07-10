<template>
    <div :class="$style.index">
        <div :class="$style.container">
            <div :class="$style.section">
                <div :class="$style.box">
                    <div :class="$style.titleBox">
                        <div :class="$style.title">게시글 제목</div>
                    </div>

                    <input
                        v-model="inputTitle"
                        :class="[$style.input, $style.postTitle]"
                        type="text"
                        placeholder="게시글 제목 입력"
                    />
                    <div :class="$style.title">게시글 내용</div>
                    <textarea
                        v-model="inputContent"
                        :class="[$style.input, $style.content]"
                        placeholder="게시글 작성"
                    />
                    <div v-on:click="createPost()" :class="$style.button">
                        게시글 작성
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { api } from "@/api/api";

@Component({
    components: {},
})
export default class WritePostView extends Vue {
    inputTitle: string = "";
    inputContent: string = "";

    inputCategoryValue: string = "";

    mounted() {
        let checkToken: string = this.$store.state.token;

        if (checkToken == undefined) {
            alert("로그인이 필요합니다.");
            this.$router.push("/member/login");
        }

        this.inputCategoryValue = (this.$route.query.category as string) ?? "";
    }

    createPost() {
        if (this.inputTitle.trim() == "") {
            return alert("제목을 입력해주세요.");
        }
        if (this.inputCategoryValue == "") {
            return alert("게시판을 선택해주세요.");
        }
        if (this.inputContent.trim() == "") {
            return alert("내용을 입력해주세요.");
        }

        api(
            "write",
            "post",
            {
                title: this.inputTitle,
                content: this.inputContent,
                category: this.inputCategoryValue,
            },
            this
        )
            .then(this.writeSuccess)
            .catch(this.writeError);
    }

    writeError(err: any) {
        let errorCode = err.response.data.errorCode;

        if (errorCode == 500) {
            alert("서버 오류");
            return;
        }

        if (errorCode == 201) {
            alert("유저 정보가 존재하지 않습니다.");
            return;
        }

        if (errorCode == 102) {
            alert("작성에 실패하였습니다.");
            return;
        }

        alert("작성에 실패하였습니다.");
    }

    writeSuccess(res: any) {
        if (res == null) return;

        this.$router.push(`/board?category=${this.inputCategoryValue}`);
        return;
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

        .section {
            max-width: 860px;

            border: 1px solid black;

            @include setCenter;

            .box {
                max-width: 800px;

                @include setCenter;

                .titleBox {
                    display: flex;
                    justify-content: space-between;

                    .radio {
                        display: flex;
                        align-items: center;
                    }
                }
                .title {
                    padding: 12px 0px;

                    font-size: 16px;
                    font-weight: bold;
                }
                .input {
                    padding: 8px;

                    margin-top: 10px;

                    border: solid 1px #6b6b6b;
                    border-radius: 2px;

                    outline: none;
                }

                .postTitle {
                    width: 360px;
                }

                .content {
                    width: 720px;
                    height: 120px;
                }

                .button {
                    max-width: 120px;

                    padding: 8px 18px;

                    margin-top: 20px;
                    margin-bottom: 20px;

                    border: 1px solid #3a3a3a;
                    border-radius: 4px;

                    @include setCenter;
                }
            }
        }
    }
}
</style>
