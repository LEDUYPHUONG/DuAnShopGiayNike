import '../js/backToTop.js'
// js for index.html

function getDanhSachDoiTuong(){

    let promise = axios ({
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
    let htmlContent = '';
    for (let index = 0; index < arrDoiTuong.length; index ++) {
        let doiTuong = arrDoiTuong[index];
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
    let htmlContent = '';
    let htmlContentIndicators = '';
    for (let index = 0; index < arrDoiTuong.length; index ++) {
        let doiTuong = arrDoiTuong[index];
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

    let promise = axios ({
        url:'https://shop.cyberlearn.vn/api/Product/getbyid?id=' + myParam,
        method:'GET',
    });

    promise.then(function(result){
        // console.log(result.data.content)

        renderDoiTuong(result.data.content,'tbody-productName');
    })
}


function renderDoiTuong (doiTuong,idBodyDT){ 
    
    let htmlContentDT = `
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
                        <p id= "BtnSizeGiay"></p>
                    </div>
                    <div class="doituong-price">
                        <p>${doiTuong.price}$</p>
                    </div>
                    <div class="doituong-amount">
                        <p> <span class="iconAmount">-</span> <span class="number-amount">1</span> <span class="iconAmount">+</span> </p>
                    </div>
                    <button class="btn-addtocart btn"><p>Add to cart</p></button>
                </div>
            </div>
        </div>
    `
    document.getElementById(idBodyDT).innerHTML = htmlContentDT;
    

    // add các button size giày vô trong <p id= "BtnSizeGiay"></p>
   
    console.log(doiTuong.size);
    let htmlBtnSizeGiay = '';
        for(let index = 0; index < doiTuong.size.length; index ++){
            // <button class="btn btn-dark text-white"></button>
            htmlBtnSizeGiay += `
            <button class="btn btn-dark text-white">${doiTuong.size[index]}</button>
            `
        }

    document.getElementById('BtnSizeGiay').innerHTML = htmlBtnSizeGiay;


    
}

// windowonlad, xài chung cho cả js index.html và detail.html
window.onload = function (){
    getDanhSachDoiTuong();
    getDoiTuong();
}