<template>
  <div class="main-container">
    <UserMsg />
    <ContactFilter @filter="onSetFilterBy" />
    <ContactList @remove="removeContact" v-if="contacts" :contacts="contacts" />
  </div>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import ContactList from "@/cmps/contact-list.vue";
import ContactFilter from "@/cmps/contact-filter.vue";
import UserMsg from "@/cmps/user-msg.vue";

export default {
  data() {
    return {
      // contacts: null,
      filterBy: {},
    };
  },
  async created() {
    this.loadContacts();
  },
  methods: {
    async removeContact(contactId) {
      try {
        await this.$store.dispatch({ type: "removeContact", contactId });
        console.log("contact removed");
      } catch (error) {
        console.log("cannot remove contact", err);
      }
    },
    onSetFilterBy(filterBy) {
      console.log("hey");
      this.filterBy = filterBy;
      this.loadContacts();
    },
    loadContacts() {
      let filterBy = this.filterBy;
      this.$store.dispatch({ type: "loadContacts", filterBy });
    },
  },
  computed: {
    filteredContacts() {
      const regex = new RegExp(this.filterBy.txt, "i");
      return this.contacts.filter((contact) => regex.test(contact.name));
    },
    contacts() {
      return this.$store.state.contactStore.contacts;
    },
  },
  components: {
    ContactList,
    ContactFilter,
    UserMsg,
  },
};
</script>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>