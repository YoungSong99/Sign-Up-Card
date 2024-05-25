document.addEventListener("DOMContentLoaded", function () {
    let isAuthStarted = false;
    let timer;
    let time = 10;

    const formFields = {
        email: false,
        name: false,
        password: false,
        passwordConf: false,
        phone: false,
        region: false,
        gender: false,
        agree: false
    };

    window.handlePhoneInput = (currId, nextId, maxLen) => {
        const input = document.getElementById(currId).value;
        if (input.length === maxLen && nextId) {
            document.getElementById(nextId).focus();
        }
        const phoneFilled = ['phone1', 'phone2', 'phone3'].every(id => document.getElementById(id).value.length === maxLen);
        document.getElementById("send_token").disabled = !phoneFilled;
    };

    window.generateToken = () => {
        const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
        document.getElementById("token").innerText = token;
        document.getElementById("send_token").disabled = true;
    };

    window.refreshTokenStatus = () => {
        isAuthStarted = false;
        clearInterval(timer);
        document.getElementById("token").innerText = "000000";
        document.getElementById("complete_token").disabled = true;
        document.getElementById("send_token").disabled = false;
    };

    window.tokenTimer = () => {
        if (!isAuthStarted) {
            isAuthStarted = true;
            generateToken();
            timer = setInterval(() => {
                if (time >= 0) {
                    document.getElementById("complete_token").disabled = false;
                    const min = String(Math.floor(time / 60)).padStart(2, "0");
                    const sec = String(time % 60).padStart(2, "0");
                    document.getElementById("min").innerText = min;
                    document.getElementById("sec").innerText = sec;
                    time--;
                } else {
                    refreshTokenStatus();
                }
            }, 1000);
        }
    };

    window.tokenConfirmed = () => {
        alert("Verification is completed");
        refreshTokenStatus();
        formFields.phone = true;
    };

    window.isFilled = (id) => {
        const value = document.getElementById(id).value;
        if (['Male', 'Female', 'PreferNotToSay', 'Other'].includes(id)) {
            formFields.gender = true;
        } else {
            formFields[id] = value && value.trim() !== "";
        }
        document.getElementById("submit_btn").disabled = Object.values(formFields).includes(false);
    };

    window.submitVerification = () => {
        let isValid = true;
        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        const passwordConf = document.getElementById("password-conf").value;
        const region = document.getElementById("region_dropdown").value;
        const genderChecked = ['Male', 'Female', 'PreferNotToSay', 'Other'].some(id => document.getElementById(id).checked);

        if (!email.includes("@")) {
            document.getElementById("email_error").style.display = 'block';
            isValid = false;
        } else {
            document.getElementById("email_error").style.display = 'none';
        }

        if (!name) {
            document.getElementById("name_error").style.display = 'block';
            isValid = false;
        } else {
            document.getElementById("name_error").style.display = 'none';
        }

        if (password !== passwordConf) {
            document.getElementById("password_error").style.display = 'block';
            isValid = false;
        } else {
            document.getElementById("password_error").style.display = 'none';
        }

        if (!region) {
            document.getElementById("region_error").style.display = 'block';
            isValid = false;
        } else {
            document.getElementById("region_error").style.display = 'none';
        }

        if (!genderChecked) {
            document.getElementById("gender_error").style.display = 'block';
            isValid = false;
        } else {
            document.getElementById("gender_error").style.display = 'none';
        }

        if (!document.getElementById("agree").checked) {
            document.getElementById("agree_error").style.display = 'block';
            isValid = false;
        } else {
            document.getElementById("agree_error").style.display = 'none';
        }

        if (isValid) {
            alert("Your registration has been successfully completed.");
        }
    };
});
