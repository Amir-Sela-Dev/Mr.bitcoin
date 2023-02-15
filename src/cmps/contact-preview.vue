<template>
  <article class="flex">
    <div class="contact-name">
      {{ contact.name }}
    </div>
    <div class="contact-email">
      {{ contact.email }}
    </div>
    <div class="contact-phone">
      {{ contact.phone }}
    </div>
    <div class="option-img" @click="isOptionOpen = !isOptionOpen">
      <img src="public/img/dots.png" alt="" />
      <div class="modal" v-if="isOptionOpen">
        <RouterLink :to="`/contact/${contact._id}`">
          <button class="modal-option">Details</button>
        </RouterLink>
        <RouterLink :to="`/contact/edit/${contact._id}`">
          <button class="modal-option">Edit</button>
        </RouterLink>
        <button @click="onRemoveContact(contact._id)" class="modal-option">
          Remove
        </button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOptionOpen: false,
    };
  },
  methods: {
    onRemoveContact(contactId) {
      this.$emit("remove", contactId);
    },
  },
};
</script>

<style lang="scss">
.contact-preview {
  // justify-content: space-between;
  align-items: center;
  height: 45px;
  border-bottom: #c9d3e0 solid 1px;
  font-size: 14px;

  &:hover {
    box-shadow: 0 1px 7px 0 rgb(0 0 0 / 30%);
  }

  article {
    padding-block: 10px;
    padding-inline: 20px;
    flex-grow: 6;
    width: 100%;

    // justify-content: space-between;
    .contact-name,
    .contact-email,
    .contact-phone {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      max-width: 32%;
      min-width: 32%;
      padding-inline-end: 30px;
    }
  }
  .wrap-modal {
    position: relative;
    z-index: 71;
  }
  .modal {
    position: absolute;
    background-color: #fff;
    width: 214px;
    list-style-type: none;
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.133);
    z-index: 70;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px 1px #00000021;

    transform: translate(-10px, 95px);

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
  .option-img {
    justify-self: flex-end;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // padding-inline-end: 30px;
    max-width: 4%;
    min-width: 4%;

    img {
      width: 22px;
      height: 22px;
    }
  }
}
</style>
