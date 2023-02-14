
<script>
import { contactService } from "@/services/contact.service.js";
import TransferFunds from "@/cmps/transfer-funds.vue";
import TransactionList from "@/cmps/transaction-list.vue";
export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    this.contact = await contactService.getContactById(contactId);
  },
  components: {
    TransferFunds,
    TransactionList,
  },
};
</script>

<template>
  <section class="details flex">
    <div v-if="contact" class="contact-details flex">
      <div class="contact-info flex">
        <div class="flex align-center">
          <img :src="`https://robohash.org/${contact._id}`" alt="" />
          <div class="contact-main-info flex">
            <h2>Fullname: {{ contact.name }}</h2>
            <h2>Email: {{ contact.email }}</h2>
            <h2>Phone number: {{ contact.phone }}</h2>
          </div>
        </div>
        <div class="contact-actions flex">
          <RouterLink :to="`/contact/edit/${contact._id}`">
            <button>Edit</button>
          </RouterLink>
          <RouterLink to="/contact">
            <button>Go back</button>
          </RouterLink>
        </div>
      </div>
    </div>

    <section class="transfers flex">
      <TransferFunds v-if="contact" :contact="contact" />
    </section>
    <TransactionList v-if="contact" :contactId="contact._id" />
  </section>
</template>


<style lang="scss"  scoped>
.details {
  flex-direction: column;
  align-items: center;

  .contact-details {
    align-items: center;
    justify-content: center;
    font-size: 16px;
    width: 100%;

    .contact-info {
      // flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin-top: 5vh;
      padding: 20px 50px;
      border: #c9d3e0 solid 1px;
      width: 100%;

      background-color: #fff;

      img {
        width: 200px;
      }
      button {
        width: 120px;
        height: 30px;
        background-color: #fff;
        color: #1f1f32;
        border: #1f1f32 solid 1px;
        border-radius: 4px;
      }
    }
    .contact-main-info {
      flex-direction: column;
      justify-content: flex-start;
      gap: 25px;
      margin-top: 5vh;
    }
    .contact-actions {
      flex-direction: column;
      margin-right: 8%;
    }
  }
  .transfers {
    box-shadow: 0 0 2px 0 rgb(53 65 83 / 12%), 0 2px 4px 0 rgb(53 65 83 / 12%);
    width: 100%;
    max-width: 1100px;
    margin-inline: 30px;
    flex-direction: column;
    margin-top: 20px;
  }
}
</style>
