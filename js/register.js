import '../models/User.js';
// js for Register.html

document.getElementById('btnSubmit').onclick = async function (){
    let user = new User();
    user.email = document.getElementById('email').value;
    user.password = document.getElementById('password').value;
    user.name = document.getElementById('name').value;
    user.phone = +document.getElementById('phone').value;
    user.gender = document.getElementById('gender').value;

    console.log(user);   
    var mess = '';
    try {
        var result = await axios ({
            url: 'https://shop.cyberlearn.vn/api/Users/signup',
            method: 'POST',
            data: user,
    
        });
        mess = result.data

    }
    catch (err){
        alert(err.response?.data);
    }
    
  



    promise.then(function(result){
        console.log('result', result)
        mess = 'Thêm thành công'
    })

    promise.catch(function(err){
        console.log('err', err.response?.data)
        mess = 'Thêm thất bại'
    })

    alert (mess);
}

