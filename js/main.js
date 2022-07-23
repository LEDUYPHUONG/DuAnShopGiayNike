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

// js for index.html

function getDanhSachDoiTuong(){

    var promise = axios ({
        url:'https://shop.cyberlearn.vn/api/Product',
        method:'GET',
    });

    promise.then(function(result){
        // console.log(result.data.content)

        renderDanhSachDoiTuong(result.data.content,'rendertable');
        renderDanhSachDoiTuongCarousel(result.data.content,'carousel-inner','carousel-indicators');
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
                    <a href="./detail.html?productid=${doiTuong.id}" class="btn-buyNow">Buy now</a>
                    <span class="btn-gia">${doiTuong.price}$</span>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById(idBody).innerHTML = htmlContent;
}

function renderDanhSachDoiTuongCarousel (arrDoiTuong,idBodyCarousel,idBodyIndicators){
    var htmlContent = '';
    var htmlContentIndicators = '';
    for (var index = 0; index < arrDoiTuong.length; index ++) {
        var doiTuong = arrDoiTuong[index];
        // console.log(doiTuong)
        if(doiTuong === arrDoiTuong[0]){
            htmlContent += `
            <div class="carousel-item active">
                <div class="carousel-container  d-flex justify-content-around align-items-center">
                    <div class="rendertable-item-inner"">
                        <div class="carousel-product">
                            <img class="overlay-image" src="${doiTuong.image}" alt="...">
                        </div>
                        <div class="carousel-infoProduct">
                            <div class="infoProduct">
                                <h1>${doiTuong.name}</h1>
                                <h4>${doiTuong.shortDescription}</h4>
                                <a href="./detail.html?productid=${doiTuong.id}" class="btn-buyNow">Buy now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            htmlContentIndicators += `<button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            `
        } else {
            htmlContent += `
            <div class="carousel-item ">
                <div class="carousel-container  d-flex justify-content-around align-items-center">
                    <div class="rendertable-item-inner"">
                        <div class="carousel-product">
                            <img class="overlay-image" src="${doiTuong.image}" alt="...">
                        </div>
                        <div class="carousel-infoProduct">
                            <div class="infoProduct">
                                <h1>${doiTuong.name}</h1>
                                <h4>${doiTuong.shortDescription}</h4>
                                <a href="./detail.html?productid=${doiTuong.id}" class="btn-buyNow">Buy now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            htmlContentIndicators += `<button type="button" data-bs-target="#myCarousel" data-bs-slide-to="${index }" aria-label="Slide ${index + 1}"></button>
            `
        }
    }
    document.getElementById(idBodyCarousel).innerHTML = htmlContent;
    document.getElementById(idBodyIndicators).innerHTML = htmlContentIndicators;
}



// js for detail.html


    // phần kỹ thuật queryparam, lấy dữ liệu người dùng khi click vào nút button mua
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('productid');
    // console.log('params',myParam);

function getDoiTuong(){

    var promise = axios ({
        url:'https://shop.cyberlearn.vn/api/Product/getbyid?id=' + myParam,
        method:'GET',
    });

    promise.then(function(result){
        // console.log(result.data.content)

        renderDoiTuong(result.data.content,'tbody-productName');
    })
}


function renderDoiTuong (doiTuong,idBodyDT){
    var htmlContentDT = '' + `
        <div class="container_doituong">
            <div class="row">
                <div class="img-doituong-out">
                    <div class="img-doituong-in">
                        <img src="${doiTuong.image}" alt="...">
                    </div>
                </div>
                <div class="doituong-description">
                    <div class="doituong-name">
                        <h1>${doiTuong.name}</h1>
                        <p>${doiTuong.description}</p>
                    </div>
                    <div class="doituong-size">
                        <h2>Available size</h2>
                        <p>${doiTuong.size}</p>
                    </div>
                    <div class="doituong-price">
                        <p>${doiTuong.price}$</p>
                    </div>
                    <div class="doituong-amount">
                        <p> <span>+</span> <span class="number-amount">1</span> <span>+</span> </p>
                    </div>
                    <button class="btn-addtocart btn"><p>Add to cart</p></button>
                </div>
            </div>
        </div>
        `
    document.getElementById(idBodyDT).innerHTML = htmlContentDT;
}


// windowonlad, xài chung cho cả js index.html và detail.html
window.onload = function (){
    getDanhSachDoiTuong();
    getDoiTuong();
}