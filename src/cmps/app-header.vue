
<script>
import { userService } from "@/services/user.service.js";
import { bitcoinService } from "@/services/bitcoin.service.js";
export default {
  data() {
    return {
      rate: 0,
    };
  },
  async created() {
    this.user = await userService.getLoggedinUser();
    this.rate = await bitcoinService.getRate();
  },
  computed: {
    filteredContacts() {
      const regex = new RegExp(this.filterBy.txt, "i");
      return this.contacts.filter((contact) => regex.test(contact.name));
    },
    user() {
      return this.$store.state.userStore.user;
    },
  },
};
</script>

<template>
  <header>
    <div class="logo">
      <h2>Mr.bitcoin</h2>
    </div>
    <div v-if="rate" class="rate-details flex">
      <!-- Bitcoin rate: -->
      <div class="dollar"><span class="e">$1 = </span> {{ rate }}฿</div>
    </div>
    <div class="header-info flex">
      <div v-if="user" class="user-details flex">
        <img :src="user.imgUrl" alt="" class="user-img" />
        <span>
          {{ user.name }}
        </span>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
header {
  grid-area: header;
  display: flex;
  justify-content: space-between;

  .rate-details {
    margin-inline-end: 30px;

    .dollar {
      color: green;

      span {
        color: #fff;
      }
    }
  }

  .user-details {
    align-items: center;
    img {
      border: 2px solid #fff;
      border-radius: 50%;
      margin: 16px auto;
      position: relative;
      transition: all 0.4s;
      width: 40px;
      margin-inline-end: 10px;
    }
  }
}
</style>