'use-strict'

let time_pomo = document.getElementById("pomodoro").value;
let short_break = document.getElementById("short-break").value;
let long_break = document.getElementById("long-break").value;
let nums_break = document.getElementById("nums-break").value;
let auto_break = document.getElementById("auto-break").checked;
let auto_pomo = document.getElementById("auto-pomo").checked;


let time = time_pomo * 60;
let state = 1; // 1 == pomodoro | 2 ==  short | 3 = long 
let changeState = false;
let count = 0;

// element
const bt_on_off = document.getElementById("bt-control-time");
const bt_state = document.getElementById("t-state");
const bt_time = document.getElementById("time");
const bt_confirm = document.getElementById("confirm");
const bt_save = document.getElementById("save");

function modal_open(id) {
    document.getElementById(id).style.display = "block";
}

function modal_close(id) {
    document.getElementById(id).style.display = "none";
}

function print_time() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutes = (minutes < 10) ? ("0" + minutes) : minutes;
    seconds = (seconds < 10) ? ("0" + seconds) : seconds;
    document.querySelector("#time").textContent = "" + minutes + " : " + seconds;
}

function reset_time() {
    if (state == 1) {
        bt_state.textContent = "Pomodoro";
        time = time_pomo * 60;
    } else if (state == 2) {
        bt_state.textContent = "Short Break";
        time = short_break * 60;
    } else {
        bt_state.textContent = "Long Break";
        time = long_break * 60;
    }

    print_time();
}

function next_state_time() {
    if (state == 1) {
        if (count % nums_break != 0) {
            state = 2;
            bt_state.textContent = "Short Break";
            time = short_break * 60;            
        } else {
            state = 3;
            bt_state.textContent = "Long Break";
            time = long_break * 60;   
        }
    } else {
        state = 1;
        bt_state.textContent = "Pomodoro";
        time = time_pomo * 60;        
    }

    print_time();
}

function count_down() {
    bt_on_off.innerText = "STOP";

    let x = setInterval(
        function () {
            time -= 1;

            print_time();

            bt_on_off.onclick = () => {
                let on_off = bt_on_off.innerText;

                if (on_off == "START") {
                    count_down();
                } else {
                    clearInterval(x);
                    modal_open("cf-restart");                    
                }
            }

            bt_state.onclick = () => {
                let on_off = bt_on_off.innerText;

                if (on_off == "START") {
                    state = (state + 1) % 3;
                    reset_time();
                } else {
                    clearInterval(x);
                    changeState = true;
                    modal_open("cf-restart");                  
                }
            }

            if (time == 0) {
                if (state == 1 && auto_break) {
                    ++count;
                    if (count % nums_break != 0) {
                        state = 2;
                        time = short_break * 60;
                        bt_state.textContent = "Short Break";
                    } else {
                        state = 3;
                        time = long_break * 60;
                        bt_state.textContent = "Long Break";                        
                    }
                    print_time();
                } else if (state == 2 && auto_pomo) {
                    state = 1;
                    time = time_pomo * 60;
                    bt_state.textContent = "Pomodoro";
                    print_time();
                } else if (state == 3 && auto_pomo) { // state == 3  (long break)
                    state = 1;
                    time = time_pomo * 60;
                    bt_state.textContent = "Pomodoro";
                    print_time();
                } else {
                    if (state == 1) ++count;
                    clearInterval(x);
                    bt_on_off.innerText = "START";
                    next_state_time();
                }
            }
        }
    , 1000);
}

bt_time.onclick = () => {
    let on_off = bt_on_off.innerText;

    if (on_off == "START") {
        modal_open("timer-settings");

        bt_save.onclick = () => {
            let temp_pomo = document.getElementById("pomodoro").value;
            let temp_short = document.getElementById("short-break").value;
            let temp_long = document.getElementById("long-break").value;
            let temp_breaks = document.getElementById("nums-break").value;
    
            if (temp_pomo != 0 && temp_short != 0 && temp_long != 0 && temp_breaks != 0) {
                time_pomo = temp_pomo;
                short_break = temp_short;
                long_break = temp_long;
                nums_break = temp_breaks;
                auto_pomo = document.getElementById("auto-pomo").checked;
                auto_break = document.getElementById("auto-break").checked;
    
                let on_off = bt_on_off.innerText;
    
                if (on_off == "START") {
                    reset_time();
                }
                modal_close("timer-settings");
            }
        }
    
        document.querySelector("#settings-header span").onclick = () => {
            modal_close("timer-settings");
        }
    }
}

bt_on_off.onclick = () => {
    let on_off = bt_on_off.innerText;

    if (on_off == "START") {
        count_down();
    } 
}

bt_confirm.onclick = () => {
    if (changeState) {
        state = (state + 1) % 3;
        changeState = false;
        reset_time();
    } else {
        reset_time();
    }

    bt_on_off.innerText = "START";
    modal_close("cf-restart");
}

bt_state.onclick = () => {
    state = (state + 1) % 3;
    reset_time();
}

document.querySelector(".modal_header span").onclick 
= document.getElementById("cancel").onclick = () => {
    modal_close("cf-restart");
    count_down();
}