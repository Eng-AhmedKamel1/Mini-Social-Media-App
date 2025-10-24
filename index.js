// index.js
// استدعاء إعداد واجهة المستخدم عند تحميل الصفحة
window.addEventListener('load', function () {
    setupUI();
    getPosts();

    // إضافة حدث الانفينيتي سكرول
    window.addEventListener("scroll", () => {
        const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if(endOfPage && currentPage < lastPage){
            currentPage = currentPage + 1;
            getPosts(false , currentPage);
        }
    });
});
