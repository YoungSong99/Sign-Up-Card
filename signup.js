document.addEventListener("DOMContentLoaded", function () {


    const handlePhoneInput = (currId, nextId, maxLen) => {
        let input = document.getElementById(currId).value

        if (input.length === maxLen) {
            if (nextId) {
                document.getElementById(nextId).focus()
            }
        }

        let p1_filled = document.getElementById("phone1").value.length === 3
        let p2_filled = document.getElementById("phone2").value.length === 4
        let p3_filled = document.getElementById("phone3").value.length === 4

        if (p1_filled && p2_filled && p3_filled) {
            document.getElementById("send_token").disabled = false;
        }
    };

    window.handlePhoneInput = handlePhoneInput;

    let isAuthStarted = false;
    let time = 10;
    let timer;

    const generateToken = () => {
        let token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
        document.getElementById("token").innerText = token;
        document.getElementById("send_token").disabled = true;
    }

    window.generateToken = generateToken;

    const refreshTokenStatus = () => {
        isAuthStarted = false;
        clearInterval(timer)
        document.getElementById("token").innerText = "000000";
        document.getElementById("complete_token").disabled = true;
        document.getElementById("send_token").disabled = false;
    }

    window.refreshTokenStatus = refreshTokenStatus;


    const tokenTimer = () => {

        if (isAuthStarted === false) {
            isAuthStarted = true;

            generateToken()

            timer = setInterval(function () {
                if (time >= 0) {

                    // button active
                    document.getElementById("complete_token").disabled = false;

                    // time update
                    let min = String(Math.floor(time / 60)).padStart(2, "0")
                    let sec = String(time % 60).padStart(2, "0")

                    document.getElementById("min").innerText = min;
                    document.getElementById("sec").innerText = sec;

                    time--
                } else {
                    refreshTokenStatus()
                }
            }, 1000)
        }
    };

    window.tokenTimer = tokenTimer;


    let formFields = {
        "email": false,
        "name": false,
        "password": false,
        "password-conf": false,
        "phone": false,
        "region_dropdown": false,
        "gender": false,
        "agree": false
    }

    const tokenConfirmed = () => {
        alert("Verification is completed");
        refreshTokenStatus()
        formFields["phone"] = true;
    }

    window.tokenConfirmed = tokenConfirmed;

    const isFilled = (id) => {

        let input_value = document.getElementById(id).value


        if (id === "Male" || id === "Female" || id === "Prefer not to say" || id === "Other") {
            if (input_value) {
                formFields["gender"] = true;
            }
        } else {
            if (input_value && input_value.trim() !== "") {
                formFields[id] = true;
            } else {
                formFields[id] = false;
            }
        }

        document.getElementById("submit_btn").disabled = Object.values(formFields).includes(false);
    }

    window.isFilled = isFilled;


    const submitVerification = () => {

        isValid = true;

        let email = document.getElementById("email").value
        let name = document.getElementById("name").value
        let password = document.getElementById("password").value
        let password_confirm = document.getElementById("password-conf").value
        let region = document.getElementById("region_dropdown").value

        let Male = document.getElementById("Male").checked
        let Female = document.getElementById("Female").checked
        let Not = document.getElementById("Prefer not to say").checked
        let Other = document.getElementById("Other").checked



        if (!email.includes("@")){
            document.getElementById("email_error").style.display = 'block'
            isValid = false;
        } else {
            document.getElementById("email_error").style.display = 'none'
        }

        if (name === ""){
            document.getElementById("name_error").style.display = 'block'
            isValid = false;
        } else {
            document.getElementById("name_error").style.display = 'none'
        }


        if (password !== password_confirm){
            document.getElementById("password_error").style.display = 'block'
            isValid = false;
        } else {
            document.getElementById("password_error").style.display = 'none'
        }


        if(region === "" || !region){
            document.getElementById("region_error").style.display = 'block'
            isValid = false;
        } else {
            document.getElementById("region_error").style.display = 'none'
        }

        if( Male||Female||Not||Other ) {
            document.getElementById("gender_error").style.display = 'none'
        } else {
            document.getElementById("gender_error").style.display = 'block'
            isValid = false;
        }

        console.log(isValid)

        if (isValid) {
            alert("Your registration has been successfully completed.")
        }

    }
    window.submitVerification = submitVerification;

});
