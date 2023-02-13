
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
    if (contactId) {
      this.contact = await contactService.getContactById(contactId);
    } else {
      this.contact = contactService.getEmptyContact();
    }
  },
  methods: {
    async save(contact) {
      console.log(";save");
      try {
        await this.$store.dispatch({ type: "saveContact", contact });
        this.$router.push("/contact");
      } catch (err) {
        console.log("canot save contact", err);
      }
    },
    async removeContact(contactId) {
      try {
        await this.$store.dispatch({ type: "removeContact", contactId });
        console.log("contact removed");
        this.$router.push("/contact");
      } catch (error) {
        console.log("cannot remove contact", err);
      }
    },
  },
};
</script>

<template>
  <section class="contact-edit flex" v-if="contact">
    <div class="contact-main">
      <img :src="`https://robohash.org/${contact._id}`" alt="" />
      <form @submit.prevent="save(contact)" v-if="contact" class="contact-edit">
        <div class="wraper flex justify-between">
          <label for="name">Name:</label>
          <input type="text" v-model="contact.name" id="name" />
        </div>
        <div class="wraper flex justify-between">
          <label for="email">Email:</label>
          <input type="text" v-model="contact.email" id="email" />
        </div>
        <div class="wraper flex justify-between">
          <label for="phone">Phone number:</label>
          <input type="text" v-model="contact.phone" id="phone" />
        </div>
        <div class="actions">
          <button v-if="contact._id">Save</button>
          <button v-if="!contact._id">Add</button>
          <RouterLink :to="`/contact`">
            <button class="modal-option">Back</button>
          </RouterLink>
          <button
            v-if="contact._id"
            @click.stop.prevent="removeContact(contact._id)"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  </section>
</template>


<style lang="scss">
.contact-edit {
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.contact-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  border: #c9d3e0 solid 1px;
  background-color: #fff;
  width: 500px;
  padding: 10px 20px 20px;

  .wraper {
    width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 85%;
    margin-top: 40px;
    gap: 20px;

    input {
      height: 30px;
      width: 65%;
      font-size: 18px;
    }
  }

  img {
    width: 350px;
  }
}
</style>
