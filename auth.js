// auth.js

// تسجيل الدخول
function loginBtnClicked(){
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    
    const prams = {
        "username": username,
        "password": password
    }
    const url = `${baseUrl}login`;
    axios.post(url, prams)
    .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        const modal = document.getElementById("login-modal");
        const modalInstance = bootstrap.Modal.getInstance(modal);       
        modalInstance.hide();
        showAlert("تم تسجيل الدخول بنجاح ✅", "success");
        setupUI();
    });
}

// تسجيل حساب جديد
function registerBtnClicked(){
    const name = document.getElementById("register-name-input").value;
    const username = document.getElementById("register-username-input").value;
    const password = document.getElementById("register-password-input").value;
    const email = document.getElementById("register-email-input").value;
    const image = document.getElementById("register-image-input").files[0];
   
    let formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);
    
    const header = {
        "Content-Type": "multipart/form-data",
    }

    const url = `${baseUrl}register`;
    axios.post(url, formData , {headers: header})
    .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));  

        const modal = document.getElementById("register-modal");
        const modalInstance = bootstrap.Modal.getInstance(modal);       
        modalInstance.hide();
        showAlert("تم انشاء الجساب بنجاح ✅");
        setupUI();
    })
    .catch((error) => {
        const message = error.response.data.message;
        showAlert(message, "danger");
    });
}

// تسجيل الخروج
function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setupUI();
    showAlert("تم تسجيل الخروج بنجاح ✅" ,"danger");
}
