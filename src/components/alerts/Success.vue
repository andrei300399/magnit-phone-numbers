<template>
  <div class="suc-full-screen-background">
    <div class="confirm-message-frame">
      <p class="confirm-message-frame__message-text">
        {{ message }}
      </p>
      <form class="confirm-message-frame__form" @submit.prevent="onOK">
        <button type="submit" class="confirm-message-frame__button-ok">
          ОК
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
  methods: {
    onOK() {
      this.$emit("ok");
    },
  },
};
</script>

<style lang="scss">
// @font-face {
//   font-family: "Loew Next";
//   src: url("../../public/fonts/LoewNext-Regular.woff2"),
//     url("../../public/fonts/LoewNext-Regular.woff");
//   font-style: normal;
//   font-weight: 400;
//   font-display: swap;
// }

body {
  margin: 0;
  padding: 0;
  font-family: "Loew Next";
  font-style: normal;
  font-weight: 400;
}

.suc-full-screen-background {
  position: fixed !important;

  display: flex;
  justify-content: center;
  align-items: center;
  left: 0px;
  top: 0px;
  min-height: 100%;
  width: 100%;
  background: rgba(216, 216, 216, 0.71);
  z-index: 101;
  transform: all 0.5s ease;
}

.confirm-message-frame {
  z-index: 102;
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 308px;
  min-height: 200px;
  background: #fff5f5;
  border-radius: 50px;
  transform: all 0.5s ease;
}

.confirm-message-frame__message-text {
  font-family: Loew Next;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #000000;
  margin: 33px 15px 20px 15px;
  padding: 0;
}

.confirm-message-frame__form {
  margin-bottom: 33px;
}

.confirm-message-frame__button-ok {
  width: 114px;
  height: 60px;
  border: none;
  outline: none;
  border: 1px solid #000000;
  background-color: inherit;
  box-sizing: border-box;
  border-radius: 60px;
  transition: all 0.5s ease;
  cursor: pointer;

  text-decoration: none;
  font-family: Loew Next;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
}

.confirm-message-frame__button-ok:hover {
  background-color: #e4e4e4b9;
  border-color: #dbdbdb00;
  /*  
    border-color: #dbdbdb00;
    color: #FFF5F5;
    background-color: #000000b9;
    */
  transition: all 0.5s ease;
}

.confirm-message-frame__button-ok:active {
  /* color: #000000;
    background-color: #e4e4e4b9;
    border-color: #000000; */
  border-color: #dbdbdb00;
  background-color: #ffffff;
  transition: all 0.1s ease;
}

@media (min-width: 1170px) {
  .confirm-message-frame {
    width: 569px;
    min-height: 341px;
  }

  .confirm-message-frame__message-text {
    font-weight: 500;
    font-size: 22px;
    line-height: 33px;
    margin: 99px 15px 50px 15px;
  }

  .confirm-message-frame__form {
    margin-bottom: 99px;
  }
}
</style>