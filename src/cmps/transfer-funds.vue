<template>
  <section class="transfer-funds flex">
    <div class="header flex">
      <h3>Balance</h3>
      <div class="actions">
        <button @click="onTransfer">Transfer money</button>
        <button @click="onRequest">Request money</button>
      </div>
    </div>
    <div class="main-funds flex">
      <h5>AVAILABLE BALANCE:</h5>
      <h2>{{ user.balance }}฿</h2>
    </div>
  </section>
  <div v-if="isModalOpen" class="modal">
    <div class="modal-container">
      <div class="switch-modal flex">
        <button
          v-bind:class="typeOfTransfer === 'transfer' ? 'active' : ''"
          @click="typeOfTransfer = 'transfer'"
        >
          TRANSFER
        </button>
        <button
          v-bind:class="typeOfTransfer === 'request' ? 'active' : ''"
          @click="typeOfTransfer = 'request'"
        >
          REQUEST MONEY
        </button>
      </div>
      <form @submit.prevent="transfer">
        <div class="wraper flex">
          <label for="amount">Amount to withdraw from balance </label>
          <input
            type="number"
            class="amount"
            v-model="funds.amount"
            id="amount"
          />
        </div>

        <div class="wraper flex">
          <label for="contactName">Transfer to </label>
          <input
            type="text"
            class="transfer-to"
            v-model="contact.name"
            id="contactName"
            disabled
          />
        </div>
        <button class="add-user">Transfer</button>
      </form>
    </div>
  </div>
  <div
    v-if="isModalOpen"
    v-on:click.prevent="closeModal"
    className="dark-screen"
  ></div>
</template>

<script>
import { userService } from "@/services/user.service.js";
export default {
  async created() {
    this.user = await userService.getLoggedinUser();
  },
  data() {
    return {
      isModalOpen: false,
      funds: userService.getEmptyFunds(),
      typeOfTransfer: "transfer",
    };
  },
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },

  methods: {
    closeModal() {
      this.isModalOpen = false;
      this.typeOfTransfer = "";
    },
    onTransfer() {
      this.isModalOpen = true;
      this.typeOfTransfer = "transfer";
    },
    onRequest() {
      this.isModalOpen = true;
      this.typeOfTransfer = "request";
    },
    async transfer() {
      let funds = this.funds;
      funds.at = Date.now();
      funds.to = this.contact.name;
      funds.toId = this.contact._id;
      try {
        await this.$store.dispatch({ type: "transfer", funds });
        this.closeModal();
      } catch (error) {}
    },
  },
  computed: {
    user() {
      return this.$store.state.userStore.user;
    },
    amount() {
      return this.funds.amount;
    },
  },
};
</script>

<style scoped lang="scss">
button {
  background-color: #fff;
  color: #1f1f32;
  border: #1f1f32 solid 1px;
  border-radius: 4px;
}

.transfer-funds {
  flex-direction: column;
  width: 100%;
  box-shadow: 0 0 2px 0 rgb(53 65 83 / 12%), 0 2px 4px 0 rgb(53 65 83 / 12%);
  padding-inline-start: 0;
  width: 100%;

  // margin: 20px 30px;
  // padding-block-start: 22px;
  padding-block-end: 10px;
  border-bottom: #c9d3e0 solid 1px;
  list-style: none;
  border-collapse: collapse;

  .header {
    justify-content: space-between;
    align-items: center;
    padding-inline: 20px;
    height: 64px;
    border-bottom: #c9d3e0 solid 1px;
  }

  .main-funds {
    flex-direction: column;
    height: 90px;
    margin-block: 20px;
    justify-content: center;
    align-items: center;
  }
}
.modal {
  position: fixed;
  background-color: #fff;
  box-shadow: 0 0 12px 1px grey;
  height: 298px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  transition: all 0.3s ease 0s;
  width: 437px;
  z-index: 71;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  color: #323338;
  border-radius: 4px;
}
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  h2 {
    margin-block: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-inline: 20px;

    input {
      width: 250px;
      height: 30px;
      //   border-radius: 10px;
      margin-block-end: 20px;
      font-size: 22px;

      &:focus {
        outline: none;
        border-bottom: #e37c53 solid 1px;
      }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    button {
      margin-block-end: 20px;
    }
    .add-user {
      width: 200px;
      height: 35px;
      border-radius: 20px;
      background-color: rgb(42, 38, 38);
      color: white;
    }
    .cancel {
      background-color: white;
      border: none;
    }
    .amount {
      height: 70px;
      font-size: 70px;
      border: none;
      border-bottom: #e37c53 solid 1px;
      text-align: center;
      color: #354153;
    }
  }
  .wraper {
    flex-direction: column;
  }

  .switch-modal {
    width: 100%;
    button {
      width: 50%;
      margin: 0;
      height: 50px;
      text-align: center;
      color: #e37c53;
      border-inline: none;
      border-radius: 0;
      transition: 0.2s;
    }
    .active {
      border-bottom: #354153 solid 3px;
      color: #354153;
    }
  }
}
.dark-screen {
  z-index: 60;
  background-color: rgba(0, 0, 0, 0.625);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: auto;
  bottom: auto;
  transition: opacity 0.15s;
}
</style>