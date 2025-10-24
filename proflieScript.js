
function geuCurrentUserId(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("userid");
    return id;
}
function getUsers(){
    
    // Check if we are on the profile page before running the function
    const mainInfoContainer = document.getElementById("main-info");
    if (!mainInfoContainer) {
        return;
    }

        
        const id = geuCurrentUserId();

        axios.get(`${baseUrl}users/${id}`)
        .then((response) => {
        const user = response.data.data;
        console.log(user)
        document.getElementById("main-info-email").innerHTML = user.email;
        document.getElementById("main-info-name").innerHTML = user.name;
        document.getElementById("main-info-username").innerHTML = user.username;
        document.getElementById("main-info-img").src = (typeof user.profile_image === 'string' && user.profile_image) ? user.profile_image : 'https://placehold.co/120';
        document.getElementById("main-posts").innerHTML = user.username;

        //posts &comments count
        document.getElementById("posts-count").innerHTML=user.posts_count;
        document.getElementById("comments-count").innerHTML=user.comments_count;

        // Now that we have the user info, get their posts
        getUserPosts();
    })
}

function getUserPosts(){
    const id = geuCurrentUserId();
    axios.get(`${baseUrl}users/${id}/posts`)
    .then((response) => {
        
        const posts = response.data.data;
        const userPostContainer = document.getElementById("user-post");

        // If the 'user-post' container doesn't exist on this page, stop the function.
        if (!userPostContainer) {
            return;
        }
        userPostContainer.innerHTML ="";

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
                    <div class="card-header">
                        <img class="rounded-circle border border-3" src="${authorProfileImage}" alt="" style="width: 40px ; height: 40px ; " >
                        <b>${author.username}</b>
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
            
            userPostContainer.innerHTML += content; // إضافة المحتوى مرة واحدة فقط
            
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


window.addEventListener('load', function () {
    getUsers();
    setupUI();
});