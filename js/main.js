// back to top
var mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    } else {
    mybutton.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// js for index. HTML

function getDanhSachDoiTuong(){

    var promise = axios ({
        url:'https://shop.cyberlearn.vn/api/Product',
        method:'GET',
    });

    promise.then(function(result){
        // console.log(result.data.content)

        renderDanhSachDoiTuong(result.data.content,'rendertable');
    })
}


function renderDanhSachDoiTuong (arrDoiTuong,idBody){
    var htmlContent = '';
    for (var index = 0; index < arrDoiTuong.length; index ++) {
        var doiTuong = arrDoiTuong[index];
        // console.log(doiTuong)

        htmlContent += `
        <div class="rendertable-item">
            <div class="rendertable-item-inner"">
                <div class="rendertable-item-inner-top">
                    <img src="${doiTuong.image}" alt="...">
                </div>
                <div class="rendertable-item-inner-mid">
                    <p>${doiTuong.alias}</p>
                    <p><span>${doiTuong.shortDescription}</span></p>
                </div>
                <div class="rendertable-item-inner-bottom">
                    <button class="btn btn-warning" onclick="muaDoiTuong('${doiTuong.id}')">Buy now</button>
                    <button class="btn btn-secondary btn-gia" type="button">${doiTuong.price}$</button>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById(idBody).innerHTML = htmlContent;
}


window.onload = function (){
    getDanhSachDoiTuong();
}