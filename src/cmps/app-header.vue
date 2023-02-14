
<script>
import { userService } from "@/services/user.service.js";
import { bitcoinService } from "@/services/bitcoin.service.js";
export default {
  data() {
    return {
      rate: 0,
      isOptionOpen: false,
    };
  },
  async created() {
    this.user = await userService.getLoggedinUser();
    this.rate = await bitcoinService.getRate();
  },
  methods: {
    switchUser() {
      this.isOptionOpen = false;
      this.$router.push("/signup");
    },
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
    <div class="header-info flex" @click="isOptionOpen = !isOptionOpen">
      <div v-if="user" class="user-details flex">
        <img :src="user.imgUrl" alt="" class="user-img" />
        <span>
          {{ user.name }}
        </span>
      </div>
      <div class="modal" v-if="isOptionOpen">
        <button class="modal-option" @click="switchUser">Switch user</button>
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
    padding-inline: 8px;
    cursor: pointer;
    height: 64px;

    img {
      border: 2px solid #fff;
      border-radius: 50%;
      position: relative;
      transition: all 0.4s;
      width: 40px;
      margin-inline-end: 10px;
    }

    &:hover {
      background-color: #4b4b5b;
    }
  }
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: #fff;
    width: 214px;
    list-style-type: none;
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.133);
    z-index: 70;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px 1px #00000021;

    transform: translate(-80px, 63px);

    a {
      margin: 0;
    }

    .modal-option {
      height: 32px;
      width: 198px;
      padding: 4px 8px;
      margin: 8px 0;
      border-radius: 0.3rem;
      align-items: center;
      background-color: #f4f7fb;
      border: #c9d3e0 solid 1px;
      color: #52627b;

      &:hover {
        background-color: #eaedf3;
      }
    }
  }
}
</style>