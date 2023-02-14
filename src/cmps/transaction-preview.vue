<template>
  <article class="flex">
    <div class="transiction-to">
      {{ transaction.to }}
    </div>
    <div class="transiction-date">
      {{ transaction.at }}
    </div>
    <div class="transiction-amonut">{{ transaction.amount }}฿</div>
  </article>
</template>

<script>
export default {
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.transaction-preview {
  // justify-content: space-between;
  align-items: center;
  height: 45px;
  border-bottom: #c9d3e0 solid 1px;
  font-size: 14px;

  // &:hover {
  //   box-shadow: 0 1px 7px 0 rgb(0 0 0 / 30%);
  // }

  article {
    padding-block: 10px;
    padding-inline: 20px;
    flex-grow: 6;
    width: 100%;

    // justify-content: space-between;
    .transiction-amount,
    .transiction-to,
    .transiction-date {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      max-width: 33%;
      min-width: 33%;
      padding-inline-end: 30px;
    }
  }
}
</style>