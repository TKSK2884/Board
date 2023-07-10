<template>
    <div :class="$style.index">
        <div :class="$style.container">
            <div :class="$style.section">
                <div :class="$style.coverContent" v-if="getPostAvailable()">
                    <div :class="$style.title">제목: {{ getPost.title }}</div>
                    <div :class="$style.box">
                        <div :class="$style.info">
                            작성자: {{ getPost.name }}
                        </div>
                        <div :class="$style.info">||</div>
                        <div :class="$style.info">
                            작성 시간: {{ getTime() }}
                        </div>
                    </div>
                    <div :class="$style.content">
                        {{ getPost.content }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { api } from "@/api/api";
import { Content, Post } from "@/structure/types";

import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class ReadPostView extends Vue {
    searchID?: string;
    contentObject?: Content;

    mounted() {
        this.searchID = this.$route.query.id as string;

        api(
            "read",
            "get",
            {
                id: this.searchID ?? "",
            },
            this // is context
        )
            .catch(this.readError)
            .then(this.readSuccess);
    }

    readError(err: any) {
        let errorCode = err.response.data.errorCode;

        if (errorCode == 201) {
            this.$router.push("/");
            alert("존재하지 않는 게시글 입니다");
            return;
        }

        alert("불러오기 실패");
        return;
    }

    readSuccess(res: any) {
        if (res == null) return;

        this.contentObject = res.data as Content;

        if (this.contentObject == null) {
            alert("존재하지 않는 게시글입니다.");
            return;
        }

        this.$forceUpdate();
        return;
    }

    getTime(): string {
        let convertedTimeDate: Date = new Date(this.contentObject?.time ?? "");

        return convertedTimeDate.toLocaleString() ?? "";
    }

    getPostAvailable(): boolean {
        if (this.contentObject != undefined) {
            return true;
        }
        return false;
    }

    get getPost(): Content {
        return {
            title: this.contentObject?.title ?? "",
            name: this.contentObject?.name ?? "",
            content: this.contentObject?.content ?? "",
            time: this.contentObject?.time ?? "",
        };
    }
}
</script>

<style lang="scss" module>
@import "@/assets/utils.scss";
.index {
    width: 100%;
    height: auto;

    .container {
        max-width: 1080px;

        @include setCenter;

        .section {
            max-width: 920px;

            margin-top: 40px;

            @include setCenter;

            .title {
                margin-bottom: 20px;

                font-size: 24px;
                font-weight: bold;
            }

            .box {
                display: flex;
                align-items: center;

                padding-bottom: 20px;

                border-bottom: 1px solid rgb(117, 117, 117);

                .info {
                    margin-right: 20px;
                }
            }

            .content {
                margin-top: 20px;
                margin-bottom: 20px;

                font-size: 16px;
                line-height: 24px;

                word-break: break-all;
            }
        }
    }
}
</style>
