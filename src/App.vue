
<template>
  <section class="contact-app">
    <AppHeader />
    <SideNav />
    <main>
      <RouterView />
    </main>
  </section>
</template>

<script >
import AppHeader from "@/cmps/app-header.vue";
import AppFooter from "@/cmps/app-footer.vue";
import SideNav from "@/cmps/side-nav.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    SideNav,
  },
  created() {
    let user = this.$store.state.userStore.user;
    if (!user) this.$router.push("/signup");
  },
};
</script>


<style scoped  lang="scss">
.contact-app {
  display: grid;
  grid-template-areas:
    " header     header "
    " side-nav   main";
  grid-template-columns: 270px 1fr;
  grid-template-rows: 64px 1fr;
}
main {
  height: calc(100vh - 64px);
  grid-area: main;
  overflow-y: scroll;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
