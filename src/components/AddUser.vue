<template>
  <div class="full-screen-background">
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
      @DeleteNumber="DeleteNumber"
    />

    <div v-if="loading" class="lk-loader">
      <Loader />
    </div>
    <section v-if="!loading" class="edit__card" style="margin-top: 35px">
      <div v-if="!loading" class="edit__card__employee" id="edit_user">
        <div class="edit__card__employee__table-link">
          <a
            class="light-hover edit__card__employee__table-link__link"
            v-on:click.prevent="closeForm()"
          >
            <img src="img/right 1.svg" alt="к таблице" class="edit__left-arrow" />
            <p class="edit__card__employee__table-link-text">К таблице</p>
          </a>
        </div>

        <div class="edit__card__employee__account">
          <img class="edit__card__employee__avatar" src="img/Ава.svg" alt="avatar" />
          <!-- @submit.prevent="handleSubmitAdmin"          -->
          <form
            v-if="isAdmin && width >= 1170"
            class="edit__card__employee__account-admin-only-form"
          >
            <input
              v-model="lastname"
              type="text"
              name="lastname"
              class="edit__card__employee__account-text edit__admin-only-input"
              placeholder="Введите Фамилию"
              value=""
              @v-on:change="lastnameChanged()"
              :class="{
                invalid:
                  ($v.lastname.$dirty && !$v.lastname.required) ||
                  ($v.lastname.$dirty && !$v.lastname.minLength),
              }"
            />
            <div
              v-if="
                ($v.lastname.$dirty && !$v.lastname.required) ||
                ($v.lastname.$dirty && !$v.lastname.minLength)
              "
              class="edit__card__wrap"
            ></div>

            <p
              class="input__error-message"
              v-if="
                ($v.lastname.$dirty && !$v.lastname.required) ||
                ($v.lastname.$dirty && !$v.lastname.minLength)
              "
            >
              Это поле не должно быть короче хотя бы
              {{ $v.lastname.$params.minLength.min }} символов
            </p>
            <input
              v-model="firstname"
              type="text"
              name="number"
              class="edit__card__employee__account-text edit__admin-only-input"
              placeholder="Введите Имя"
              value=""
              :class="{
                invalid:
                  ($v.firstname.$dirty && !$v.firstname.required) ||
                  ($v.firstname.$dirty && !$v.firstname.minLength),
              }"
            />
            <p
              class="input__error-message"
              v-if="
                ($v.firstname.$dirty && !$v.firstname.required) ||
                ($v.firstname.$dirty && !$v.firstname.minLength)
              "
            >
              Это поле не должно быть короче хотя бы
              {{ $v.firstname.$params.minLength.min }} символов
            </p>
            <input
              v-model="middlename"
              type="text"
              name="middlename"
              class="edit__card__employee__account-text edit__admin-only-input"
              placeholder="Введите Отчество"
              value=""
            />
            <!-- <p class="edit__card__employee__account-text">
              {{ dateOfBirth | date("dateOfBirth") }}
            </p> -->

            <input
              autocomplete="off"
              v-model="dateOfBirth"
              type="date"
              name="dateOfBirth"
              class="edit__card__employee__account-text edit__admin-only-input"
              placeholder="Выберете дату рождения"
              value="email"
              :class="{
                invalid: $v.dateOfBirth.$dirty && !$v.dateOfBirth.required,
              }"
            />
            <p
              class="input__error-message"
              v-if="$v.dateOfBirth.$dirty && !$v.dateOfBirth.required"
            >
              Требуется ввести дату рождения
            </p>

            <p class="edit__card__employee__account-text">{{ email }}</p>
            <input
              v-model="post"
              type="text"
              name="post"
              class="edit__card__employee__account-text edit__admin-only-input"
              placeholder="Введите должность"
              value="должность"
              :class="{
                invalid:
                  ($v.post.$dirty && !$v.post.required) ||
                  ($v.post.$dirty && !$v.post.minLength),
              }"
            />
            <p
              class="input__error-message"
              v-if="
                ($v.post.$dirty && !$v.post.required) ||
                ($v.post.$dirty && !$v.post.minLength)
              "
            >
              Это поле не должно быть короче хотя бы
              {{ $v.post.$params.minLength.min }} символов
            </p>
            <input
              v-model="department"
              type="text"
              name="department"
              class="edit__card__employee__account-text edit__admin-only-input"
              placeholder="Введите название отдела"
              value="название отдела"
              :class="{
                invalid:
                  ($v.department.$dirty && !$v.department.required) ||
                  ($v.department.$dirty && !$v.department.minLength),
              }"
            />
            <p
              class="input__error-message"
              v-if="
                ($v.department.$dirty && !$v.department.required) ||
                ($v.department.$dirty && !$v.department.minLength)
              "
            >
              Это поле не должно быть короче хотя бы
              {{ $v.department.$params.minLength.min }} символов
            </p>
            <div
              v-if="
                ($v.department.$dirty && !$v.department.required) ||
                ($v.department.$dirty && !$v.department.minLength)
              "
              class="edit__card__wrap"
            ></div>
          </form>
        </div>

        <div class="edit__card__wrap"></div>
        <!-- handleSubmitTelephone -->
        <form class="edit__card__employee__numbers">
          <div>
            <div
              class="edit__card__employee__numbers__telephone-number"
              v-for="(phone, idx) in phones"
              v-bind:key="idx"
            >
              <input
                type="text"
                v-model.trim="phones[idx].phone"
                name="number"
                class="edit__telephone-number-text"
                placeholder="Введите номер"
                @keypress="isNumber($event)"
              />

              <img
                class="edit__delete-number__minus light-hover"
                src="img/Минус.svg"
                alt="Удалить номер"            
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
            class="edit__card__employee__numbers__add-number light-hover"
            v-on:click="addNewPhone"
            v-if="phones.length < 5"
          >
            <img
              src="img/Плюс.svg"
              alt="добавить номер"
              class="add-number__plus"
            />
          </div>

          <div class="edit__card__wrap"></div>
          <!-- light-hover -->
          <button
            v-on:click.prevent="handleSubmitAdmin"
            class="edit__card__employee__numbers__button-save"
          >
            Сохранить
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import Loader from "../components/Loader";
import axios from "axios";
import Success from "../components/alerts/Success.vue";
import ConfirmNumber from "../components/alerts/ConfirmNumber.vue";
import ConfirmAdminSaving from "../components/alerts/ConfirmAdminSaving.vue";
import Error from "../components/alerts/Error.vue";
import ConfirmDeleteNumber from "../components/alerts/ConfirmDeleteNumber.vue";

export default {
  name: "account",
  data: () => ({
    width: 0,

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

    email: "",
    oldEmail: "",

    dateOfBirth: null,
    oldDateOfBirth: null,

    avatar: null,
    loading: false,

    SuccessVisible: false,
    SuccessMessage: "",

    ErrorVisible: false,
    ErrorMessage: "",

    ConfirmDeleteNumberVisible: false,
    ConfirmDeleteNumberMessage: "",
    ConfirmDeleteNumberIndex: 0,

    ConfirmSavingAdminVisible: false,
    ConfirmSavingAdminMessage: "",
  }),
  validations: {
    dateOfBirth: { required },
    email: { required, email },
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
    // axios
    //   .get(`${process.env.VUE_APP_PROXY}/user`, {
    //     headers: {
    //       Authorization: this.email,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     if (response.data) {
    //       this.avatar = response.data.avatar;
    //       this.firstname = response.data.first_name || "";
    //       this.oldFirstname = response.data.first_name || "";
    //       this.middlename = response.data.middle_name || "";
    //       this.oldMiddlename = response.data.middle_name || "";
    //       this.lastname = response.data.last_name || "";
    //       this.oldLastname = response.data.last_name || "";
    //       this.post = response.data.post || "";
    //       this.oldPost = response.data.post || "";
    //       this.department = response.data.division || "";
    //       this.oldDepartment = response.data.division || "";
    //       this.dateOfBirth = response.data.birthday || "";

    //       axios
    //         .get(`${process.env.VUE_APP_PROXY}/get_numbers`, {
    //           headers: {
    //             Authorization: this.email,
    //           },
    //         })
    //         .then((phones) => {
    //           console.log(phones.data);
    //           if (phones.data) {
    //             this.phones = phones.data;
    //           } else {
    //             throw error;
    //           }
    //           this.phones = this.phones.map((phone) => ({
    //             phone,
    //             oldPhone: phone,
    //             isCorrect: true,
    //             changed: false,
    //             isNew: false,
    //           }));
    //           this.loading = !this.loading;
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     } else {
    //       throw error;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  methods: {
    CloseSuccessAlert() {
      this.SuccessVisible = false;
    },
    CloseErrorAlert() {
      this.ErrorVisible = false;
    },

    closeForm() {
      this.$emit("close");
    },

    async AdminSavePersonalInfo(agreement) {
      this.ConfirmSavingAdminVisible = false;
      if (!agreement) {
        return;
      }

      this.loading = true;
      const json = {
        email: `${this.email}`,
        first_name: `${this.firstname}`,
        last_name: `${this.lastname}`,
        middle_name: `${this.middlename}`,
        // birthday: `${new Date(this.dateOfBirth)}`,
        post: `${this.post}`,
        division: `${this.department}`,
      };

      // axios.defaults.headers.common["Authorization"] = `${this.email}`;
      await axios
        .post(`${process.env.VUE_APP_PROXY}/add_user`, json)
        .then((response) => {
          if (response.data.status == "SUCCESS") {
            this.$emit("ok", true);
          } else {
            this.$emit("ok", false);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await this.handleSubmitTelephone();
      this.SuccessMessage = "Данные успешно обновлены!";
      console.log("jfhdjfgk");
      this.SuccessVisible = true;
    },
    async DeleteNumber(agreement, idx) {
      this.ConfirmDeleteNumberVisible = false;
      if (!agreement) {
        return;
      }
      axios.defaults.headers.common["Authorization"] = `${this.email}`;
      await axios
        .post(
          `${process.env.VUE_APP_PROXY}/delete_number?phone=${this.phones[idx].oldPhone}`
        )
        .then((response) => {
          console.log(response.data);
          console.log(response);

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
      axios.defaults.headers.common["Authorization"] = `${this.email}`;
      for (let i = 0; i < this.phones.length; i++) {
        if (this.phones[i].isNew) {
          await axios
            .post(
              `${process.env.VUE_APP_PROXY}/add_number_admin?phone=${this.phones[i].phone}`
            )
            .then((response) => {
              console.log(response.data);
              console.log(response);
              this.SuccessMessage = `Номер ${this.phones[i].phone} успешно добавлен`;
              this.phones[i].oldPhone = this.phones[i].phone;
              this.phones[i].isNew = false;
              this.SuccessVisible = true;
            })
            .catch((err) => {
              // console.log(err);
              // alert("Ошибка соединения с сервером! Повторите попытку позже");
              this.ErrorMessage =
                "Ошибка соединения с сервером! Повторите попытку позже";
              this.ErrorVisible = true;
            });
        } else if (this.phones[i].changed && this.isAdmin) {
          axios
            .post(
              `${process.env.VUE_APP_PROXY}/change_phone?old_number=${this.phones[i].oldPhone}&new_number=${this.phones[i].phone}`
            )
            .then((response) => {
              if (response.data.status == "SUCCESS") {
                this.SuccessMessage = `Номер телефона успешно обновлен с ${this.phones[i].oldPhone} на ${this.phones[i].phone}`;
                this.SuccessVisible = true;
                this.phones[i].oldPhone = this.phones[i].phone;
                this.phones[i].isNew = false;
              } else {
                this.ErrorMessage =
                  "Ошибка соединения с сервером! Повторите попытку позже";
                this.ErrorVisible = true;
              }
            })
            .catch((err) => {
              console.log(err);

              this.ErrorMessage = "Что-то пошло не так";
              this.ErrorVisible = true;
            });
        }
      }
      this.loading = false;
    },
    async handleSubmitAdmin() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (!this.isAdmin) {
        return;
      }

      this.ConfirmSavingAdminMessage = `Вы действительно хотите добавить этого пользователя?`;
      this.ConfirmSavingAdminVisible = true;
    },
    addNewPhone() {
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
@import "../../public/css/edit_style.css";
</style>