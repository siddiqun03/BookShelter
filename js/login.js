// * Variables:
const form = document.querySelector(".login-form");
const userName = document.querySelector(".userName");
const userPassword = document.querySelector(".password");
const logInBtn = document.querySelector(".loginBtn");

// * Evenetn delegation:
form.addEventListener("submit", function (evt) {
  evt.preventDefault();

  // * Variables:
  const usernameValue = userName.value;
  const passwordValue = userPassword.value;

  // * Try/Catch:
  try {
    // * fetch API:
    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: usernameValue,
        password: passwordValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // * check fetch information:
        if (data?.token) {
          // * Local storage:
          window.localStorage.setItem("token", data.token);

          window.location.replace("home.html");
        } else {
          // * Error style:
          userName.addEventListener("keydown", (evt) => {
            userName.style.borderColor = "#ffffff";
            userName.style.color = "#ffffff";
          });
          userName.style.borderColor = "tomato";
          userName.style.color = "tomato";
          // * ---------------------------:
          userPassword.addEventListener("keydown", () => {
            userPassword.style.borderColor = "#ffffff";
            userPassword.style.color = "#ffffff";
          });
          userPassword.style.borderColor = "tomato";
          userPassword.style.color = "tomato";
        }
      });
  } catch (error) {
    alert("Sorry Something is wrong !");
  }
});
