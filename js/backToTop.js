// back to top
let mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    } else {
    mybutton.style.display = "none";
    }
}
document.getElementById('myBtn').onclick = topFunction;
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // console.log(document.body);
}