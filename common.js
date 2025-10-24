// common.js
// الكود المشترك بين كل الصفحات
const baseUrl = "https://tarmeezacademy.com/api/v1/";
let currentPage = 1;
let lastPage = 1;    

function userClicked(userId){
    console.log(userId);
    window.location = `profile.html?userid=${userId}`;
    

}

function profileClicked(){
    const user= getCurentUser();
    const userId = user.id;
    window.location = `profile.html?userid=${userId}`;
}
// دالة لجلب البوستات (مستخدمة في الصفحة الرئيسية)
function getPosts(reload = true , page = 1){
    axios.get(`${baseUrl}posts?limit=10&page=${page}`)
    .then((response) => {
        const posts = response.data.data;
        lastPage = response.data.meta.last_page;

        const postsContainer = document.getElementById("posts");
        // التأكد من أن حاوية البوستات موجودة قبل محاولة إضافة محتوى إليها
        if (!postsContainer) {
            return; // إذا لم تكن الحاوية موجودة، أوقف تنفيذ الدالة
        }

        if (reload) {
            postsContainer.innerHTML = ""; // مسح المحتوى فقط إذا كانت الحاوية موجودة
        }

        for(post of posts){
            const author = post.author;
            let postTitle = "";
            //show or hide (edit) button
            let user = getCurentUser();
            let isMyPost = user != null && post.author.id == user.id;
            let editButtonContent =``;
            if(isMyPost){
                editButtonContent = `
                <button  class="btn btn-danger " style="float: right; margin-left: 7px;" onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">Delete</button>
                <button  class="btn btn-secondary " style="float: right;" onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">Edit</button>
                `;
                
            }
            
            if(post.title != null) {
                postTitle = post.title;
            }
            
            // التحقق من أن روابط الصور هي سلاسل نصية صالحة
            const authorProfileImage = typeof author.profile_image === 'string' && author.profile_image ? author.profile_image : 'https://placehold.co/40';
            const postImage = typeof post.image === 'string' ? post.image : ''; // إذا لم تكن هناك صورة للمنشور، لا تعرض شيئًا

            // إخفاء عنصر الصورة إذا لم يكن هناك رابط صالح
            const postImageElement = postImage ? `<img class="w-100" src="${postImage}" alt="">` : '';

            let content =`
                <div class="card shadow-lg mb-5">
                  <div class="card-header" >
                    <span onclick="userClicked(${author.id})" style="cursor: pointer;">   
                    <img class="rounded-circle border border-3" src="${authorProfileImage}" alt="" style="width: 40px ; height: 40px ; " >
                    <b>${author.username}</b>
                    </span>

                    ${editButtonContent}
                    </div>
                    <div class="card-body" onclick="postClicked(${post.id})" style="cursor: pointer;">
                        ${postImageElement}
                        <h6 class="mt-1" style="color: rgb(143, 142, 142);">${post.created_at}</h6>
                        <h5>${postTitle}</h5>
                        <p>${post.body}</p>
                        <hr/>
                        <div>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                            </svg>  
                            <span>(${post.comments_count}) comments</span>
                            <span id="post-tags-${post.id}"></span>
                        </div>
                    </div>
                </div>`;
            
            postsContainer.innerHTML += content; // إضافة المحتوى مرة واحدة فقط
            
            // عرض التاجز لكل بوست
            const currentPostTagsId = `post-tags-${post.id}`;
            document.getElementById(currentPostTagsId).innerHTML = "";
            for(tag of post.tags){
                let tagContent = `<button class="btn btn-sm rounded-5" style="background-color: gray; color:white;">${tag.name}</button>`;
                document.getElementById(currentPostTagsId).innerHTML += tagContent;
            }
        }
    });
}

// دالة لضبط واجهة المستخدم (اظهار/اخفاء أزرار تسجيل الدخول والتسجيل والخروج)
function setupUI() {
    const token = localStorage.getItem("token");
    const loginDiv = document.getElementById("login-div");
    const logoutDiv = document.getElementById("logout-div");
    const addPostBtn = document.getElementById("add-btn");
    const comments = document.getElementById("comments");


    if(token == null){//when user logout
        loginDiv.style.setProperty("display", "flex", "important");
        logoutDiv.style.setProperty("display", "none", "important");
        if(addPostBtn != null){
            addPostBtn.style.setProperty("display", "none", "important");
        }
        if(comments != null){
            comments.style.setProperty("display", "none", "important");
        }
        
    }else{//when user login
        loginDiv.style.setProperty("display", "none", "important");
        logoutDiv.style.setProperty("display", "flex", "important");
        if(addPostBtn != null){
            addPostBtn.style.setProperty("display", "block", "important");
        }
        if(comments != null){
            comments.style.setProperty("display", "block", "important");
        }   
        
        const user = getCurentUser();
        if (user) { // التأكد من وجود كائن المستخدم
            document.getElementById("nav-usernme").innerHTML = user.username;
            const navUserImageElement = document.getElementById("nav-userimge");
            if (navUserImageElement) {
                // التحقق مما إذا كانت user.profile_image سلسلة نصية صالحة، وإلا استخدم صورة افتراضية
                navUserImageElement.src = (typeof user.profile_image === 'string' && user.profile_image) 
                                          ? user.profile_image 
                                          : 'https://via.placeholder.com/40x40?text=No+Image'; // يمكنك استبدال هذا بمسار صورة افتراضية محلية
            }
        }
    }
}

// دالة لجلب بيانات المستخدم الحالي من اللوكال ستورج
function getCurentUser(){
    let user = null;
    let storageUser = localStorage.getItem("user");
    if(storageUser != null && storageUser != "undefined"){
        user = JSON.parse(storageUser);
    }
    return user;
}

// دالة لإظهار رسالة تنبيه بوتستراب
function showAlert(message , type="success"){
    const alertPlaceholder = document.getElementById('success-alert');
    const alert = (message , type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="alert alert-${type} alert-dismissible " role="alert">
                <div>${message}</div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        alertPlaceholder.append(wrapper);
    }
    alert(message, type);
    setTimeout(() => { alertPlaceholder.innerHTML = ''; }, 3000);
}

// دالة للتنقل لصفحة تفاصيل البوست عند الضغط على البوست
function postClicked(postId){
    window.location = `postDetails.html?postId=${postId}`;
}
