<template>
  <div class="container">
    <div class="main">
      <h2>{{ formTitle }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="name"
            class="form-control"
            id="name"
            v-model="name"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div v-if="formTitle === 'Sign up'" class="form-group">
          <label for="phone">Phone:</label>
          <input
            type="phone"
            class="form-control"
            id="phone"
            v-model="phone"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">{{ formTitle }}</button>
      </form>
      <a v-if="formTitle === 'Log in'" @click="formTitle = 'Sign up'"
        >Sign up</a
      >
      <a v-if="formTitle === 'Sign up'" @click="formTitle = 'Log in'">Log in</a>
      <p v-if="errorMessage" class="mt-3 text-danger">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { userService } from "@/services/user.service.js";
export default {
  data() {
    return {
      email: "",
      name: "",
      phone: "",
      formTitle: "Log in",
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      let user = userService.getEmptyUser();
      user.name = this.name;
      let method = this.formTitle === "Log in" ? "login" : "signup";
      try {
        await this.$store.dispatch({ type: method, user });
        console.log("user login");
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.errorMessage = err;
      }

      // handle form submission here, e.g. by calling a login API
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 30px;
    margin-bottom: 30px;
  }
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    border: #c9d3e0 solid 1px;
    background-color: #fff;
    width: 600px;
    padding: 20px 30px;

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;

      .form-group {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      label {
        font-size: 26px;
      }
      input {
        width: 80%;
        height: 30px;
      }
      button {
        width: 20%;
        height: 30px;
        margin-top: 30px;
      }
    }
  }
  a {
    color: #52627b;
  }
}
</style>