<template>
  <div class="contact-filter">
    <input
      @input="onFilter"
      v-model="filterBy.text"
      type="text"
      placeholder="Name, email or phone number"
    />
    <button>Filter</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      filterBy: {
        text: "",
      },
    };
  },
  methods: {
    onFilter() {
      this.$emit("filter", this.filterBy);
    },
  },
};
</script>

<style lang="scss">
.contact-filter {
  box-shadow: 0 0 2px 0 rgb(53 65 83 / 12%), 0 2px 4px 0 rgb(53 65 83 / 12%);
  width: 100%;
  height: fit-content;
  max-width: 1100px;
  padding-inline-start: 0;
  margin-block: 30px;
  // border-bottom: #c9d3e0 solid 1px;
  display: flex;
  align-items: center;
  background-color: #fff;

  input {
    display: flex;
    align-items: center;
    width: 92%;
    height: 49px;
    border: none;
    border-right: #c9d3e0 solid 1px;
    padding-inline: 20px;

    &:focus {
      outline: none;
    }
  }

  button {
    width: 8%;
    height: 32px;
    margin: 4px 8px;
    font-size: 13px;
    text-align: center;
    border-radius: 4px;
    color: #1f1f32;
    background-color: #fff;
    border: #1f1f32 solid 1px;

    &:hover {
      background-color: rgba(31, 31, 50, 0.04);
    }
  }
}
</style>
