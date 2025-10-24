// createPost.js

function createNewPostClicked(){
    //هنا علشان نجيب الايدي بتاع البوست في عمليه التعديل ع البوست
    let postId = document.getElementById("post-id-input").value;
    let isCreate = postId == "" || postId == null;
 
    //علشان دول مشتركين بين اضافه بوست جديد او التعديل عليه مش هنحطهم جوا العباره الشرطيه
    const title = document.getElementById("post-title-input").value;
    const body = document.getElementById("post-body-input").value;
    const image = document.getElementById("post-image-input").files[0];
    const token = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", image);
    

    
    let url = ``;
    const header = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
    }

    if(isCreate){
        url = `${baseUrl}posts`;
        
    }else{
                //put علشان الايديت بتستخدم ال
                //علشان في الايبي اي دا مختلف في الحالات العاديه بنغيره post ل put بس
                //ومبنكتبش السطر دا
                formData.append("_method", "put");
        
                url = `${baseUrl}posts/${postId}`;
   
    }
    //put علشان اضافه بوست او الكرييت بتستخدم ال
         axios.post(url,formData , {headers: header})
    .then((response) => {
        const modal = document.getElementById("add-post-modal");
        const modalInstance = bootstrap.Modal.getInstance(modal);       
        modalInstance.hide();
        showAlert("تم انشاء البوست بنجاح ✅", "success");
        getPosts();
    }).catch((error) => {
        const message = error.response.data.message;
        showAlert(message, "danger");
    });

   
}
