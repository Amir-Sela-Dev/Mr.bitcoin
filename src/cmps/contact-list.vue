
<script>
import ContactPreview from "@/cmps/contact-preview.vue";

export default {
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onRemoveContact(contactId) {
      this.$emit("remove", contactId);
    },
  },
  components: {
    ContactPreview,
  },
};
</script>

<template>
  <section class="full-list flex">
    <div class="list-details flex">
      <h3>{{ contacts.length }} Contacts</h3>
      <RouterLink :to="`/contact/edit`">
        <button class="add">Create new contact</button>
      </RouterLink>
    </div>
    <TransitionGroup name="list" tag="ul" class="contact-list">
      <div class="header flex">
        <li key="name">
          <div class="name">Name</div>
        </li>
        <li key="email">
          <div class="Email">Email</div>
        </li>
        <li key="phone">
          <div class="Phone">Phone</div>
        </li>

        <div class="actions" key="actions"></div>
      </div>

      <li
        class="contact-preview flex"
        v-for="contact in contacts"
        :key="contact._id"
      >
        <ContactPreview :contact="contact" @remove="onRemoveContact" />
      </li>
    </TransitionGroup>
  </section>
</template>


<style lang="scss" scoped>
.full-list {
  box-shadow: 0 0 2px 0 rgb(53 65 83 / 12%), 0 2px 4px 0 rgb(53 65 83 / 12%);
  width: 100%;
  max-width: 1100px;
  margin-inline: 30px;
  flex-direction: column;
  .contact-list {
    padding-inline-start: 0;
    width: 100%;

    // margin: 20px 30px;
    // padding-block-start: 22px;
    padding-block-end: 10px;
    border-bottom: #c9d3e0 solid 1px;
    list-style: none;
    border-collapse: collapse;

    .actions {
      flex-grow: 2;
      width: 20%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-inline-end: 30px;
    }
  }

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
      max-width: 32%;
      min-width: 32%;
      padding-inline-end: 30px;
      font-size: 16px;
      font-weight: 900;
    }
  }
  .list-details {
    justify-content: space-between;
    align-items: center;
    padding-inline: 20px;
    height: 64px;

    button {
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
}
</style>