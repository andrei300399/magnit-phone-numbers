<template>
  <div class="err-full-screen-background">
    <div class="error-message-frame">
      <p class="error-message-frame__heading">ОШИБКА!</p>
      <p class="error-message-frame__message-text">
       {{message}}
      </p>
      <form class="error-message-frame__form" @submit.prevent="onOK">
        <button type="submit" class="error-message-frame__button-back">Назад</button>
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
body {
  margin: 0;
  padding: 0;
  font-family: "Loew Next";
  font-style: normal;
  font-weight: 400;
}

.err-full-screen-background {
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
}

.error-message-frame {
  z-index: 102;
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 308px;
  min-height: 236px;
  /* padding: 64px 0 64px 0; */
  background: #ff3c3c;
  border-radius: 50px;
}

.error-message-frame__heading {
  font-family: Loew Next;
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 45px;
  text-align: center;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #ffffff;
  padding: 0;
  margin: 30px 0 20px 0;
}

.error-message-frame__message-text {
  font-family: Loew Next;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #6b4949;
  margin: 0 15px 0 15px;
  padding: 0;
}

.error-message-frame__form {
  margin-top: 30px;
  margin-bottom: 30px;
}

.error-message-frame__button-back {
  width: 149px;
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

.error-message-frame__button-back:hover {
  /* background-color: #e4e4e4b9;
    border-color: #dbdbdb00; */
  border-color: #dbdbdb00;
  background-color: #ffffff;
  /* background-color:  #ff0011;
    border-color: #dbdbdb00; */
  transition: all 0.5s ease;
}

.error-message-frame__button-back:active {
  /* opacity: 1;
    filter: alpha(opacity=100); */
  /* color: #9c0000;
    border-color: #9c0000; */
  /* border-color: #dbdbdb00;
    background-color: #ffffff; */
  background-color: #e4e4e4b9;
  border-color: #dbdbdb00;
  transition: all 0.1s ease;
}

@media (min-width: 1170px) {
  .error-message-frame {
    width: 569px;
    min-height: 341px;
  }

  .error-message-frame__heading {
    font-weight: 800;
    font-size: 30px;
    line-height: 45px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0;
    margin: 64px 0 25px 0;
  }

  .error-message-frame__message-text {
    font-weight: 500;
    font-size: 22px;
    line-height: 33px;
  }

  .error-message-frame__form {
    margin-top: 50px;
    margin-bottom: 64px;
  }
}
</style>