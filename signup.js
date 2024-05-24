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

    const sendToken = () => {


        if (isAuthStarted === false){
            isAuthStarted = true;
            const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
            document.getElementById("token").innerText = token;
            document.getElementById("send_token").disabled = true;

            let time = 3;

            let timer = setInterval(function () {
                if(time >= 0){

                    // button active
                    document.getElementById("complete_token").disabled = false;

                    // time update
                    let min = String(Math.floor(time/60)).padStart(2,"0")
                    let sec = String(time%60).padStart(2,"0")

                    document.getElementById("min").innerText = min;
                    document.getElementById("sec").innerText = sec;

                    time--
                } else {
                    isAuthStarted = false;
                    clearInterval(timer)
                    document.getElementById("token").innerText = "000000";
                    document.getElementById("complete_token").disabled = true;
                    document.getElementById("send_token").disabled = false;
                }
            }, 1000)
        }




    };
    window.sendToken = sendToken;

});
