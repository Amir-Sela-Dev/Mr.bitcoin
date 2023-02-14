
<template>
  <main class="flex" v-if="user">
    <div class="wraper flex">
      <div class="user-info flex align-center justify-center">
        <img :src="this.user.imgUrl" alt="" />
        <h2>{{ user.name }}</h2>
      </div>

      <div class="rate-info flex align-center justify-center">
        <h3>
          Your balance: <span>{{ user.balance }}฿</span>
        </h3>
        <h2>Currect BitCoin rate:</h2>
        <div>1$<span class="e"> = </span> {{ rate }}฿</div>
      </div>
    </div>
  </main>
</template>

<script >
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
    this.user = await userService.getLoggedinUser();
    this.rate = await bitcoinService.getRate();
  },
};
</script>

<style lang="scss" scoped>
main {
  justify-content: center;
  font-size: 20px;
}
.wraper {
  flex-direction: column;
  padding-inline: 30px;
  gap: 30px;
  border: #c9d3e0 solid 1px;
  background-color: #fff;
  width: 500px;
  padding: 10px 20px 20px;

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
  }
  img {
    width: 250px;
  }
  .rate-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;

    div {
      font-size: 30px;
      color: green;
    }
    h3 {
      font-size: 30px;
    }
    span {
      color: green;
    }
    .e {
      color: #52627b;
    }
  }
}
</style>

