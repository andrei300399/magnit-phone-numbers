<template>
  <div>
    <section class="logo">
      <a href="https://magnit.ru/">
        <img class="light-hover" src="img/Лого.svg" alt="logo" />
      </a>
    </section>

    <div v-if="loading" class="lk-loader">
      <Loader />
    </div>
    <section v-if="!loading" class="card" style="margin-top: 35px">
      <div class="card__employee">
        <a class="light-hover card__employee__table-link" href="./admin">
          <img src="img/right 1.svg" alt="к таблице" class="left-arrow" />
          <p class="card__employee__table-link-text">К таблице</p>
        </a>

        <div class="card__employee__account">
          <img class="card__employee__avatar" src="img/Ава.svg" alt="avatar" />
          <div
            v-if="!(isAdmin && width >= 1170)"
            class="card__employee__account__user-account-info"
          >
            <p class="card__employee__account-text">
              {{ lastname }} {{ middlename }} {{ firstname }}
            </p>
            <p class="card__employee__account-text">
              {{ dateOfBirth | date("date") }}
            </p>
            <p class="card__employee__account-text">{{ email }}</p>
            <p class="card__employee__account-text">{{ department }}</p>
            <p class="card__employee__account-text">{{ post }}</p>

            <button
              @click.prevent="logout"
              class="card__employee__account__button-exit light-hover"
            >
              Выход
            </button>
          </div>
          <form
            v-if="isAdmin && width >= 1170"
            @submit.prevent="handleSubmitAdmin"
            class="card__employee__account-admin-only-form"
          >
            <input
              v-model="lastname"
              type="text"
              name="lastname"
              class="card__employee__account-text admin-only-input"
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
              class="card__wrap"
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
              class="card__employee__account-text admin-only-input"
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
              class="card__employee__account-text admin-only-input"
              placeholder="Введите Отчество"
              value=""
            />
            <p class="card__employee__account-text">
              {{ dateOfBirth | date("dateOfBirth") }}
            </p>
            <p class="card__employee__account-text">{{ email }}</p>
            <input
              v-model="post"
              type="text"
              name="post"
              class="card__employee__account-text admin-only-input"
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
              class="card__employee__account-text admin-only-input"
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
              class="card__wrap"
            ></div>

            <button
              type="submit"
              class="card__employee__account-admin-only__button-save light-hover"
            >
              Сохранить
            </button>
          </form>
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
                type="text"
                v-model.trim="phones[idx].phone"
                name="number"
                class="telephone-number-text"
                placeholder="Введите номер"
                @keypress="isNumber($event)"
              />

              <img
                class="delete-number__minus light-hover"
                src="img/Минус.svg"
                alt="Удалить номер"
                v-if="idx > 0"
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

          <button
            type="submit"
            class="card__employee__numbers__button-save light-hover"
          >
            Сохранить
          </button>
          <button
            @click.prevent="logout"
            class="card__employee__account__button-exit-mobile light-hover"
          >
            Выход
          </button>
        </form>
      </div>

      <div class="card__wrap"></div>
      <p class="card__warning">
        *Для редактирования таблицы перейдите в полную версию сайта
      </p>
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

export default {
  name: "account",
  data: () => ({
    width: 0,

    phones: [],
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

    email: "2@mail.ru",
    dateOfBirth: "",
    avatar: null,
    loading: true,
  }),
  validations: {
    firstname: { required, minLength: minLength(3) },
    lastname: { required, minLength: minLength(3) },
    post: { required, minLength: minLength(3) },
    department: { required, minLength: minLength(3) },
  }, //
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
        console.log(response.data);
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
          this.dateOfBirth = response.data.birthday || "";

          axios
            .get(`${process.env.VUE_APP_PROXY}/get_numbers`, {
              headers: {
                Authorization: this.email,
              },
            })
            .then((phones) => {
              console.log(phones.data);
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
        alert(
          "Невозможно сохранить изменения. Заполните все поля или удалите пустые!"
        );
        return;
      }
      axios.defaults.headers.common["Authorization"] = `${this.email}`;
      for (let i = 0; i < this.phones.length; i++) {
        if (this.phones[i].isNew) {
          await axios
            .post(
              `${process.env.VUE_APP_PROXY}/add_number?phone=${this.phones[i].phone}`
            )
            .then((response) => {
              console.log(response.data);
              console.log(response);
              let code = prompt(
                `Введите код подтверждения, высланный на номер телефона ${this.phones[i].phone}`
              );
              axios
                .post(
                  `${process.env.VUE_APP_PROXY}/send_phone_code?phone=${this.phones[i].phone}&code=${code}`
                )
                .then((suc) => {
                  if (suc.data.status == "SUCCESS") {
                    alert(`Номер ${this.phones[i].phone} успешно добавлен`);
                  } else {
                    alert(
                      "Ошибка соединения с сервером! Повторите попытку позже"
                    );
                  }
                })
                .catch((err) => {
                  alert("Что-то пошло не так");
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
              alert("Ошибка соединения с сервером! Повторите попытку позже");
            });
        } else if (this.phones[i].changed && this.isAdmin) {
          const json = {
            email: `${this.email}`,
            old_number: `${this.phones[i].oldPhone}`,
            new_number: `${this.phones[i].phone}`,
          };
          axios
            .post(`${process.env.VUE_APP_PROXY}/change_phone`, json)
            .then((response) => {
              console.log(response.data);
              console.log(response);

              if (response.data.status == "SUCCESS") {
                alert(
                  `Номер телефона успешно обновлен с ${this.phones[i].oldPhone} на ${this.phones[i].phone}`
                );
                this.phones[i].oldPhone = this.phones[i].phone;
              } else {
                alert("Ошибка соединения с сервером! Повторите попытку позже");
              }
            })
            .catch((err) => {
              console.log(err);
              alert("Что-то пошло не так!");
            });
        }
      }
    },
    async handleSubmitAdmin() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (!this.isAdmin) {
        return;
      }

      let changes = [];
      let succ = 0;

      const agreement = confirm(
        `Вы действительно хотите внести изменения в личные данные пользователя?`
      );
      if (!agreement) {
        return;
      }

      console.log(this.lastname);
      if (this.lastname != this.oldLastname) {
        axios.defaults.headers.common["Authorization"] = `${this.email}`;
        await axios
          .post(
            `${process.env.VUE_APP_PROXY}/change_last_name?last_name=${this.lastname}`
          )
          .then((response) => {
            if (response.data.status == "SUCCESS") {
              changes.push({
                change: "Фамилии",
                successfully: true,
              });
              succ++;
              this.oldLastname = this.lastname;
            } else {
              changes.push({
                change: "Фамилии",
                successfully: false,
              });
            }
          })
          .catch((err) => {
            changes.push({
              change: "Фамилии",
              successfully: false,
            });

            console.log(err);
          });
      }
      if (this.firstname != this.oldFirstname) {
        axios.defaults.headers.common["Authorization"] = `${this.email}`;
        await axios
          .post(
            `${process.env.VUE_APP_PROXY}/change_first_name?first_name=${this.firstname}`
          )
          .then((response) => {
            if (response.data.status == "SUCCESS") {
              changes.push({
                change: "Имени",
                successfully: true,
              });
              succ++;
              this.oldFirstname = this.firstname;
            } else {
              changes.push({
                change: "Имени",
                successfully: false,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            changes.push({
              change: "Имени",
              successfully: false,
            });
          });
      }
      if (this.middlename != this.oldMiddlename) {
        axios.defaults.headers.common["Authorization"] = `${this.email}`;
        await axios
          .post(
            `${process.env.VUE_APP_PROXY}/change_middle_name?middle_name=${this.middlename}`
          )
          .then((response) => {
            if (response.data.status == "SUCCESS") {
              changes.push({
                change: "Отчестве",
                successfully: true,
              });
              succ++;
              this.oldMiddlename = this.middlename;
            } else {
              changes.push({
                change: "Отчестве",
                successfully: false,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            changes.push({
              change: "Отчестве",
              successfully: false,
            });
          });
      }
      if (this.post != this.oldPost) {
        axios.defaults.headers.common["Authorization"] = `${this.email}`;
        await axios
          .post(`${process.env.VUE_APP_PROXY}/change_post?post=${this.post}`)
          .then((response) => {
            if (response.data.status == "SUCCESS") {
              changes.push({
                change: "Должности",
                successfully: true,
              });
              succ++;
              this.oldPost = this.post;
            } else {
              console.log(err);
              changes.push({
                change: "Должности",
                successfully: false,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            changes.push({
              change: "Должности",
              successfully: false,
            });
          });
      }
      if (this.department != this.oldDepartment) {
        axios.defaults.headers.common["Authorization"] = `${this.email}`;
        await axios
          .post(
            `${process.env.VUE_APP_PROXY}/change_division?division=${this.department}`
          )
          .then((response) => {
            if (response.data.status == "SUCCESS") {
              changes.push({
                change: "Отделе",
                successfully: true,
              });
              succ++;
              this.oldDepartment = this.department;
            } else {
              changes.push({
                change: "Отделе",
                successfully: false,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            changes.push({
              change: "Отделе",
              successfully: false,
            });
          });
      }

      if (changes.length === 0) {
        return;
      }

      let message = "";

      if (succ != 0) {
        message += "Были успешно обновлены сведения о(-б) ";
        for (let i = 0; i < changes.length; i++) {
          if (changes[i].successfully) {
            message += changes[i].change.toLowerCase() + ", ";
          }
        }
        message = message.substring(0, message.length - 2);
        message += " пользователя. ";
      }
      if (succ == 0) {
        message += "Не удалось обновить сведения о(-б) ";
        for (let i = 0; i < changes.length; i++) {
          if (!changes[i].successfully) {
            message += changes[i].change.toLowerCase() + ", ";
          }
        }
        message = message.substring(0, message.length - 2);
        message += " пользователя.";
      }
      alert(message);
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
       if (this.phones[idx].isNew){
          this.phones.splice(idx, 1);
          return;
       }

      const agreement = confirm(
        `Вы действительно хотите безвозвратно удалить номер ${this.phones[idx].oldPhone}?`
      );
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
            alert(`Номер ${this.phones[idx].phone} успешно удалён`);
            this.phones.splice(idx, 1);
          } else {
            alert("Ошибка соединения с сервером! Повторите попытку позже");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Что-то пошло не так!");
        });
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
</style>