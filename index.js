const btns = document.querySelectorAll('.field button');

btns.forEach(e => e.addEventListener('click', click_func));


function won_o() {
    console.log('finisheddddd  o won')
    document.querySelector(".winner_name").textContent = 'O';
    document.querySelector(".winning_text").classList.add("active");
}
function won_x() {
    console.log('finisheddddd  x won');
    document.querySelector(".winner_name").textContent = 'X';
    document.querySelector(".winning_text").classList.add("active");
}
let check_field = () => {
  let o_clicked = document.querySelectorAll(".field .disabled.o");
  let x_clicked = document.querySelectorAll(".field .disabled.x");
  let x_array = [];
  let o_array = [];
  x_clicked.forEach((e) => x_array.push(e.getAttribute('data-number')));
  o_clicked.forEach((e) => o_array.push(e.getAttribute('data-number')));
let All_arr = [x_array,o_array];
    for (let i in All_arr) {
        console.log(i)
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
            document.querySelector('.field').classList.add('finished')
            if (i == 1) {
                won_o();
            } else {
                won_x();
            }
        }
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