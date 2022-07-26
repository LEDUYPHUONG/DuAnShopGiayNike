import { User} from '../models/User.js'
// js for Register.html
// let checkGenderInputMale = document.querySelector('input[value=true]');
// let checkGenderInputFemale = document.querySelector('input[value=false]');
// console.log(checkGenderInputMale);
// console.log(checkGenderInputFemale);
let userGender;
document.querySelector('input[value=true]').addEventListener('click', () =>{
    userGender = true;
    // console.log('userGender',userGender);
    // document.getElementById('gender').value = true;
})
document.querySelector('input[value=false]').addEventListener('click', () =>{
    userGender = false;
    // console.log('userGender',userGender);
    // document.getElementById('gender').value = false;
})


// đang làm theo cách 1
document.getElementById('btnSubmit').onclick = async function (){
    // làm theo cách 2:
// document.getElementById('btnSubmit').onclick = function (){
    let user = new User();
    user.email = document.getElementById('email').value;
    user.password = document.getElementById('password').value;
    user.name = document.getElementById('name').value;
    user.phone = +document.getElementById('phone').value;
    // user.gender = document.getElementById('gender').value;
    user.gender = userGender;
    // console.log(user)
    // if(user.gender === true){
    //     document.getElementById('gender').value = true;
    // } else {
    //     document.getElementById('gender').value = false;
    // }
    //   phần kiểm tra thông tin người dùng nhập vào input

    if(user.gender === undefined ){
        return alert ("chưa điền thông tin giới tính kìa bạn");
    }

    var isValid = validation()
    if(!isValid){
        return alert ("Vui lòng kiểm tra các input đã điền đủ chưa");
    }

    
    function validation(){
        // debugger;
        // kiểm tra không được để trống: hàm validation
        // hàm checkValidity() là hàm kiểm tra xemc các input bên trong tag form có hợp lệ hay không.
        var isValid = document.getElementById("formUser").checkValidity();
        // => kiểm tra toàn bộ, chỉ cần 1 input trống thì không hợp lệ
    
        console.log('isValid: ',isValid);
        if(!isValid){
            // DOM tói input email và kiểm tra hợp lệ
            var inpEmail = document.getElementById("email");
            var spanEmail = document.getElementById("spanEmail");
            if(inpEmail.validity.valueMissing){
                // input đang bị lỗi required.
                spanEmail.innerHTML = "Email không được để trống";
                
            } else if (inpEmail.validity.patternMismatch){
                // input đang bị lỗi định dạng không hợp lệ
                spanEmail.innerHTML = "Email không đúng định dạng";
            } else {
                spanEmail.innerHTML = ""
            }        


            // DOM tói input password và kiểm tra hợp lệ
            var inpPassword = document.getElementById("password");
            var spanPassword = document.getElementById("spanPassword");
            if(inpPassword.validity.valueMissing){
                // input đang bị lỗi required
                spanPassword.innerHTML = "Password không được để trống";
            } else if (inpPassword.validity.patternMismatch){
                // input đang bị lỗi không đúng định dạng
                spanPassword.innerHTML = "Password không đúng định dạng. Phải có tối thiểu 6 và tối đa 10 ký tự, ít nhất một chữ cái viết hoa(A-Z), một kí số(0-9) và một ký tự đặc biệt ( một trong các kí tự sau: @$!%*?&}";
            } else {
                spanPassword.innerHTML = "";
            }
            
            // DOM tới input passwordConfirm và kiểm tra hợp lệ
            var inpPasswordConfirm = document.getElementById("passwordConfirm");
            var spanPasswordConfirm = document.getElementById("spanConfirm");
            
            if(user.password !== inpPasswordConfirm.value){
                spanPasswordConfirm.innerHTML = 'Password confirm chưa giống với password';
  
            } else {
                spanPasswordConfirm.innerHTML = '';
            }

            // DOM tới input name và kiểm tra hợp lệ
            // typeMismatch: kiểm tra các input có type đặc biệt như email,date,...
            var inpName= document.getElementById("name");
            var spanName= document.getElementById("spanName");
            if(inpName.validity.valueMissing){
                // input đang bị lỗi required
                spanName.innerHTML = "Tên người dùng không được để trống";
            } else if (inpName.validity.patternMismatch){
                // input đang bị lỗi không đúng định dạng
                spanName.innerHTML = "Tên người dùng không đúng định dạng";
            } else {
                spanName.innerHTML = "";
            }

            // DOM tới select phone và kiểm tra hợp lệ
            var inpPhone= document.getElementById("phone");
            var spanPhone= document.getElementById("spanPhone");
            if(inpPhone.validity.valueMissing){
                // input đang bị lỗi required
                spanPhone.innerHTML = "Số điện thoại không được để trống";
            } else if (inpPhone.validity.patternMismatch){
                // input đang bị lỗi không đúng định dạng
                spanPhone.innerHTML = "Số điện thoại không đúng định dạng (ví dụ: 0123456789 hoăc 123456789)";
            } else {
                spanPhone.innerHTML = "";
            }
        
            // // Dom tới input gender và kiểm tra hợp lệ
            // // validity.rangeUnderflow: trả ra true nếu giá trị của input nhở hơn giá trị của attributr min.
            // // validity.rangeOverflow: trả ra true nếu giá trị của input nhở hơn giá trị của attributr max.
            // var inpGender= document.getElementById("gender");
            // var spanGender= document.getElementById("spanGender");
            // if(inpGender.validity.valueMissing){
            //     // input đang bị lỗi required
            //     spanGender.innerHTML = "Giới tính không được để trống";
            // } else {
            //     spanGender.innerHTML = "";
            // }
        }
        return isValid;
    }
    







    // phần call API gữi dữ liệu người dùng cho backend 
    // cách 1:
    // A sài async await là 1 cách, nó sẽ trả ra cho a kết quả luôn
    // Nhưng khi lỗi nó sẽ k trả ra, nên phải sử dụn try catch để bắt trong trường hợp nó lỗi
    
    var mess = '';
    try {
        var result = await axios ({
            url: 'https://shop.cyberlearn.vn/api/Users/signup',
            method: 'POST',
            data: user,
    
        });
        mess = result.data
        console.log(mess.content)
        alert (mess.message);
    }
    catch (err){
        console.log(err.response?.data.content)
        alert('Email này đã được sử dụng để đăng kí, hãy dùng email khác để đăng kí');
    }
    

    // cách 2:
    // a tạo 1 biến promise để để api bằng axios thông thường thì nó sẽ trả về cho a 1 Promise
    // Bắt buộc a phải .then() để lấy giá trị khi thành công
    // Và .catch() để lấy giá trị khi thất bại

    // var mess = '';
    // var promise = axios ({
    //     url: 'https://shop.cyberlearn.vn/api/Users/signup',
    //     method: 'POST',
    //     data: user,

    // });

    // promise.then(function(result){
    //     console.log('result', result)
    //     mess = 'Thêm thành công'
    //     alert(mess);
    // })

    // promise.catch(function(err){
    //     console.log('err', err.response?.data)
    //     mess = 'Thêm thất bại'
    //     alert(mess + 'Email đã được đăng kí');
    // })  
}
