
<script>
import { userService } from "@/services/user.service.js";
import { bitcoinService } from "@/services/bitcoin.service.js";
export default {
  data() {
    return {
      user: null,
      rate: 0,
    };
  },
  async created() {
    this.user = await userService.getUser();
    this.rate = await bitcoinService.getRate();
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
      <div v-if="user" class="user-details">
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
}
</style>