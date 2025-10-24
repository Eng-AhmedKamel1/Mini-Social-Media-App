// window.onload = setupUI;
// const baseUrl = "https://tarmeezacademy.com/api/v1/";
// let currentPage = 1;
// let lastPage = 1;    
// //infinity scroll
// //هنا بعمل حدث للسكرول لما يوصل لنهاية الصفحة يجيب البوستات من الابى ايه
// //وبزيد رقم الصفحة بواحد
// //وبجيب البوستات من الابى ايه
// //وبستخدم الفنكشن اللي جبتها من فوق

// window.addEventListener("scroll", () => {
//     const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;
//     //هنا بعمل شرط علشان لما يوصل لاخر صفحة مايحصلش ايرور
//     //وبزيد رقم الصفحة بواحد/   
//     if(endOfPage && currentPage < lastPage){
//         currentPage= currentPage + 1;
//         getPosts(false , currentPage);
//     }
// });
 

// //هنا بجيب البوستات من الابى ايه باستخدام اكسيوس
// //وبعدين بعرضهم في الصفحة
// //وبستخدم الفور اوف علشان اعمل لوب على المصفوفه
// //وبستخدم innerHTML علشان اعرضهم في الصفحة
// //وبستخدم التمبلت سترنج علشان ابني ال HTML
// getPosts();

// function getPosts(reload = true , page = 1){
// axios.get(`${baseUrl}posts?limit=3&page=${page}`)
//     .then((response) => {
//         const posts = response.data.data;
//         //هنا بجيب اخر صفحة من الميتا داتا
//         //علشان اعرف امتى اوصل لاخر صفحة في الانفينيتي سكرول
//         lastPage = response.data.meta.last_page;
//         //هنا بعمل شرط علشان لما يكون الريلود ترو يمسح البوستات القديمة
//         //ويعرض البوستات الجديدة
//         if (reload) {
//     const postsElement = document.getElementById("posts");
//     if (postsElement) {
//         postsElement.innerHTML = "";
//     }
// }
        

//         for(post of posts){
//             console.log(post);
//             const author = post.author;
//             let postTitle = ""
//             if(post.title != null)
//             {
//                 postTitle = post.title
//             }
//             let content =`
//             <div class="card shadow-lg mb-5">
//         <div class="card-header">
//             <img class="rounded-circle border border-3" src="${author.profile_image}" alt="" style="width: 40px ; height: 40px ; " >
//             <b>${author.username}</b>
//         </div>
//         <div class="card-body" onclick="postClicked(${post.id})" style="cursor: pointer;">
//             <img class="w-100" src="${post.image}" alt="">

//             <h6 class="mt-1" style="color: rgb(143, 142, 142);">${post.created_at}</h6>

//             <h5>${postTitle}</h5>

//             <p>
//                 ${post.body}
//             </p>

//             <hr/>

//             <div>
//              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
//             <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
//             </svg>  
//                 <span>
//                     (${post.comments_count}) comments
//                 </span>

//                 <span id="post-tags-${post.id}">

//                 </span>
                
//             </div>

//         </div>
//         </div>
//             `

//             document.getElementById("posts").innerHTML += content;
//             //هنا بجيب التاجز بتوع البوست وبعرضهم
//             const currentPostTagsId = `post-tags-${post.id}`;
//             document.getElementById(currentPostTagsId).innerHTML = "";
//             for(tag of post.tags){
//                 console.log(tag.name);
//                 let tagContent = `
                
//                 <button class="btn btn-sm rounded-5" style="background-color: gray; color:white;">${tag.name}</button>
                             
//                   `
//                 document.getElementById(currentPostTagsId).innerHTML += tagContent;
//             }
//         }
//     })
// }


//     //هنا بعمل فانكشن علشان اخد الداتا من الانبوتات لما يضغط على زر تسجيل الدخول
//     //وبعدين ابعتها للابى ايه باستخدام اكسيوس 
    
//     function loginBtnClicked(){
//         const username = document.getElementById("username-input").value;
//         const password = document.getElementById("password-input").value;
        
//         const prams = {
//             "username": username,
//             "password": password
//         }
//        const url = `${baseUrl}login`;
//          axios.post(url, prams)
//          .then((response) => {
//             //هنا بحفظ التوكن في اللوكال ستورج
//         localStorage.setItem("token", response.data.token);
//         //هنا بحفظ بيانات اليوزر في اللوكال ستورج وبحولها من اوبجكت لسترنج
//         //  علشان اللوكل ستورج بيحفظ سترنج بس    
//         localStorage.setItem("user", JSON.stringify(response.data.user));  

//         //هنا خاصيه علششانا اخفي المودل في البوت ستراب
//       const modal = document.getElementById("login-modal")
//         const modalInstance = bootstrap.Modal.getInstance(modal);       
//         modalInstance.hide();
//         showAlert("تم تسجيل الدخول بنجاح ✅", "success");
//         setupUI();



//          }) 
        
    
//      }

//         //هنا بعمل فانكشن علشان اخد الداتا من الانبوتات لما يضغط على زر تسجيل الحساب
//         //وبعدين ابعتها للابى ايه باستخدام اكسيوس
//      function registerBtnClicked(){
//         const name = document.getElementById("register-name-input").value;
//         const username = document.getElementById("register-username-input").value;
//         const password = document.getElementById("register-password-input").value;
//         const image = document.getElementById("register-image-input").files[0];
       
//         // بصيغه الفورم داتا بدل التاني اللي بيمثلها بالجيسون الpramsهنا بعمل فورم داتا علشان ابعت الصورة في الابى ايه ودا اللي بيمثل  
//         //ودا بنعمل اوبجيكت من كلاس
//         let formData = new FormData();
//         //وبعدين بنضيف الداتا للفورم 
//         //بAppend علشان دي مصفوفه
//         formData.append("name", name);
//         formData.append("username", username);
//         formData.append("password", password);
//         formData.append("image", image);
        
        
//        //هنا بعمل الهيدر
//          const header = {
//             // هلنا بحدد نوع الداتا اللي بابعته
//             //ومش لازم نضيفها الاكسيوس لوحده بتفهمه لاني ببعت فورم داتا
//             "Content-Type": "multipart/form-data",
//          }
//          //هنا بابعث الريكوست مع الهيدر 
       
//        const url = `${baseUrl}register`;
//          axios.post(url, formData , {headers: header})
//          .then((response) => {
//             console.log(response.data);
//             //هنا بحفظ التوكن في اللوكال ستورج
//         localStorage.setItem("token", response.data.token);
//         //هنا بحفظ بيانات اليوزر في اللوكال ستورج وبحولها من اوبجكت لسترنج
//         //  علشان اللوكل ستورج بيحفظ سترنج بس    
//         localStorage.setItem("user", JSON.stringify(response.data.user));  

//         //هنا خاصيه علششانا اخفي المودل في البوت ستراب
//       const modal = document.getElementById("register-modal")
//         const modalInstance = bootstrap.Modal.getInstance(modal);       
//         modalInstance.hide();
//         showAlert("تم انشاء الجساب بنجاح ✅");
//         setupUI();

//          }) .catch((error) => {
//             const message = error.response.data.message;
//             showAlert(message, "danger");
//          })
        
    
//      }

//      // هنا بعمل فانكشن علشان لما يضغط على زر تسجيل الخروج يمسح التوكن واليوزر من اللوكال ستورج
//      //وبعدين يعيد تحميل الصفحة
//      function logout(){
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setupUI();
//         showAlert("تم تسجيل الخروج بنجاح ✅" ,"danger");
//      }

//         //هنا بعمل فانكشن علشان اخد الداتا من الانبوتات لما يضغط على زر انشاء بوست جديد
//         //وبعدين ابعتها للابى ايه باستخدام اكسيوس 
//         //وبستخدم الفورم داتا علشان ابعت الصورة
//         //وبستخدم الهيدر علشان ابعت التوكن مع الريكوست
//         //وبستخدم بوت ستراب علشان اخفي المودل بعد انشاء البوست
//         //ويتم نشر البوست الجديد في الصفحة بدون اعادة تحميل الصفحة     
// function createNewPostClicked(){
//         const title = document.getElementById("post-title-input").value;
//         const body = document.getElementById("post-body-input").value;
//         const image = document.getElementById("post-image-input").files[0];
//        //هنا بجلب التوكن من اللوكال ستورج علشان ابعته في الهيدر مع الريكوست
//         const token = localStorage.getItem("token");

//         // بصيغه الفورم داتا بدل التاني اللي بيمثلها بالجيسون الpramsهنا بعمل فورم داتا علشان ابعت الصورة في الابى ايه ودا اللي بيمثل  
//         //ودا بنعمل اوبجيكت من كلاس
//         let formData = new FormData();
//         //وبعدين بنضيف الداتا للفورم 
//         //بAppend علشان دي مصفوفه
//         formData.append("title", title);
//         formData.append("body", body);
//         formData.append("image", image);
        
//        const url = `${baseUrl}posts`;
//        //هنا بعمل الهيدر
//          const header = {
//             // هلنا بحدد نوع الداتا اللي بابعته
//             //ومش لازم نضيفها الاكسيوس لوحده بتفهمه لاني ببعت فورم داتا
//             "Content-Type": "multipart/form-data",
//             //هنا بابعث التوكن مع الريكوست
//             "Authorization": `Bearer ${token}`
//          }
//          //هنا بابعث الريكوست مع الهيدر 
//          axios.post(url,formData , {headers: header})
//          .then((response) => {
//         const modal = document.getElementById("add-post-modal")
//         const modalInstance = bootstrap.Modal.getInstance(modal);       
//         modalInstance.hide();
//         showAlert("تم انشاء البوست بنجاح ✅", "success");
//         getPosts();



//          }).catch((error) => {
//             const message = error.response.data.message;
//             showAlert(message, "danger");
//          })


        
//     }


// // لاستدعاء اظهار الاليرت الناجح باستخدام بوت ستراب
//      function showAlert(message , type="success"){
//   const alertPlaceholder = document.getElementById('success-alert');
//   const alert=(message , type) => {
//   const wrapper = document.createElement('div')
//   wrapper.innerHTML =
//   [
//      `<div class="alert alert-${type} alert-dismissible " role="alert">`,
//       `<div>${message}</div>`,
//       '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//     '</div>'
//     ].join('')

  
//   alertPlaceholder.append(wrapper);
//      }
//     alert(message, type)

//     setTimeout(() => { alertPlaceholder.innerHTML = ''; }, 3000);
// }
// // // نهاية استدعاء اظهار الاليرت الفاشل باستخدام بوت ستراب    



// //هنا بعمل فانكشن علشان اخفي ازرار تسجيل الدخول والتسجيل لما يكون في توكن
// //واستدعيها في بداية السكربت
// function setupUI()
// {
//     //هنا بجلب التوكن من اللوكال ستورج
//     const token = localStorage.getItem("token");
//     //login&register and logout div
//     const loginDiv = document.getElementById("login-div");
//     //logout div
//     const logoutDiv = document.getElementById("logout-div");
//     //add post button
//     const addPostBtn = document.getElementById("add-btn");

//     if(token == null){//when user is not logged in
//         loginDiv.style.setProperty("display", "flex", "important");
//         logoutDiv.style.setProperty("display", "none", "important");
//         if( addPostBtn != null){
//             addPostBtn.style.setProperty("display", "none", "important");
//         }
//     }else{//when user is logged in
//         loginDiv.style.setProperty("display", "none", "important");
//         logoutDiv.style.setProperty("display", "flex", "important");
//         if( addPostBtn != null){
//             addPostBtn.style.setProperty("display", "block", "important");
//         }
        
//         const user = getCurentUser();
//         document.getElementById("nav-usernme").innerHTML = user.username;
//         document.getElementById("nav-userimge").src = user.profile_image;

//     }
// }
// //هنا بعمل فانكشن علشان اخد كل بيانات اليوزر الحالي من اللوكال ستورج
// function getCurentUser(){
//     //هنا بجلب بيانات اليوزر من اللوكال ستورج وبحولها من سترنج لاوبجكت
//     //  علشان اللوكل ستورج بيحفظ سترنج بس
//     // وبستخدم البارس علشان احولها 
//     //ولو مفيش يوزر في اللوكال ستورج بترجعلي نال
//     // وبستخدم الايف علشان مايحصلش ايرور لما مفيش يوزر    
// let user =null;
// const storageUser = localStorage.getItem("user");
// if(storageUser != null){
//     user = JSON.parse(storageUser);
// }
// return user;
  
// }

// //post clicked details

// function postClicked(postId){
// window.location = `postDetails.html?postId=${postId}`;
// }

// //علشان اعرف البوست اللي اتضغط عليه في صفحة التفاصيل
// //بجيب ال id من ال url
// //وبعدين بستخدمه في الابى ايه علشان اجيب بيانات البوست


// const urlParams = new URLSearchParams(window.location.search);
// const id = urlParams.get("postId");

// getPost();
// function getPost(){
// axios.get(`${baseUrl}posts/${id}`)
//     .then((response) => {
//             const post = response.data.data;
//             const author = post.author;
//             const comments = post.comments;
//             document.getElementById("username-span").innerHTML = author.username;
//            let postTitle = ""
//             if(post.title != null)
//             {
//                 postTitle = post.title
//             }
//             const postContent = 
//             `
//             <div class="card shadow-lg mb-5">
//         <div class="card-header">
//             <img class="rounded-circle border border-3" src="${author.profile_image}" alt="" style="width: 40px ; height: 40px ; " >
//             <b>${author.username}</b>
//         </div>
//         <div class="card-body" onclick="postClicked(${post.id})" style="cursor: pointer;">
//             <img class="w-100" src="${post.image}" alt="">

//             <h6 class="mt-1" style="color: rgb(143, 142, 142);">${post.created_at}</h6>

//             <h5>${post.title}</h5>

//             <p>
//                 ${post.body}
//             </p>

//             <hr/>

//             <div>
//              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
//             <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
//             </svg>  
//                 <span>
//                     (${post.comments_count}) comments
//                 </span>

//                 <span id="post-tags-${post.id}">

//                 </span>
                
//             </div>

//         </div>
//         </div>
            
//             `
//         document.getElementById("post").innerHTML = postContent;
        
//     })
// }
