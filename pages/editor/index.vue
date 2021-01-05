<template>
  <div>
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <ul class="error-messages">
              <template v-for="(messages, field) in errors">
                <li v-for="(message, index) in messages" :key="index">
                  {{ field }} {{ message }}
                </li>
              </template>
            </ul>
            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    v-model="article.title"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                    v-model="article.description"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    v-model="article.body"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    v-model="tag"
                    @keyup.enter="addTag"
                  />
                  <div class="tag-list">
                    <span
                      v-for="item in article.tagList"
                      :key="item"
                      class="tag-default tag-pill ng-binding ng-scope"
                    >
                      <i class="ion-close-round" @click="delTag(item)"></i>
                      {{ item }}
                    </span>
                  </div>
                </fieldset>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  @click="publish"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { newArticle, getArticle, updateArticle } from "@/api/article";

export default {
  name: "EditorIndex",
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  async asyncData({ params }) {
    if (params.slug) {
      const { data } = await getArticle(params.slug);
      const { title, description, body, tagList } = data.article;
      return {
        article: {
          title,
          description,
          body,
          tagList,
        },
        slug: params.slug,
      };
    }
  },
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      tag: "",
      errors: {},
    };
  },
  computed: {
    isUpdate() {
      return this.$route.name === "updateEditor";
    },
  },
  methods: {
    async publish() {
      try {
        const { data } = this.isUpdate
          ? await updateArticle(this.slug, { article: this.article })
          : await newArticle({ article: this.article });

        // 跳转
        this.$router.push({
          name: "article",
          params: {
            slug: data.article.slug,
          },
        });
      } catch (err) {
        this.errors = err.response.data.errors;
      }
    },
    addTag() {
      //重复tag禁止添加
      if (!this.article.tagList.includes(this.tag)) {
        this.article.tagList.push(this.tag);
        this.tag = "";
      }
    },
    delTag(tag) {
      const index = this.article.tagList.findIndex((item) => item === tag);
      this.article.tagList.splice(index, 1);
    },
  },
};
</script>

<style lang="less">
</style>
