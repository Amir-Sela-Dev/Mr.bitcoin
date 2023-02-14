<template>
  <section class="transiction-list" v-if="user">
    <div class="list-details flex">
      <h3>{{ transactions.length }} Transictions</h3>
    </div>
    <TransitionGroup name="list" tag="ul" class="transiction-list-main">
      <div class="header flex">
        <li key="name">
          <div class="to">To</div>
        </li>
        <li key="email">
          <div class="date">Date</div>
        </li>
        <li key="amount">
          <div class="Phone">Amount</div>
        </li>
      </div>
      <li
        class="transaction-preview flex"
        v-for="transaction in transactions"
        :key="transaction.toId"
      >
        <TransactionPreview :transaction="transaction" />
      </li>
    </TransitionGroup>
  </section>
</template>

<script>
import TransactionPreview from "@/cmps/transaction-preview.vue";

export default {
  props: {
    contactId: {
      type: String,
      required: true,
    },
  },
  computed: {
    user() {
      return this.$store.state.userStore.user;
    },
    transactions() {
      console.log("this user", this.user.transactions);
      if (this.contactId) {
        console.log("hi");
        return this.user.transactions.filter(
          (transaction) => transaction.toId === this.contactId
        );
      } else return this.user.transactions;
    },
  },
  components: {
    TransactionPreview,
  },
};
</script>

<style scoped lang="scss">
.transiction-list {
  box-shadow: 0 0 2px 0 rgb(53 65 83 / 12%), 0 2px 4px 0 rgb(53 65 83 / 12%);
  width: 100%;
  max-width: 1100px;
  margin-inline: 30px;
  flex-direction: column;
  margin-top: 20px;

  .transiction-list-main {
    padding-inline-start: 0;
    width: 100%;
    // margin: 20px 30px;
    // padding-block-start: 22px;
    padding-block-end: 10px;
    border-bottom: #c9d3e0 solid 1px;
    list-style: none;
    border-collapse: collapse;

    .header {
      align-items: center;
      height: 45px;
      border-bottom: #c9d3e0 solid 1px;
      font-size: 14px;
      padding-block: 10px;
      padding-inline: 20px;
      flex-grow: 6;
      width: 100%;

      & > li {
        justify-content: flex-start;
        max-width: 33%;
        min-width: 33%;
        padding-inline-end: 30px;
        font-size: 16px;
        font-weight: 900;
      }
    }
  }

  .list-details {
    justify-content: space-between;
    align-items: center;
    padding-inline: 20px;
    height: 64px;
  }
}
</style>