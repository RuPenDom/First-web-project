var options = {
    threshold: 0.9
    // rootMargin: '-5px 0px -50%'
}
var callback = function(entries, observer) {
    entries.forEach(entry => {
        btn = document.querySelector("button." + entry.target.classList[0])
        if (entry.isIntersecting){
            other_btns = document.querySelectorAll('button')
            other_btns.forEach(b => {
                b.classList.remove('viewing')
            })
            btn.classList.add('viewing')
            console.log(btn)
        }
    })
};
var observer = new IntersectionObserver(callback, options);

['div.home', 'article.about', 'article.contacts'].forEach(el => {
    var target = document.querySelector(el);
    observer.observe(target);
})