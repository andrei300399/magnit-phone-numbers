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
                {{ lastname }} {{ firstname }} {{ middlename }}
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
            <p class="nav__list__togler__item" v-on:click.prevent="goToLk()">
              <a class="nav-text">Личный кабинет</a>
            </p>
            <p class="nav__list__togler__item" v-on:click.prevent="logout()">
              <a class="nav-text">Выход</a>
            </p>
          </div>
        </li>
      </ul>
    </nav>

    <EditUser
      v-if="editUserFormVisible"
      :email="editUserEmail"
      @ok="CloseEditForm(resp)"
      @close="JustCloseEditForm()"
    />

    <AddUser
      v-if="addUserFormVisible"
      @ok="CloseAddForm(resp)"
      @close="JustCloseAddForm()"
    />

    <Success
      v-if="SuccessVisible"
      :message="this.SuccessMessage"
      @ok="CloseSuccessAlert"
    />

    <Error
      v-if="ErrorVisible"
      :message="this.ErrorMessage"
      @ok="CloseErrorAlert"
    />

    <Confirm-delete-user
      v-if="ConfirmDeleteUserVisible"
      :message="this.ConfirmDeleteUserMessage"
      :email="ConfirmDeleteUserEmail"
      @ConfirmAction="DeleteUser"
    />

    <vue-context
      ref="menu"
      :close-on-click="true"
      :close-on-scroll="true"
      class="context-menu"
    >
      <template slot-scope="child">
        <li
          class="context-menu__option"
          @click="onContextClickEdit($event, child.data)"
        >
          <p class="context-menu__option__edit">Редактировать</p>
        </li>
        <li
          class="context-menu__option"
          @click="onContextClickRemove($event, child.data)"
        >
          <p class="context-menu__option__delete">Удалить</p>
        </li>
      </template>
    </vue-context>

    <section class="main">
      <div class="main__menu">
        <form class="main__menu__form" @submit.prevent="">
          <div class="main__menu__form__btns">
            <button
              v-on:click.prevent="saveAsFile()"
              class="main__menu__form__btn btn-save"
            >
              <img src="img/table__save.svg" alt="сохранить изменения" />
            </button>
            <input
              type="file"
              id="input__file"
              accept=".xlsx"
              class="input__file"
              ref="file"
              v-on:change="handleFileUpload()"
            />

            <label for="input__file">
              <div class="main__menu__form__btn btn-export">
                <img
                  src="img/table__export_delivery-box 1.svg"
                  alt="экспортировать таблицу"
                /></div
            ></label>
            <button
              v-on:click.prevent="AddNewUser()"
              class="main__menu__form__btn btn-add"
            >
              <img
                src="img/table__add-user 1.svg"
                alt="Добавить запись о сотруднике"
              />
            </button>
          </div>
          <div class="main__menu__form__search">
            <input
              @keydown.enter.prevent="doSearch()"
              class="main__menu__form__search__input"
              name="search"
              v-model="searchString"
              type="text"
              placeholder="Поиск..."
              v-on:change="clearSearch()"
            />

            <div class="flex-right">
              <select
                v-model="category"
                ref="select"
                class="main__menu__form__search__category light-hover"
              >
                <option
                  class="option"
                  v-for="c in searchCategory"
                  :key="c.id"
                  :value="c.id"
                >
                  {{ c.name }}
                </option>
              </select>
              <button
                v-on:click.prevent="doSearch()"
                class="main__menu__form__btn-search light-hover"
              >
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
          <div class="main__table" @scroll="tableOnScroll" ref="tablecontainer">
            <table class="content-table" ref="table" v-if="users.length > 0">
              <thead>
                <tr>
                  <td>
                    <div class="content-table__name-and-button">
                      <p
                        id="heading0"
                        v-on:click.prevent="doSort(0)"
                        v-on:mouseover="rotateArrow(0, true)"
                        v-on:mouseout="rotateArrow(0, false)"
                        class="content-table__name table-heading-hover"
                      >
                        ФИО
                      </p>
                      <form
                        class="content-table__formn pointer"
                        v-on:click.prevent="doSort(0)"
                        v-on:mouseover="rotateArrow(0, true)"
                        v-on:mouseout="rotateArrow(0, false)"
                      >
                        <button
                          ref="arrow0"
                          class="content-table__form__button pointer"
                        >
                          <img
                            id="arrow0"
                            :class="{ arrow__rotated: sortIndex === 0 }"
                            class="content-table__button__arrow"
                            src="img/table__Vector 1.svg"
                            alt="упорядочить"
                          />
                        </button>
                      </form>
                    </div>
                  </td>
                  <td>Номера телефонов</td>
                  <td>
                    <div class="content-table__name-and-button">
                      <p
                        id="heading1"
                        class="content-table__name table-heading-hover"
                        v-on:click.prevent="doSort(1)"
                        v-on:mouseover="rotateArrow(1, true)"
                        v-on:mouseout="rotateArrow(1, false)"
                      >
                        Эл. Почта
                      </p>
                      <form
                        class="content-table__formn pointer"
                        v-on:click.prevent="doSort(1)"
                        v-on:mouseover="rotateArrow(1, true)"
                        v-on:mouseout="rotateArrow(1, false)"
                      >
                        <button
                          ref="arrow1"
                          class="content-table__form__button pointer"
                        >
                          <img
                            id="arrow1"
                            :class="{ arrow__rotated: sortIndex === 1 }"
                            class="content-table__button__arrow"
                            src="img/table__Vector 1.svg"
                            alt="упорядочить"
                          />
                        </button>
                      </form>
                    </div>
                  </td>
                  <td>
                    <div class="content-table__name-and-button">
                      <p
                        id="heading2"
                        class="content-table__name table-heading-hover"
                        v-on:click.prevent="doSort(2)"
                        v-on:mouseover="rotateArrow(2, true)"
                        v-on:mouseout="rotateArrow(2, false)"
                      >
                        Отдел
                      </p>
                      <form
                        class="content-table__formn pointer"
                        v-on:click.prevent="doSort(2)"
                        v-on:mouseover="rotateArrow(2, true)"
                        v-on:mouseout="rotateArrow(2, false)"
                      >
                        <button
                          ref="arrow2"
                          class="content-table__form__button pointer"
                        >
                          <img
                            id="arrow2"
                            :class="{ arrow__rotated: sortIndex === 2 }"
                            class="content-table__button__arrow"
                            src="img/table__Vector 1.svg"
                            alt="упорядочить"
                          />
                        </button>
                      </form>
                    </div>
                  </td>
                  <td>
                    <!-- Должность -->
                    <div class="content-table__name-and-button">
                      <p
                        id="heading3"
                        class="content-table__name table-heading-hover"
                        v-on:click.prevent="doSort(3)"
                        v-on:mouseover="rotateArrow(3, true)"
                        v-on:mouseout="rotateArrow(3, false)"
                      >
                        Должность
                      </p>
                      <form
                        class="content-table__formn pointer"
                        v-on:click.prevent="doSort(3)"
                        v-on:mouseover="rotateArrow(3, true)"
                        v-on:mouseout="rotateArrow(3, false)"
                      >
                        <button
                          ref="arrow3"
                          class="content-table__form__button pointer"
                        >
                          <img
                            id="arrow3"
                            :class="{ arrow__rotated: sortIndex === 3 }"
                            class="content-table__button__arrow"
                            src="img/table__Vector 1.svg"
                            alt="упорядочить"
                          />
                        </button>
                      </form>
                    </div>
                  </td>
                  <td>
                    <!-- Дата рождения -->
                    <div class="content-table__name-and-button">
                      <p
                        id="heading4"
                        class="content-table__name table-heading-hover"
                        v-on:click.prevent="doSort(4)"
                        v-on:mouseover="rotateArrow(4, true)"
                        v-on:mouseout="rotateArrow(4, false)"
                      >
                        Дата рождения
                      </p>
                      <form
                        class="content-table__formn pointer"
                        v-on:click.prevent="doSort(4)"
                        v-on:mouseover="rotateArrow(4, true)"
                        v-on:mouseout="rotateArrow(4, false)"
                      >
                        <button
                          ref="arrow4"
                          class="content-table__form__button pointer"
                        >
                          <img
                            id="arrow4"
                            :class="{ arrow__rotated: sortIndex === 4 }"
                            class="content-table__button__arrow"
                            src="img/table__Vector 1.svg"
                            alt="упорядочить"
                          />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(user, idx) in users"
                  :key="user.email"
                  @contextmenu.prevent="$refs.menu.open($event, { idx })"
                >
                  <td>
                    {{ idx + 1 }}. {{ user.last_name }} {{ user.first_name }}
                    {{ user.middle_name }}
                  </td>
                  <td>
                    <p
                      v-for="phone in users[idx].numbers"
                      :key="phone.number"
                      class="table__number"
                    >
                      {{ phone.number }}
                    </p>
                  </td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.division }}</td>
                  <td>{{ user.post }}</td>
                  <td>{{ user.birthday | date("date") }}</td>
                </tr>
              </tbody>
            </table>
            <div class="main__table__not-found" v-if="users.length === 0">
              <p class="main__table__not-found__text">Ничего не найдено!</p>
            </div>
          </div>
        </div>
      </div>
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
import { saveAs } from "file-saver";
import axios from "axios";
import EditUser from "../components/EditUser.vue";
import AddUser from "../components/AddUser.vue";
import ConfirmDeleteUser from "../components/alerts/ConfirmDeleteUser.vue";
import Success from "../components/alerts/Success.vue";
import Error from "../components/alerts/Error.vue";

import VueContext from "vue-context";

export default {
  components: {
    EditUser,
    AddUser,
    VueContext,
    ConfirmDeleteUser,
    Success,
    Error,
  },
  name: "admin",
  data: () => ({
    category: 6, // хранится айдишник

    users: [],
    isAdmin: true,
    firstname: "Вадим",
    middlename: "Геннадьевич",
    lastname: "Пак",
    email: "pack.vg@agabon.ru",

    ConfirmDeleteUserVisible: false,
    ConfirmDeleteUserMessage: "",
    ConfirmDeleteUserEmail: "",

    SuccessVisible: false,
    SuccessMessage: false,

    ErrorVisible: false,
    ErrorMessage: false,

    search: false,
    searchString: "",

    searchCategory: [
      { id: 3, name: "должность", path: "post" },
      { id: 2, name: "отдел", path: "division" },
      { id: 6, name: "фамилия", path: "last_name" },
      { id: 5, name: "имя", path: "first_name" },
      { id: 7, name: "отчество", path: "middle_name" },
      { id: 1, name: "почта", path: "email" },
      { id: -1, name: "телефон", path: "number" },
      { id: -2, name: "дата рождения", path: "birthday" },
    ],

    sorted: false,
    sortIndex: -1, // хранится индекс объекта

    pathToUpdateUsers: "users?",

    sortCategory: [
      { id: 5, name: "ФИО", path: "fio", selected: false }, //0
      { id: 1, name: "почта", path: "email", selected: false }, //1
      { id: 2, name: "отдел", path: "division", selected: false }, //2
      { id: 3, name: "должность", path: "post", selected: false }, //3
      { id: 6, name: "дата рождения", path: "birthday", selected: false }, //4
    ],

    alreadyScrolled: true,

    get: true,
    hasJSON: false,
    json: null,

    loading: true,
    index: 0,
    usersWithoutNumbers: [],
    createObjIndex: 0,

    sortUp: false,

    path: "users?",
    defaultPath: "users?",

    indexOfLastUser: -1,
    LoadedAtOnced: 10,

    addUserFormVisible: false,

    editUserFormVisible: false,
    editUserEmail: "",

    file: "",
  }),

  validations: {
    categories: { required, minLength: minLength(3) },
  },
  async mounted() {
    await this.fetch();
  },
  methods: {
    async clearSearch() {
      if (this.searchString !== "") {
        return;
      }
      this.loading = true;
      this.search = false;
      this.users = [];
      console.log("Пусто - выросла капуста!");
      this.indexOfLastUser = -1;
      if (this.sorted) {
        this.get = false;
        this.path = `sort_${this.sortCategory[this.sortIndex].path}?`;
        await this.fetch();
        return;
      }

      this.get = true;
      this.path = this.defaultPath;
      await this.fetch();
    },
    async handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let excel_file = new FormData();
      excel_file.append("file", this.file);
      console.log(excel_file.get("file"));
      await axios
        .post(`/import`, excel_file)
        .then((response) => {
          console.log(response);
          console.log("Наконец-то");
        })
        .catch((response) => {
          console.log(response);
          console.log("Опять провал");
        });
    },
    async DeleteUser(resp) {
      this.ConfirmDeleteUserVisible = false;

      if (!resp.answer) {
        return;
      }

      this.loading = true;

      axios.defaults.headers.common[
        "Authorization"
      ] = `${this.ConfirmDeleteUserEmail}`;
      await axios
        .get(`${process.env.VUE_APP_PROXY}/delete_user`)
        .then((response) => {
          if (response.data.status == "SUCCESS") {
            // alert(`Номер ${this.phones[idx].phone} успешно удалён`);
            this.SuccessMessage = `Пользователь успешно удалён`;
            this.SuccessVisible = true;
            this.users = [];
            this.indexOfLastUser = -1;
          } else {
            // alert("Ошибка соединения с сервером! Повторите попытку позже");
            this.loading = false;

            this.ErrorMessage =
              "Ошибка соединения с сервером! Повторите попытку позже";
            this.ErrorVisible = true;
          }
        })
        .catch((err) => {
          this.loading = false;
          this.ErrorMessage = "Что-то пошло не так";
          this.ErrorVisible = true;
        });

      await this.fetch();
    },
    CloseSuccessAlert() {
      this.SuccessVisible = false;
    },
    CloseErrorAlert() {
      this.ErrorVisible = false;
    },
    rotateArrow(index, direction) {
      let arrowId = "arrow" + index;
      let headingId = "heading" + index;
      if (index == this.sortIndex) {
        if (direction) {
          document.getElementById(arrowId).style.transform = "rotate(0deg)";
          document.getElementById(headingId).style.opacity = "0.5";
          document.getElementById(headingId).style.filter = "alpha(opacity=85)";
          return;
        }

        document.getElementById(arrowId).style.transform = "rotate(180deg)";
        document.getElementById(headingId).style.opacity = "1";
        document.getElementById(headingId).style.filter = "alpha(opacity=100)";
        return;
      }

      if (direction) {
        document.getElementById(arrowId).style.transform = "rotate(180deg)";
        document.getElementById(headingId).style.opacity = "0.5";
        document.getElementById(headingId).style.filter = "alpha(opacity=85)";
        return;
      }

      document.getElementById(arrowId).style.transform = "rotate(0deg)";
      document.getElementById(headingId).style.opacity = "1";
      document.getElementById(headingId).style.filter = "alpha(opacity=100)";
    },
    async doSearch() {
      this.search = true;
      this.loading = true;
      this.get = false;

      console.log(this.category);
      let indexOfSearchCategory; // = 0;
      for (let i = 0; i < this.searchCategory.length; i++) {
        if (this.searchCategory[i].id == this.category) {
          indexOfSearchCategory = i;
          break;
        }
      }

      if (this.sorted) {
        this.hasJSON = true;
        let strJson = `{
          "search": ${this.category},
          "sort": ${this.sortCategory[this.sortIndex].id},
         "${this.searchCategory[indexOfSearchCategory].path}": "${
          this.searchString
        }"
        }`;
        console.log(strJson);
        this.json = JSON.parse(strJson);
        this.path = `search_and_sort?`;
      } else {
        this.hasJSON = false;
        this.path = `search_${this.searchCategory[indexOfSearchCategory].path}?${this.searchCategory[indexOfSearchCategory].path}=${this.searchString}&`;
      }

      this.users = [];
      this.indexOfLastUser = -1;

      await this.fetch();
    },

    async doSort(index) {
      this.loading = true;
      this.sorted = true;
      this.get = false;

      if (this.sortIndex === index) {
        //повторная попытка отсортировать по тому же атрибуту => отмена сортировки
        //отмена сортировки

        this.sortIndex = -1;
        this.sorted = false;
        this.hasJSON = false;

        if (this.search) {
          //если был осуществлен поиск, результат будет выведен уже без учета сортировки
          let indexOfSearchCategory; // = 0;
          for (let i = 0; i < this.searchCategory.length; i++) {
            if (this.searchCategory[i].id == this.category) {
              indexOfSearchCategory = i;
              break;
            }
          }
          this.path = `search_${this.searchCategory[indexOfSearchCategory].path}?${this.searchCategory[indexOfSearchCategory].path}=${this.searchString}&`;
        } else {
          //если не был осуществлен поиск, все данные будут загружены заново по дефолту
          this.path = `${this.defaultPath}`;
          this.get = true;
        }

        this.users = [];
        this.indexOfLastUser = -1;
        await this.fetch();
        return;
      }

      //сортировка уже имеющихся данных

      this.sortIndex = index;

      if (this.search) {
        //если был осуществлен поиск, результат будет выведен уже с учетом сортировки

        this.hasJSON = true;

        let indexOfSearchCategory; // = 0;
        for (let i = 0; i < this.searchCategory.length; i++) {
          if (this.searchCategory[i].id == this.category) {
            indexOfSearchCategory = i;
            break;
          }
        }
        // потом проверить
        let strJson = `{
          "search": ${this.category},
          "sort": ${this.sortCategory[this.sortIndex].id},
         "${this.searchCategory[indexOfSearchCategory].path}": "${
          this.searchString
        }"
        }`;
        console.log(strJson);
        this.json = JSON.parse(strJson);
        this.path = `search_and_sort?`;
      } else {
        this.get = false;
        this.path = `sort_${this.sortCategory[index].path}?`;
      }
      this.users = [];
      this.indexOfLastUser = -1;

      await this.fetch();
    },

    onContextClickEdit(event, formData) {
      console.log(
        "Редактировать пользователя " + this.users[formData.idx].last_name
      );
      console.log("email " + this.users[formData.idx].email);

      this.editUserEmail = this.users[formData.idx].email;
      this.editUserFormVisible = true;
    },

    onContextClickRemove(event, formData) {
      this.ConfirmDeleteUserMessage = `Вы действительно хотите удалить пользователя ${
        this.users[formData.idx].last_name
      } ${this.users[formData.idx].first_name} ${
        this.users[formData.idx].middle_name
      }?`;
      this.ConfirmDeleteUserEmail = this.users[formData.idx].email;
      this.ConfirmDeleteUserVisible = true;
    },

    tableOnScroll(event) {
      if (this.users.length === 0) {
        return;
      }

      let height = this.$refs.table.clientHeight;
      let heightOfBlock = this.$refs.tablecontainer.clientHeight;
      let container = event.target;

      if (
        container.scrollTop + heightOfBlock + 15 >= height &&
        !this.alreadyScrolled
      ) {
        this.alreadyScrolled = true;
        this.handleScrolledToFooter();
      }
    },
    async handleScrolledToFooter() {
      if (this.loading) {
        return;
      }
      await this.fetch();
    },

    AddNewUser() {
      this.addUserFormVisible = true;
    },

    EditUser() {
      this.editUserFormVisible = true;
    },

    CloseAddForm(resp) {
      this.addUserFormVisible = false;
      window.location.reload();
    },

    CLoseEditForm(resp) {
      this.editUserFormVisible = false;
    },

    JustCloseAddForm() {
      this.addUserFormVisible = false;
    },
    JustCloseEditForm() {
      this.editUserFormVisible = false;
    },

    async fetch() {
      //выполнение гет-запроса
      if (this.get) {
        console.log("get");
        await axios
          .get(
            `${process.env.VUE_APP_PROXY}/${this.path}start_index=${
              this.indexOfLastUser + 1
            }&last_index=${this.indexOfLastUser + this.LoadedAtOnced}`
          )
          .then((response) => {
            let tempUsers = response.data;
            for (let i = 0; i < tempUsers.length; i++) {
              if (tempUsers[i].numbers.length === 0) {
                tempUsers[i].numbers.push({ number: "-" });
              }
            }

            this.users.push(...tempUsers);
            this.indexOfLastUser += this.LoadedAtOnced;
            this.loading = false;
            this.alreadyScrolled = false;
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }

      //выполнение пост-запросов
      //Если передается JSON
      if (this.hasJSON) {
        console.log("post + JSON");
        await axios
          .post(
            `${process.env.VUE_APP_PROXY}/${this.path}start_index=${
              this.indexOfLastUser + 1
            }&last_index=${this.indexOfLastUser + this.LoadedAtOnced}`,
            this.json
          )
          .then((response) => {
            let tempUsers = response.data;
            for (let i = 0; i < tempUsers.length; i++) {
              if (tempUsers[i].numbers.length === 0) {
                tempUsers[i].numbers.push({ number: "-" });
              }
            }

            this.users.push(...tempUsers);
            this.indexOfLastUser += this.LoadedAtOnced;
            this.loading = false;
            this.alreadyScrolled = false;
          })
          .catch((err) => {
            console.log(err);
          });

        return;
      }
      console.log("post + without JSON");
      await axios
        .post(
          `${process.env.VUE_APP_PROXY}/${this.path}start_index=${
            this.indexOfLastUser + 1
          }&last_index=${this.indexOfLastUser + this.LoadedAtOnced}`
        )
        .then((response) => {
          let tempUsers = response.data;
          for (let i = 0; i < tempUsers.length; i++) {
            if (tempUsers[i].numbers.length === 0) {
              tempUsers[i].numbers.push({ number: "-" });
            }
          }

          this.users.push(...tempUsers);
          this.indexOfLastUser += this.LoadedAtOnced;
          this.loading = false;
          this.alreadyScrolled = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    goToLk() {
      this.$router.push("./lk");
    },

    logout() {
      alert("Вы вышли из системы");
      this.$router.push("./");
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
@import "../../public/css/table_style.css";

@import "~vue-context/src/sass/vue-context";

.main__table__not-found {
  width: 100%;
  height: 100%;
}

.main__table__not-found__text {
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
}

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

ul {
  list-style: none;
  margin: 0;
  padding-left: 0;
}

a,
li {
  text-decoration: none;
}

#heading4 {
  margin-left: 20px;
}

.pointer {
  cursor: pointer;
}

.context-menu {
  border: none;
  border-radius: 0;
  width: 220px;
  height: 135px;
  padding: 0;
  background: #e2e2e2;
  box-shadow: -4px 4px 28px rgba(0, 0, 0, 0.15);
  transition: all 0.35s ease;
}

.context-menu__option {
  // width: 220px;
  height: 67.5px;
  transition: all 0.35s ease;
  cursor: pointer;
  background: #e2e2e2;
}

.context-menu__option:hover {
  background: #c4c4c4;
  transition: all 0.35s ease;
}

.context-menu__option__edit {
  padding: 0;
  margin: 0;
  margin-left: 28px;
  margin-right: 28px;
  padding-top: 28px;

  font-family: Loew Next;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
}

.context-menu__option__delete {
  padding: 0;
  margin: 0;
  margin-left: 28px;
  margin-right: 28px;
  padding-bottom: 28px;

  font-family: Loew Next;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
}

.content-table__button__arrow {
  cursor: pointer;
  transition: all 0.1s ease;
}

.content-table__button__arrow:active,
.content-table__button__arrow:hover {
  transform: rotate(180deg);
  transition: all 0.35s ease;
}

.arrow__rotated {
  transform: rotate(180deg);
  transition: all 0.35s ease;
}

.table-heading-hover {
  cursor: pointer;
  transition: all 0.35s ease;
}

.table-heading-hover:hover {
  opacity: 0.5;
  filter: alpha(opacity=85);
  transition: all 0.35s ease;
}

.table-heading-hover:active {
  opacity: 1;
  filter: alpha(opacity=100);
  transition: all 0.1s ease;
}
</style>