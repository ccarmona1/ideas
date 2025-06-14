// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2927-216&mode=design&t=0FIG0iRzKcD0s16M-0
// // * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-191&mode=design&t=0FIG0iRzKcD0s16M-0
// // * render this component by route '/login'
// // * use login service to submit form data and make POST API request '/login'.
// // * component should have a link to the Registration page (see design)
// // * save token from API after success login to localStorage.
// // ** PAY ATTENTION ** token should be saved to localStorage inside login handler function after login service response
// // ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#login-new-component

// // Module 3.
// // * use 'setUserData' from 'userSlice.js' to save user's name, token and email to the store after success login.
// // ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#login-component

// // Module 4.
// // * use 'setUserData' from 'userSlice.js' to add user's data to store. (DO NOT use 'user/me' [GET] request)

// import React from "react";

// import styles from "./styles.module.css";

// export const Login = () => {
//   // write your code here

//   return (
//     <div className={styles.container}>
//       <h1>Login</h1>
//       <div className={styles.formContainer}>
//         <form onSubmit={handleSubmit}>
//           // reuse Input component for email field // reuse Input component for
//           password field // reuse Button component for 'Login' button
//         </form>
//         <p>
//           If you don't have an account you may&nbsp; // use <Link /> component
//           for navigation to Registration page
//         </p>
//       </div>
//     </div>
//   );
// };
