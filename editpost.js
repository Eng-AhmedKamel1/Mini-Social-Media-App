//هنا استخدمنا نفس المودل بتاع اضافه بوست جديد للاظهار والتعديل ع البوست
//علشان الtitle وال body نفس الحاجه
// واستخدمنا الداله بتاعه انشاء بوست جديد للتعديل بردو

function editPostBtnClicked(postObject){
    //تحويل البوست اوبجيكت لصيغه بيفهمها الجافا سكريبت
    //وحولتها في ال html
let post = JSON.parse(decodeURIComponent(postObject));
document.getElementById("post-id-input").value = post.id;
document.getElementById("addPostModalLabel").innerHTML="Edit Post";
document.getElementById("create-update-post-btn").innerHTML="Update";

document.getElementById("post-title-input").value = post.title;
document.getElementById("post-body-input").value = post.body;

//اظهار الموديل عن طريق ال جافاسكريبت
let postModal =new bootstrap.Modal(document.getElementById("add-post-modal") ,{});
postModal.toggle();

}
function deletePostBtnClicked(postObject){
    //تحويل البوست اوبجيكت لصيغه بيفهمها الجافا سكريبت
    //وحولتها في ال html
let post = JSON.parse(decodeURIComponent(postObject));

document.getElementById("delete-post-id-input").value = post.id;

//اظهار الموديل عن طريق ال جافاسكريبت
let postModal =new bootstrap.Modal(document.getElementById("delete-post-modal") ,{});
postModal.toggle();

}

function confirmPostDelete(){
    const postId = document.getElementById("delete-post-id-input").value;
    const url = `${baseUrl}posts/${postId}`;
    const token = localStorage.getItem("token");
 
    const headers = {
        "Authorization": `Bearer ${token}`
    }
 
 
    axios.delete(url , {headers: headers})
    .then((response) => {
        const modal = document.getElementById("delete-post-modal");
        const modalInstance = bootstrap.Modal.getInstance(modal);       
        modalInstance.hide();
        showAlert("تم حذف البوست بنجاح ✅", "success");
        getPosts();
    })
    .catch((error) => {
        const message = error.response?.data?.message || "حدث خطأ أثناء حذف البوست ❌";
        showAlert(message, "danger");
    });
}

// data-bs-toggle="modal" data-bs-target="#add-post-modal";
function addBtnClicked(){
 
document.getElementById("post-id-input").value = "";
document.getElementById("addPostModalLabel").innerHTML="Create A New Post";
document.getElementById("create-update-post-btn").innerHTML="Create";

document.getElementById("post-title-input").value = "";
document.getElementById("post-body-input").value = "";

//اظهار الموديل عن طريق ال جافاسكريبت
let postModal =new bootstrap.Modal(document.getElementById("add-post-modal") ,{});
postModal.toggle();
}