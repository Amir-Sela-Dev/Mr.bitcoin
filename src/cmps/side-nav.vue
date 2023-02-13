<template>
  <section class="side-nav">
    <nav>
      <RouterLink to="/" v-bind:class="currRoute === '/' ? 'isClicked' : ''"
        >Home</RouterLink
      >
      <RouterLink
        to="/contact"
        v-bind:class="currRoute === '/contact' ? 'isClicked' : ''"
        >Contact</RouterLink
      >
      <RouterLink
        to="/about"
        v-bind:class="currRoute === '/about' ? 'isClicked' : ''"
        >About</RouterLink
      >
      <RouterLink
        to="/stats"
        v-bind:class="currRoute === '/stats' ? 'isClicked' : ''"
        >Stats</RouterLink
      >
      <RouterLink
        to="/signup"
        v-bind:class="currRoute === '/signup' ? 'isClicked' : ''"
        >Signup</RouterLink
      >
    </nav>
  </section>
</template>

<script>
export default {
  created() {
    this.currRoute = this.$route.fullPath;
    console.log("@@@@", this.currRoute);
  },
  computed: {
    routerStyle() {
      return {
        isClicked: this.isClicked === true,
      };
    },
    currRoute() {
      return this.$route.fullPath;
    },
  },
};
</script>

<style lang="scss">
.side-nav {
  grid-area: side-nav;
  background-color: rgb(45, 45, 72);

  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;

    a {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 15px 0 15px 23px;

      &:hover {
        background-color: #4b4b5b;
        text-decoration: none;
      }
    }

    .isClicked {
      background-color: #1f1f32;
      border-left: #e98453 solid 3px;
    }
  }
}
</style>