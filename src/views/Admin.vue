<template>
  <div>
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__list__item">
          <a class="light-hover nav-text" href="#">Администратор</a>
        </li>
        <li class="nav__list__item">
          <a class="light-hover nav-text" href="#">
            <div class="nav__list__item__account light-hover">
              <p class="nav-text">
                {{ lastname }} {{ middlename }} {{ firstname }}
              </p>
              <img
                src="img/table__avatar.svg"
                alt="Фото профиля"
                class="nav__list__item__account__avatar"
              />
              <img
                src="img/table__Vector 1.svg"
                alt="Развернуть список"
                class="nav__list__item__account__narrow"
              />
            </div>
          </a>
          <div class="nav__list__togler">
            <p class="nav__list__togler__item">
              <a class="light-hover nav-text" href="#">Личный кабинет</a>
            </p>
            <p class="nav__list__togler__item">
              <a class="light-hover nav-text" href="#">Выход</a>
            </p>
          </div>
        </li>
      </ul>
    </nav>

    <section class="main">
      <div class="main__menu">
        <form class="main__menu__form" action="">
          <div class="main__menu__form__btns">
            <button
              v-on:click.prevent="saveAsFile()"
              class="main__menu__form__btn btn-save"
            >
              <img src="img/table__save.svg" alt="сохранить изменения" />
            </button>
            <button class="main__menu__form__btn btn-export">
              <img
                src="img/table__export_delivery-box 1.svg"
                alt="экспортировать таблицу"
              />
            </button>
            <button class="main__menu__form__btn btn-add">
              <img
                src="img/table__add-user 1.svg"
                alt="Добавить запись о сотруднике"
              />
            </button>
          </div>
          <div class="main__menu__form__search">
            <input
              class="main__menu__form__search__input"
              name="search"
              type="text"
              placeholder="Поиск..."
            />

            <div class="flex-right">
              <select class="main__menu__form__search__category light-hover">
                <option class="option">Искать везде</option>
                <option class="option">Категория1</option>
                <option class="option">Категория2</option>
              </select>
              <button class="main__menu__form__btn-search light-hover">
                <img
                  class="main__menu__form__btn-search-img"
                  src="img/table__search-loupe 1.svg"
                  alt="Искать"
                />
              </button>
            </div>
          </div>
        </form>
      </div>

      <div v-if="loading" class="tb-loader">
        <Loader />
      </div>

      <div v-if="!loading" class="table__background-logo">
        <div class="table__background-shadows">
          <div class="main__table">
            <table class="content-table">
              <thead>
                <tr>
                  <td>
                    <div class="content-table__name-and-button">
                      <p class="content-table__name">ФИО</p>
                      <form class="content-table__formn">
                        <button
                          v-on:click.prevent="SortByPhIO()"
                          class="content-table__form__button"
                        >
                          <img
                            class="content-table__button__arrow"
                            src="img/table__Vector 1.svg"
                            alt="упорядочить"
                          />
                        </button>
                      </form>
                    </div>
                  </td>
                  <td>Номера телефонов</td>
                  <td>Эл. Почта</td>
                  <td>Подразделение</td>
                  <td>должность</td>
                  <!--  <td>Дата обновления</td> -->
                </tr>
              </thead>
              <tbody>
                <!--  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" -->
                <tr v-for="(user, idx) in users" :key="user.email">
                  <td>
                    {{ idx + 1 }}. {{ user.last_name }} {{ user.middle_name }}
                    {{ user.first_name }}
                  </td>
                  <td>
                    <p
                      v-for="phone in users[idx].phones"
                      :key="phone"
                      class="table__number"
                    >
                      {{ phone }}
                    </p>
                  </td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.division }}</td>
                  <td>{{ user.post }}</td>
                  <!-- <td>27 февраля 2021</td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <footer
      v-if="users.length"
      v-observe-visibility="handleScrolledToFooter"
      class="footer"
    >
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
import { saveAs } from "file-saver";
import axios from "axios";
export default {
  name: "admin",
  data: () => ({
    users: [],
    isAdmin: true,
    firstname: "d",
    middlename: "d",
    lastname: "d",
    email: "crazy@mail.ru",
    loading: true,
    index: 0,
    usersWithoutNumbers: [],
    createObjIndex: 0,
    sortUp: false,
    path: "users",
  }),
  validations: {
    categories: { required, minLength: minLength(3) },
  },
  async mounted() {
    await this.fetch();
  },
  methods: {
    async handleScrolledToFooter(isVisible) {
      if (!isVisible) {
        return;
      }
      await this.fetch();
    },

    async fetch() {
      await axios
        .get(`${process.env.VUE_APP_PROXY}/${this.path}`)
        .then((response) => {
          (this.usersWithoutNumbers = []),
            (this.usersWithoutNumbers = response.data);
          let count = 0;
          for (let i = this.index; i < this.usersWithoutNumbers.length; i++) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `${this.usersWithoutNumbers[i].email}`;

            axios
              .get(`${process.env.VUE_APP_PROXY}/get_numbers`)
              .then((phones) => {
                if (phones.data.length === 0) {
                  phones.data.push("-");
                }
                this.users.push({
                  ...this.usersWithoutNumbers[this.createObjIndex++],
                  phones: phones.data,
                });
                this.loading = false;
              });

            this.index++;
            console.log(count);
            if (++count == 3) {
              return;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // let count = 0;
      // let tempCount = 0;
      // let respUsers = await axios.get(`${process.env.VUE_APP_PROXY}/users`);
      // for (let user in respUsers.data) {
      //   console.log(user)
      //   if (++tempCount < this.index) {
      //     continue;
      //   }
      //   axios.defaults.headers.common["Authorization"] = `${user.email}`;
      //   const phones = await axios.get(
      //     `${process.env.VUE_APP_PROXY}/get_numbers`
      //   );
      //   const phoneNumbers = phones.data;
      //   this.users.push({
      //     ...user,
      //     phones: phoneNumbers,
      //   });

      // this.index++;
      // if (++count == 9) {
      //   return;
      // }
      // }
      // console.log(this.users)
    },

    async SortByPhIO() {
      this.sortUp = !this.sortUp;
      if (!this.sortUp) {
        this.path = "users";
      } else {
        this.path = "sort_last_name";
      }
      this.users = [];
      this.index = 0;
      this.loading = true;
      this.usersWithoutNumbers = [];
      this.createObjIndex = 0;
      await this.fetch();
    },

    saveAsFile: function () {
      axios
        .get(`${process.env.VUE_APP_PROXY}/export`, {
          responseType: "arraybuffer",
        })
        .then((response) => {
          var blob = new Blob([response.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
          });
          saveAs(blob, `Номера телефонов сотрудников - ${new Date()}.xlsx`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.tb-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: calc(50% - 585px);
  padding-right: calc(50% - 585px);
  margin-bottom: 132px;
  height: 300px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>