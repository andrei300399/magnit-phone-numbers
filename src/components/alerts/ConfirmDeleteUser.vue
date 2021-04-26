<template>
  <div class="confirm-full-screen-background">
    <div class="confirm-message-frame">
      <p class="confirm-message-frame__message-text">
        {{ message }}
      </p>
      <form class="confirm-message-frame__form">
        <button
          v-on:click.prevent="Accept"
          class="confirm-message-frame__button-yes"
        >
          Да
        </button>
        <button
          v-on:click.prevent="Decline"
          class="confirm-message-frame__button-no"
        >
          Нет
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message", "email"],
  methods: {
    Accept() {
      this.$emit("ConfirmAction", {answer: true, email: this.email});
    },
    Decline() {
      this.$emit("ConfirmAction", {answer: false, email: this.email});
    },
  },
};

</script>

<style lang="css">

@import "../../../public/css/confirm_style.css";

</style>