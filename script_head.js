var before_loadtime = new Date().getTime();  
function Pageloadtime() {  
    var after_loadtime = new Date().getTime();  
    let loadtime = (after_loadtime - before_loadtime) / 1000 
    document.getElementById("Time").textContent = "Page loaded: " + loadtime;
}  
window.onload = Pageloadtime;