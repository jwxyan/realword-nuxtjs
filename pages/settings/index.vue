<template>
  <div>
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    v-model="user.image"
                    class="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    v-model="user.username"
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    v-model="user.bio"
                    class="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    v-model="user.email"
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    v-model="user.password"
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                  />
                </fieldset>
                <button
                  class="btn btn-lg btn-primary pull-xs-right"
                  @click="updateSetting"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button class="btn btn-outline-danger" @click="logout">
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require("js-cookie") : undefined;

import { updateUser, getUser } from "@/api/user";

export default {
  name: "SettingsIndex",
  middleware: "authenticated",
  async asyncData({ params, store }) {
    const { data } = await getUser();
    const { user } = data;
    return {
      user,
    };
  },
  data() {
    return {
      user: {
        email: "",
        bio: "",
        image: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    logout() {
      // 清除登录状态
      this.$store.commit("setUser", null);

      // 清除cookie
      Cookie.remove("user");

      // 跳转到首页
      this.$router.push("/");
    },
    async updateSetting() {
      const { email, bio, image, username, password } = this.user;

      const params = password
        ? {
            user: {
              email,
              bio,
              image,
              username,
              password,
            },
          }
        : {
            user: {
              email,
              bio,
              image,
              username,
            },
          };

      const { data } = await updateUser(params);

      // TODO: 保存用户的登录状态
      this.$store.commit("setUser", data.user);

      // 为了防止刷新页面数据丢失，我们需要把数据持久化
      Cookie.set("user", data.user);

      // 跳转
      this.$router.push({
        name: "profile",
        params: { username: data.user.username },
      });
    },
  },
};
</script>

<style lang="less">
</style>