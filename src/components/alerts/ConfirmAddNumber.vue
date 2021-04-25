<template>
  <div class="confirm-full-screen-background">
    <div class="confirm-message-frame">
      <p class="confirm-message-frame__message-text">
        {{ message }}
      </p>
      <form class="confirm-message-frame__form">
        <button v-on:click="Accept" class="confirm-message-frame__button-yes">
          Да
        </button>
        <button v-on:click="Decline" class="confirm-message-frame__button-no">
          Нет
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
  methods: {
    Accept() {
      this.$emit("DeleteNumber", true);
    },
    Decline() {
        this.$emit("DeleteNumber", false);
    },
  },
};
</script>

 <style lang="scss">

 @import "../../../public/css/confirm_style.css";

// // @font-face {
// //     font-family: 'Loew Next';
// //     src: url("../../public/fonts/LoewNext-Regular.woff2"),
// //         url("../../public/fonts/LoewNext-Regular.woff");
// //     font-style: normal;
// //     font-weight: 400;
// //     font-display: swap;
// // }

// // body {
// //     margin: 0;
// //     padding: 0;
// //     font-family: 'Loew Next';
// //     font-style: normal;
// //     font-weight: 400;
// // }



// .full-screen-background {
//     position: fixed;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     left: 0px;
//     top: 0px;
//     min-height: 100%;
//     width: 100%;
//     background: rgba(216, 216, 216, 0.71);
//     z-index: 101
// }

// .confirm-message-frame {
//     z-index: 102;
//     position: absolute;
//     display: flex;
//     flex-direction: column;
//     flex-wrap: wrap;
//     align-items: center;
//     width: 308px;
//     min-height: 200px;
//     background: #FFF5F5;
//     border-radius: 50px;
// }



// .confirm-message-frame__message-text {
//     font-family: Loew Next;
//     font-style: normal;
//     font-weight: 500;
//     font-size: 18px;
//     line-height: 27px;
//     text-align: center;
//     color: #000000;
//     margin: 33px 15px 20px 15px;
//     padding: 0;
// }

// .confirm-message-frame__form {
//     margin-bottom: 33px;
//     /* display: flex;
//     justify-content: space-around;
//     width: 100%; */
// }


// .confirm-message-frame__button-yes {
//     margin-left: 15px;
//     /* width: 110px;
//     height: 60px; */
//     margin-right: 30px;
//     width: 81px;
//     height: 40px;
//     background-color: #E30613;
//     border-radius: 60px;
//     border: none;
//     outline: none;
//     transition: all 0.5s ease;
//     cursor: pointer;
//     /* margin-right: 80px; */

//     text-decoration: none;
//     font-family: Loew Next;
//     font-style: normal;
//     font-weight: normal;
//     font-size: 20px;
//     line-height: 30px;
//     color: #FFFFFF;
// }

// .confirm-message-frame__button-no {
//     margin-right: 15px;
//     /* width: 114px;
//     height: 60px; */
//     width: 80px;
//     height: 40px;
//     border: none;
//     outline: none;
//     border: 1px solid #000000;
//     background-color: inherit;
//     box-sizing: border-box;
//     border-radius: 60px;
//     transition: all 0.5s ease;
//     cursor: pointer;

//     text-decoration: none;
//     font-family: Loew Next;
//     font-style: normal;
//     font-weight: normal;
//     font-size: 20px;
//     line-height: 30px;
//     color: #000000;
// }


// .confirm-message-frame__button-yes:hover {
//     background-color: #ff0011;

//     transition: all 0.5s ease;
// }

// .confirm-message-frame__button-yes:active {
//     /* color: #ffffff;
//     border-color: #dbdbdb; */
//     background-color: #ffffff;
//     /* color: #000000; */
//     color: #E30613;
//     transition: all 0.1s ease;
// }

// .confirm-message-frame__button-no:hover {
//     /* background-color: #e4e4e4b9;
//     color: #ffffff;
//     border-color: #ffffff00; */
//     background-color: #e4e4e4b9;
//     border-color: #dbdbdb00;
//     transition: all 0.5s ease;
// }

// .confirm-message-frame__button-no:active {
//     /* color: #ffffff;     */
//     border-color: #dbdbdb00;
//     background-color: #ffffff;
//     transition: all 0.1s ease;
// }


// @media (min-width: 1170px) {


//     .confirm-message-frame {
//         width: 569px;
//         min-height: 341px;
//     }

//     .confirm-message-frame__button-yes {
//         margin-right: 80px;
//     }

//     .confirm-message-frame__button-no {
//         width: 114px;
//         height: 60px;
//     }

//     .confirm-message-frame__button-yes {
//         width: 110px;
//         height: 60px;
//     }

//     .confirm-message-frame__message-text {
//         font-weight: 500;
//         font-size: 22px;
//         line-height: 33px;
//         margin: 99px 15px 50px 15px;
//     }

//     .confirm-message-frame__form {
//         margin-bottom: 99px;
//     }
// }



// // body {
// //   margin: 0;
// //   padding: 0;
// //   font-family: "Loew Next";
// //   font-style: normal;
// //   font-weight: 400;
// // }

// // .full-screen-background {
// //   position: fixed;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   left: 0px;
// //   top: 0px;
// //   min-height: 100%;
// //   width: 100%;
// //   background: rgba(216, 216, 216, 0.71);
// //   z-index: 101;
// // }

// // .confirm-message-frame {
// //   z-index: 102;
// //   position: absolute;
// //   display: flex;
// //   flex-direction: column;
// //   flex-wrap: wrap;
// //   align-items: center;
// //   width: 308px;
// //   min-height: 200px;
// //   background: #fff5f5;
// //   border-radius: 50px;
// // }

// // .confirm-message-frame__message-text {
// //   font-family: Loew Next;
// //   font-style: normal;
// //   font-weight: 500;
// //   font-size: 18px;
// //   line-height: 27px;
// //   text-align: center;
// //   color: #000000;
// //   margin: 33px 15px 20px 15px;
// //   padding: 0;
// // }

// // .confirm-message-frame__form {
// //   margin-bottom: 33px;
// // }

// // .confirm-message-frame__button-yes {
// //   width: 110px;
// //   height: 60px;
// //   background-color: #e30613;
// //   border-radius: 60px;
// //   border: none;
// //   outline: none;
// //   transition: all 0.5s ease;
// //   cursor: pointer;
// //   margin-right: 80px;

// //   text-decoration: none;
// //   font-family: Loew Next;
// //   font-style: normal;
// //   font-weight: normal;
// //   font-size: 20px;
// //   line-height: 30px;
// //   color: #ffffff;
// // }

// // .confirm-message-frame__button-no {
// //   width: 114px;
// //   height: 60px;
// //   border: none;
// //   outline: none;
// //   border: 1px solid #000000;
// //   background-color: inherit;
// //   box-sizing: border-box;
// //   border-radius: 60px;
// //   transition: all 0.5s ease;
// //   cursor: pointer;

// //   text-decoration: none;
// //   font-family: Loew Next;
// //   font-style: normal;
// //   font-weight: normal;
// //   font-size: 20px;
// //   line-height: 30px;
// //   color: #000000;
// // }

// // .confirm-message-frame__button-yes:hover {
// //   background-color: #ff0011;

// //   transition: all 0.5s ease;
// // }

// // .confirm-message-frame__button-yes:active {
// //   /* color: #ffffff;
// //     border-color: #dbdbdb; */
// //   background-color: #ffffff;
// //   /* color: #000000; */
// //   color: #e30613;
// //   transition: all 0.1s ease;
// // }

// // .confirm-message-frame__button-no:hover {
// //   /* background-color: #e4e4e4b9;
// //     color: #ffffff;
// //     border-color: #ffffff00; */
// //   background-color: #e4e4e4b9;
// //   border-color: #dbdbdb00;
// //   transition: all 0.5s ease;
// // }

// // .confirm-message-frame__button-no:active {
// //   /* color: #ffffff;     */
// //   border-color: #dbdbdb00;
// //   background-color: #ffffff;
// //   transition: all 0.1s ease;
// // }

// // @media (min-width: 1170px) {
// //   .confirm-message-frame {
// //     width: 569px;
// //     min-height: 341px;
// //   }

// //   .confirm-message-frame__message-text {
// //     font-weight: 500;
// //     font-size: 22px;
// //     line-height: 33px;
// //     margin: 99px 15px 50px 15px;
// //   }

// //   .confirm-message-frame__form {
// //     margin-bottom: 99px;
// //   }
// // }
</style>