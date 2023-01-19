const btns = document.querySelectorAll('.field button');

btns.forEach(e => e.addEventListener('click', click_func));

let congrats = document.querySelector(".congrats");

let player = 'AI';
let game_running = true;
function change_player() {
    this.classList.toggle('f_mode_active');
    if (player == "AI") {
      player = "F";
      this.querySelector(".toggle_btn").textContent = "F";
    } else {
      player = "AI";
      this.querySelector(".toggle_btn").textContent = "AI";
    }
    restart();
    window.sessionStorage.setItem('player', player);
} 

let toggle_ai_btn = document.querySelector(".player_btn");
toggle_ai_btn.addEventListener('click', change_player);
if (
  window.sessionStorage.getItem("player") &&
  window.sessionStorage.getItem("player") != player
) {
    toggle_ai_btn.click();
}

let change_turn = () => {
      if (my_turn) {
        my_turn = false;
      } else {
        my_turn = true;
      }
}
let ALL_disabled;
function check_tie() {
    if (ALL_disabled.length == 0 && game_running) {
      congrats.textContent = "Try again!";
      document.querySelector(".cong_img").style.display = "none";
      document.querySelector(".winner_name").textContent = "Tie";
      document.querySelector(".winning_text").classList.add("active");
    }
}
function won_o() {
    console.log('finisheddddd  o won');
    document.querySelector(".winner_name").textContent = 'O won the';
    document.querySelector(".winning_text").classList.add("active");
}
function won_x() {
    console.log('finisheddddd  x won');
    document.querySelector(".winner_name").textContent = 'X won the';
    document.querySelector(".winning_text").classList.add("active");
}
let my_turn = false;
let check_field = () => {
  let o_clicked = document.querySelectorAll(".field .disabled.o");
  let x_clicked = document.querySelectorAll(".field .disabled.x");
  let x_array = [];
  let o_array = [];
  x_clicked.forEach((e) => x_array.push(e.getAttribute('data-number')));
  o_clicked.forEach((e) => o_array.push(e.getAttribute('data-number')));
let All_arr = [x_array,o_array];
    for (let i in All_arr) {
        // console.log(i)
        if (
            All_arr[i].includes('1') &&
            All_arr[i].includes('5') &&
            All_arr[i].includes('9') ||
            All_arr[i].includes('2') &&
            All_arr[i].includes('5') &&
            All_arr[i].includes('8') ||
            All_arr[i].includes('3') && 
            All_arr[i].includes('5') && 
            All_arr[i].includes('7') || 
            All_arr[i].includes('4') && 
            All_arr[i].includes('5') && 
            All_arr[i].includes('6') ||
            All_arr[i].includes('6') &&
            All_arr[i].includes('3') &&
            All_arr[i].includes('9') ||
            All_arr[i].includes('1') &&
            All_arr[i].includes('2') &&
            All_arr[i].includes('3') ||
            All_arr[i].includes('7') &&
            All_arr[i].includes('8') &&
            All_arr[i].includes('9') ||
            All_arr[i].includes('1') &&
            All_arr[i].includes('4') &&
            All_arr[i].includes('7') 
        ) {
            game_running = false;
            if (i == 1) {
                won_o();
            } else {
                won_x();
            }
            document.querySelector('.field').classList.add('finished');
        } else {
                ALL_disabled = document.querySelectorAll(
                  ".field button:not(.disabled)"
            );
            setTimeout(() => {
                check_tie();
            }, 0);
        }
    }
    // run Ai
    change_turn();
    if (player == "AI" && my_turn && game_running && ALL_disabled.length!=0) {
        document.body.classList.add('no_touch');
        setTimeout(() => {
            let random_num = Math.floor(Math.random() * (ALL_disabled.length-1));
            if (random_num > ALL_disabled.length-1 || random_num < 0) {
                random_num = 0;
            }
            if (typeof random_num == 'number') {
                ALL_disabled.item(random_num).click();
            } else {
                document.querySelector(".field button:not(.disabled)").click();
            }
            document.body.classList.remove('no_touch');
        }, 700);
    }
}
let click_toggle = true;
function click_func() {
    if (click_toggle) {
        click_toggle = false;
    } else {
        click_toggle = true
    }
    click_toggle ?
        this.classList.add('x')
        : this.classList.add('o');
    this.classList.add('disabled');
    check_field();
}


let reset_btn = document.querySelector(".btns .reset_btn");
reset_btn.addEventListener("click", () => reset_btn_func());
    
function reset_btn_func() {
    game_running = true;
    my_turn = false;
    congrats.textContent = 'Congrats';
    document.querySelector(".cong_img").style.display = 'inline-block';
    btns.forEach(e => {
        e.classList.remove('x');
        e.classList.remove('o');
        e.classList.remove('disabled');
        document.querySelector(".field").classList.remove("finished");
        document.querySelector(".winning_text").classList.remove('active');
    }
)}

function restart() {
    reset_btn_func();
}