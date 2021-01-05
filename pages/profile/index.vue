<template>
  <div>
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img :src="profile.image" class="user-img" />
              <h4>{{ profile.username }}</h4>
              <p>
                {{ profile.bio }}
              </p>
              <template v-if="isOwn">
                <nuxt-link
                  to="/settings"
                  class="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i class="ion-gear-a"></i> Edit Profile Settings
                </nuxt-link>
              </template>
              <template v-else>
                <button
                  class="btn btn-sm btn-outline-secondary action-btn"
                  @click="followHandler"
                >
                  <i class="ion-plus-round"></i>
                  &nbsp;
                  {{
                    profile.following
                      ? `unFollow ${profile.username}`
                      : `Follow ${profile.username}`
                  }}
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{
                      active: !isFavorited,
                    }"
                    exact
                    :to="{
                      name: 'profile',
                      params: {
                        username: profile.username,
                      },
                    }"
                    >My Articles
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{
                      active: isFavorited,
                    }"
                    exact
                    :to="{
                      name: 'favoriteProfile',
                      params: {
                        username: profile.username,
                        tag: 'favorites',
                      },
                    }"
                    >Favorited Articles
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <div
              class="article-preview"
              v-for="article in articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  ><img :src="article.author.image" />
                </nuxt-link>
                <div class="info">
                  <nuxt-link
                    :to="{
                      name: 'profile',
                      params: {
                        username: article.author.username,
                      },
                    }"
                    class="author"
                    >{{ article.author.username }}</nuxt-link
                  >
                  <span class="date">{{
                    article.createdAt | date("MMM DD, YYYY")
                  }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{ active: article.favorited }"
                  @click="onFavorite(article)"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link
                :to="{
                  name: 'article',
                  params: {
                    slug: article.slug,
                  },
                }"
                class="preview-link"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfiles, follow, unFollow } from "@/api/user";
import { getArticles } from "@/api/article";

export default {
  name: "ProfileIndex",
  middleware: "authenticated",
  async asyncData({ params }) {
    const { data } = await getProfiles(params.username);
    const { profile } = data;

    const Articledata =
      params.tag === "favorites"
        ? await getArticles({ favorited: params.username, limit: 5, offset: 0 })
        : await getArticles({ author: params.username, limit: 5, offset: 0 });
    const { articles } = Articledata.data;

    return {
      profile,
      articles,
    };
  },
  computed: {
    isOwn() {
      return this.profile.username === this.$store.state.user.username;
    },
    isFavorited() {
      return this.$route.params.tag === "favorites";
    },
  },
  methods: {
    async followHandler() {
      const { data } = this.profile.following
        ? await unFollow(this.profile.username)
        : await follow(this.profile.username);

      const { profile } = data;
      this.profile = profile;
    },
  },
};
</script>

<style lang="less">
</style>