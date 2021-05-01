<template>
  <div>
    <section class="logo">
      <a href="https://magnit.ru/">
        <img class="light-hover" src="img/Лого.svg" alt="logo" />
      </a>
    </section>

    <!-- <ConfirmNumber/> -->

    <Success
      v-if="SuccessVisible"
      :message="this.SuccessMessage"
      @ok="CloseSuccessAlert"
    />
    <Confirm-admin-saving
      v-if="ConfirmSavingAdminVisible"
      :message="this.ConfirmSavingAdminMessage"
      @SaveInfo="AdminSavePersonalInfo"
    />
    <Error
      v-if="ErrorVisible"
      :message="this.ErrorMessage"
      @ok="CloseErrorAlert"
    />
    <Confirm-delete-number
      v-if="ConfirmDeleteNumberVisible"
      :message="this.ConfirmDeleteNumberMessage"
      :index="ConfirmDeleteNumberIndex"
      @ConfirmAction="DeleteNumber"
    />

    <ConfirmNumber
      v-if="ConfirmNumberVisible"
      :number="NumberToConfirm"
      :email="email"
      @confirm="AfterConfirmNumber"
    />

    <div v-if="loading" class="lk-loader">
      <Loader />
    </div>
    <section v-if="!loading" class="card" style="margin-top: 35px">
      <div class="card__employee">
        <div v-if="isAdmin" class="card__employee__table-link">
          <a
            class="light-hover card__employee__table-link__link"
            href="./numbers"
          >
            <img src="img/right 1.svg" alt="к таблице" class="left-arrow" />
            <p class="card__employee__table-link-text">К таблице</p>
          </a>
        </div>

        <div v-if="!isAdmin" class="card__employee__instead-of-link"></div>

        <div class="card__employee__account">
          <img class="card__employee__avatar" src="img/Ава.svg" alt="avatar" />
          <!-- v-if="!(isAdmin && width >= 1170)" -->
          <div class="card__employee__account__user-account-info">
            <p class="card__employee__account-text">
              {{ lastname }} {{ firstname }} {{ middlename }}  
            </p>
            <p class="card__employee__account-text">
              
               {{ dateOfBirth | date("date") }}
            </p>
            <p class="card__employee__account-text">{{ email }}</p>
            <p class="card__employee__account-text">{{ department }}</p>
            <p class="card__employee__account-text">{{ post }}</p>

            <button
              @click.prevent="logout"
              class="card__employee__account__button-exit"
            >
              Выход
            </button>
          </div>        
        </div>

        <div class="card__wrap"></div>

        <form
          @submit.prevent="handleSubmitTelephone"
          class="card__employee__numbers"
        >
          <div>
            <div
              class="card__employee__numbers__telephone-number"
              v-for="(phone, idx) in phones"
              v-bind:key="idx"
            >
              <input
                autocomplete="off"
                v-bind:readonly="!phone.isNew"
                type="text"
                v-model.trim="phones[idx].phone"
                :key="idx"
                name="number"
                class="telephone-number-text"
                placeholder="Введите номер"
                @keypress="isNumber($event)"
              />

              <img
                class="delete-number__minus light-hover"
                src="img/Минус.svg"
                alt="Удалить номер"
                v-if="phones.length > 1"
                v-on:click="removeOldPhone(idx)"
              />
              <div
                class="input__number-error-message"
                v-if="!phones[idx].isCorrect"
              >
                *Это поле не должно быть пустым
              </div>
            </div>
          </div>

          <div
            class="card__employee__numbers__add-number light-hover"
            v-on:click="addNewPhone"
            v-if="phones.length < 5"
          >
            <img
              src="img/Плюс.svg"
              alt="добавить номер"
              class="add-number__plus"
            />
          </div>

          <div class="card__wrap"></div>
          <!-- light-hover -->
          <button type="submit" class="card__employee__numbers__button-save">
            Сохранить
          </button>
          <a
          href="https://magnit-server.herokuapp.com/msal4jsample/sign_out"
            @click.prevent="logout"
            class="card__employee__account__button-exit-mobile light-hover"
          >
            Выход
          </a>
        </form>
      </div>

      <div class="card__wrap"></div>
      <p v-if="isAdmin" class="card__warning">
        *Для редактирования таблицы перейдите в полную версию сайта
      </p>
      <div v-if="!isAdmin" class="card__instead-of-warning"></div>
    </section>
    <footer class="footer">
      <a class="footer__logo-link" href="https://magnit.ru/">
        <img
          class="footer__logo light-hover"
          src="img/Лого футер.svg"
          alt="footer-logo"
        />
      </a>
      <p class="footer__text text-support">
        Техническая поддержка: <br />
        8 800 200-90-02
      </p>
      <a href="https://magnit.ru/" class="footer__text text-policy light-hover">
        Политика обработки персональных данных
      </a>
    </footer>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import Loader from "../components/Loader.vue";
import axios from "axios";
import Success from "../components/alerts/Success.vue";
import Error from "../components/alerts/Error.vue";
import ConfirmDeleteNumber from "../components/alerts/ConfirmDeleteNumber.vue";
import ConfirmAdminSaving from "../components/alerts/ConfirmAdminSaving.vue";
import ConfirmNumber from "../components/alerts/ConfirmNumber.vue";

export default {
  name: "account",
  data: () => ({
    width: 0,

    nowAdded: false,

    phones: [],

    // isAdmin: true,
    isAdmin: true,

    firstname: "",
    oldFirstname: "",

    middlename: "",
    oldMiddlename: "",

    lastname: "",
    oldLastname: "",

    post: "",
    oldPost: "",

    department: "",
    oldDepartment: "",

   
    email: "pack.vg@agabon.ru",   
    dateOfBirth: "",
    avatar: null,
    loading: true,

    SuccessVisible: false,
    SuccessMessage: "",

    ErrorVisible: false,
    ErrorMessage: "",

    ConfirmDeleteNumberVisible: false,
    ConfirmDeleteNumberMessage: "",
    ConfirmDeleteNumberIndex: 0,

    ConfirmSavingAdminVisible: false,
    ConfirmSavingAdminMessage: "",

    ConfirmNumberVisible: false,
    NumberToConfirm: "",
  }),
  validations: {
    firstname: { required, minLength: minLength(3) },
    lastname: { required, minLength: minLength(3) },
    post: { required, minLength: minLength(3) },
    department: { required, minLength: minLength(3) },
  },
  components: {
    Loader,
    Success,
    Error,
    ConfirmDeleteNumber,
    ConfirmAdminSaving,
    ConfirmNumber,
  },
  async mounted() {},
  async created() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth);
    // axios.defaults.headers.common["Authorization"] = `${this.email}`;
    axios
      .get(`${process.env.VUE_APP_PROXY}/user`, {
        headers: {
          Authorization: this.email,
        },
      })
      .then((response) => {
        if (response.data) {
          this.avatar = response.data.avatar;
          this.firstname = response.data.first_name || "";
          this.oldFirstname = response.data.first_name || "";
          this.middlename = response.data.middle_name || "";
          this.oldMiddlename = response.data.middle_name || "";
          this.lastname = response.data.last_name || "";
          this.oldLastname = response.data.last_name || "";
          this.post = response.data.post || "";
          this.oldPost = response.data.post || "";
          this.department = response.data.division || "";
          this.oldDepartment = response.data.division || "";         
          this.dateOfBirth = response.data.birthday || new Date();

          axios
            .get(`${process.env.VUE_APP_PROXY}/get_numbers`, {
              headers: {
                Authorization: this.email,
              },
            })
            .then((phones) => {
              if (phones.data) {
                this.phones = phones.data;
              } else {
                throw error;
              }
              this.phones = this.phones.map((phone) => ({
                phone,
                oldPhone: phone,
                isCorrect: true,
                changed: false,
                isNew: false,
              }));
              this.loading = !this.loading;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    CloseSuccessAlert() {
      this.SuccessVisible = false;
    },
    CloseErrorAlert() {
      this.ErrorVisible = false;
    },
    AfterConfirmNumber(suc, respData, number) {
      this.ConfirmNumberVisible = false;

      if (!suc) {
        this.ErrorMessage =
          "Ошибка соединения с сервером! Повторите попытку позже";
        this.ErrorVisible = true;
        return;
      }

      if (respData.status == "SUCCESS") {
        this.phones[this.phones.length - 1].isNew = false;
        this.SuccessMessage = `Номер ${number} успешно добавлен`;
        this.SuccessVisible = true;
      } else {
        this.ErrorMessage = "Неверный код подтверждения! Попробуйте еще раз";
        this.ErrorVisible = true;
      }
    },

    async DeleteNumber(resp) {      

      this.ConfirmDeleteNumberVisible = false;
      if (!resp.answer) {
        return;
      }
       this.loading = true;
      const idx = this.ConfirmDeleteNumberIndex;

      axios.defaults.headers.common["Authorization"] = `${this.email}`;
      await axios
        .post(
          `${process.env.VUE_APP_PROXY}/delete_number?phone=${this.phones[idx].oldPhone}`
        )
        .then((response) => {
          if (response.data.status == "SUCCESS") {
            // alert(`Номер ${this.phones[idx].phone} успешно удалён`);
            this.SuccessMessage = `Номер ${this.phones[idx].phone} успешно удалён`;
            this.SuccessVisible = true;
            this.phones.splice(idx, 1);
          } else {
            // alert("Ошибка соединения с сервером! Повторите попытку позже");
            this.ErrorMessage =
              "Ошибка соединения с сервером! Повторите попытку позже";
            this.ErrorVisible = true;
          }
        })
        .catch((err) => {
          // console.log(err);
          // alert("Что-то пошло не так!");
          this.ErrorMessage = "Что-то пошло не так";
          this.ErrorVisible = true;
        });
         this.loading = false;
    },
    logout() {
      alert("Выход");
    },
    checkPhones() {
      let allCorrect = true;
      for (let i = 0; i < this.phones.length; i++) {
        if (this.phones[i].phone.length == 0) {
          this.phones[i].isCorrect = false;
          allCorrect = false;
        }
        if (this.phones[i].phone != this.phones[i].oldPhone) {
          this.phones[i].changed = true;
        }
      }
      return allCorrect;
    },
    async handleSubmitTelephone() {
      if (!this.checkPhones()) {
        this.ErrorMessage =
          "Невозможно сохранить изменения. Заполните все поля или удалите пустые!";
        this.ErrorVisible = true;
        return;
      }

      if (!this.phones[this.phones.length - 1].isNew) {
        return;
      }
      this.phones[this.phones.length - 1].isCorrect = true;
      axios.defaults.headers.common["Authorization"] = `${this.email}`;
      await axios
        .post(
          `${process.env.VUE_APP_PROXY}/add_number?phone=${
            this.phones[this.phones.length - 1].phone
          }`
        )
        .then((response) => {
          // здесь обработка ответа сервера
          this.NumberToConfirm = this.phones[this.phones.length - 1].phone;
          this.ConfirmNumberVisible = true;
        })
        .catch((err) => {
          console.log(err);
          // alert("Ошибка соединения с сервером! Повторите попытку позже");
          this.ErrorMessage =
            "Ошибка соединения с сервером! Повторите попытку позже";
          this.ErrorVisible = true;
        });
    },

    addNewPhone() {
      for (let i = 0; i < this.phones.length; i++) {
        if (this.phones[i].isNew) {
          this.SuccessMessage =
            "Сначала заполните и сохраните уже существующую пустую форму";
          this.SuccessVisible = true;
          return;
        }
      }

      this.phones.push({
        phone: "",
        oldPhone: "",
        isCorrect: true,
        changed: true,
        isNew: true,
      });
    },

    async removeOldPhone(idx) {
      if (this.phones[idx].isNew) {
        this.phones.splice(idx, 1);
        return;
      }

      if (
        this.phones.length === 1 ||
        (this.phones.length === 2 && this.phones[1].isNew)
      ) {
        this.SuccessMessage = "Сначала добавьте новый номер!";
        this.SuccessVisible = true;
        return;
      }

      this.ConfirmDeleteNumberMessage = `Вы действительно хотите безвозвратно удалить номер ${this.phones[idx].oldPhone}?`;
      this.ConfirmDeleteNumberIndex = idx;
      this.ConfirmDeleteNumberVisible = true;
    },

    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    updateWidth() {
      this.width = window.innerWidth;
    },
  },
  actions: {},
};
</script>

<style lang="scss">

@import "../../public/css/style.css";

.lk-loader {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  padding-left: calc(50% - 585px);
  padding-right: calc(50% - 585px);
  margin-bottom: 132px;
  height: 878px;
}

.card__employee__instead-of-link {
  display: none;
}

@media (min-width: 1170px) {
  .card__employee__instead-of-link {
    display: block;
    width: 449px;
    height: 35px;
    margin-bottom: 64px;
  }
}
</style>
