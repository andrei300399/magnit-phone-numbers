<template>
  <div class="confirm-full-screen-background">
    <div class="confirm-number-frame">
      <p class="confirm-number-frame__number-text">
        На номер {{ number }} отправлен код, введите его ниже:
      </p>
      <form
        class="confirm-number-frame__form"
        @submit.prevent="submitConfirmCode"
      >
        <input
          type="number"
          @input="updateValue1"
          v-model="firstNumb"
          id="i1"
          ref="i1"
          maxlength="1"
          size="1"
          class="confirm-number-frame__form__input"
          :class="{
            invalid_input: $v.firstNumb.$dirty && !$v.firstNumb.required,
          }"
        />
        <input
          type="number"
          v-model="secondNumb"
          @input="updateValue2"
          id="i2"
          ref="i2"
          maxlength="1"
          size="1"
          class="confirm-number-frame__form__input"
          :class="{
            invalid_input: $v.secondNumb.$dirty && !$v.secondNumb.required,
          }"
        />
        <input
          type="number"
          v-model="thirdNumber"
          @input="updateValue3"
          id="i3"
          ref="i3"
          maxlength="1"
          size="1"
          class="confirm-number-frame__form__input"
          :class="{
            invalid_input: $v.thirdNumber.$dirty && !$v.thirdNumber.required,
          }"
        />
        <input
          type="number"
          v-model="fourthNumber"
          @input="updateValue4"
          id="i4"
          ref="i4"
          maxlength="1"
          size="1"
          class="confirm-number-frame__form__input"
          :class="{
            invalid_input: $v.fourthNumber.$dirty && !$v.fourthNumber.required,
          }"
        />

        <button
          ref="btn"
          type="submit"
          class="confirm-number-frame__button-done"
        >
          Готово
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
export default {
  props: ["email", "number"],
  data: () => ({
    firstNumb: "",
    secondNumb: "",
    thirdNumber: "",
    fourthNumber: "",
  }),
  validations: {
    firstNumb: { required },
    secondNumb: { required },
    thirdNumber: { required },
    fourthNumber: { required },
  },
  methods: {
    updateValue1(event) {
      this.firstNumb = event.target.value % 10;
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$refs.i2.focus();
      });
    },
    updateValue2(event) {
      this.secondNumb = event.target.value % 10;
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$refs.i3.focus();
      });
    },
    updateValue3(event) {
      this.thirdNumber = event.target.value % 10;
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$refs.i4.focus();
      });
    },
    updateValue4(event) {
      this.fourthNumber = event.target.value % 10;
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$refs.btn.focus();
      });
    },
    async submitConfirmCode() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      let enteredCode =
        String(this.firstNumb) +
        this.secondNumb +
        this.thirdNumber +
        this.fourthNumber;

      axios.defaults.headers.common["Authorization"] = `${this.email}`;

      axios
        .post(
          `${process.env.VUE_APP_PROXY}/send_phone_code?phone=${this.number}&code=${enteredCode}`
        )
        .then((suc) => {
          this.$emit("confirm", true, suc.data, this.number);
        })
        .catch((err) => {
          this.ErrorMessage = "Что-то пошло не так";
          this.ErrorVisible = true;

          this.$emit("confirm", false, err, this.number);
        });
    },
  },
};
</script>

<style lang="scss">
// body {
//     margin: 0;
//     padding: 0;
//     font-family: 'Loew Next';
//     font-style: normal;
//     font-weight: 400;
// }

.full-screen-background {
  position: fixed;
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

.confirm-number-frame {
  z-index: 102;
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 308px;
  height: 341px;
  background: #fff5f5;
  border-radius: 50px;
}

.confirm-number-frame__number-text {
  font-family: Loew Next;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */

  text-align: center;
  color: #000000;

  margin: 30px 15px 6px 15px;

  padding: 0;
}

.confirm-number-frame__form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

/* display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 15px 40px;
    outline: none;

    width: 152px;
    height: 60px;

    background: #E30613;
    border-radius: 60px;

    text-decoration: none;
    font-family: Loew Next;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 30px;
   


    color: #FFFFFF; */

.confirm-number-frame__button-done {
  border: none;
  outline: none;
  transition: all 0.5s ease;
  cursor: pointer;
  text-decoration: none;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 40px;
  margin-top: 55px;

  width: 152px;
  height: 60px;

  background: #e30613;
  border-radius: 60px;

  text-decoration: none;
  font-family: Loew Next;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
}

.confirm-number-frame__button-done:hover {
  /* background-color: #e4e4e4b9;
    color: #ffffff;
    border-color: #ffffff00; */
  background-color: #ff0011;
  transition: all 0.5s ease;
}

.confirm-number-frame__button-done:active {
  /* color: #ffffff;     */
  background-color: #ffffff;
  /* color: #000000; */
  color: #e30613;
  transition: all 0.1s ease;
}

.confirm-number-frame__form__input {
  border: none;
  border-bottom: 1px solid #000000;
  text-decoration: none;
  background-color: inherit;
  outline: none;
  width: 42px;
  /* height: 111px; */
  font-family: Loew Next;
  font-style: normal;
  font-weight: normal;
  font-size: 50px;
  /* line-height: 111px; */
  margin-right: 10px;
  text-align: center;
  color: #000000;
}

.invalid_input {
  border-bottom: 2px solid #e30613 !important;
}

i4 {
  margin-right: 0;
}

.confirm-number-frame__form__input::-webkit-outer-spin-button,
.confirm-number-frame__form__input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0;
  /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield;
}

@media (min-width: 1170px) {
  .confirm-number-frame {
    width: 569px;
    height: 443px;
  }

  .confirm-number-frame__number-text {
    font-family: Loew Next;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 33px;
    text-align: center;
    color: #000000;
    margin: 70px 71px 12px 71px;
    padding: 0;
  }

  .confirm-number-frame__form {
    margin-bottom: 65px;
  }

  .confirm-number-frame__button-done {
    border: none;
    outline: none;
    transition: all 0.5s ease;
    cursor: pointer;
    text-decoration: none;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 15px 40px;
    margin-top: 55px;

    width: 152px;
    height: 60px;

    background: #e30613;
    border-radius: 60px;

    text-decoration: none;
    font-family: Loew Next;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 30px;
    color: #ffffff;
  }

  .confirm-number-frame__form__input {
    border: none;
    border-bottom: 1px solid #000000;
    text-decoration: none;
    background-color: inherit;
    outline: none;
    width: 84px;
    height: 111px;
    font-family: Loew Next;
    font-style: normal;
    font-weight: normal;
    font-size: 75px;
    line-height: 111px;
    margin-right: 29.97px;
    text-align: center;
    color: #000000;
  }
}
</style>