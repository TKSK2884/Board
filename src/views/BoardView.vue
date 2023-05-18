<template>
    <div :class="$style.index">
        <div :class="$style.container">
            <div :class="$style.section">
                <div :class="$style.title">{{ getBoardCategory() }}</div>
                <div v-if="getIsTokenUseable()" :class="$style.coverLink">
                    <router-link
                        :to="`/board/write?category=${getWriteCategory()}`"
                    >
                        <div :class="$style.link">게시글 작성</div></router-link
                    >
                </div>
                <div
                    v-for="(post, index) in contentsArray"
                    :class="$style.contentSection"
                    :key="index"
                >
                    <router-link :to="`/board/read?id=${getPostID(post)}`">
                        <div :class="$style.box">
                            <div :class="$style.content">
                                {{ `제목: ` + getTitle(post) }}
                            </div>
                            <div :class="$style.content">
                                {{ `작성시간:` + getTime(post) }}
                            </div>

                            <div :class="[$style.content, $style.right]">
                                {{ `작성자:` + getWriter(post) }}
                            </div>
                        </div>
                    </router-link>
                </div>
                <div :class="$style.pageBox">
                    <div
                        v-for="number in getTotalPage()"
                        :key="number"
                        v-on:click="pageChange(number)"
                        :class="$style.button"
                    >
                        {{ number }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Post } from "@/structure/types";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import { api } from "@/api/api";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
    components: {
        // HelloWorld,
    },
})
export default class BoardView extends Vue {
    contentsArray: Post[] = [];

    category: string = "";

    pageNumber: number = 0;
    totalCount: number = 0;

    mounted() {
        this.category = (this.$route.query.category as string) ?? "";

        this.loadBoard();
    }

    loadBoard() {
        api(
            "board",
            "get",
            {
                page: this.pageNumber,
                category: this.category,
            },
            this // is context
        )
            .catch(this.postLoadError)
            .then(this.postLoadSuccess);
    }

    postLoadError(err: any) {
        let errorCode = err.response.data.errorCode;

        if (errorCode == 500) {
            alert("서버 오류");
            return;
        }

        alert("데이터 받아오기에 실패하였습니다.");
    }

    postLoadSuccess(res: any) {
        if (res == null) {
            return;
        }

        this.totalCount = res.data.total;
        this.contentsArray = res.data.array;
        console.log(res.data.array);
        return;
    }

    getTotalPage(): number {
        return Math.ceil(this.totalCount / 10);
    }

    pageChange(number: number) {
        this.pageNumber = number;
        this.loadBoard();
    }

    getIsTokenUseable(): boolean {
        if (this.$store.state.token == undefined) {
            return false;
        }

        return true;
    }

    getWriteCategory(): string {
        return this.category;
    }

    getBoardCategory(): string {
        switch (this.category) {
            case "notice":
                return "공지사항 게시판";
            case "event":
                return "이벤트 게시판";
            default:
                return "";
        }
    }

    getPostID(post: Post): number {
        return post.id ?? 0;
    }

    getTitle(post: Post): string {
        return post.title ?? "";
    }

    getTime(post: Post): string {
        let timeDate: Date = new Date(post.written_time ?? "");
        timeDate.setHours(timeDate.getHours() + 9);

        return timeDate.toLocaleString();
    }

    getWriter(writer: Post): string {
        return writer.writer ?? "";
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
            .title {
                margin-bottom: 10px;

                text-align: center;
            }
            .coverLink {
                max-width: 80px;

                @include setCenter;
            }

            a {
                text-decoration: none;

                color: black;
            }

            .contentSection {
                max-width: 980px;

                @include setCenter;

                .box {
                    display: flex;

                    margin: 10px 0px;

                    border-bottom: 1px solid rgb(203, 202, 202);

                    .content {
                        width: calc(100% / 3);

                        padding: 10px;

                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .right {
                        text-align: right;
                    }
                }
            }
            .pageBox {
                display: flex;
                justify-content: center;

                .button {
                    margin-right: 10px;
                }

                .right {
                    text-align: right;
                }
            }
        }
    }
}
</style>
