
<script>
import { contactService } from "@/services/contact.service.js";
export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    console.log("contactId", contactId);
    this.contact = await contactService.getContactById(contactId);
  },
};
</script>

<template>
  <div v-if="contact" class="contact-details flex">
    <div class="contact-info flex">
      <img :src="`https://robohash.org/${contact._id}`" alt="" />
      <h2>Fullname: {{ contact.name }}</h2>
      <h2>Email: {{ contact.email }}</h2>
      <h2>Phone number: {{ contact.phone }}</h2>
      <RouterLink to="/contact">
        <button>Go back</button>
      </RouterLink>
    </div>
  </div>
</template>


<style lang="scss"  scoped>
.contact-details {
  align-items: center;
  justify-content: center;
  font-size: 20px;

  .contact-info {
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    gap: 25px;
    margin-top: 5vh;
    padding: 10px 20px 20px;
    border: #c9d3e0 solid 1px;
    width: fit-content;
    background-color: #fff;

    img {
      width: 350px;
    }
    button {
      width: 120px;
      height: 30px;
      border-radius: 20px;
    }
  }
}
</style>
