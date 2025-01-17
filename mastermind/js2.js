

const main_display = document.querySelector('div.playground');
const div_select_colors = document.getElementById('div-select-color');
const crack_button = document.getElementById('crack-btn');

let codeLength = 4;
let tries = 8;
let colors = ['blue', 'yellow', 'violet', 'purple', 'red', 'black', 'orange', 'green'];

let random_code = [];
let crackTry = 1;

init();

function init() {

    random_code = [];
    crackTry = 1;
    main_display.innerHTML = '';
    div_select_colors.innerHTML = '';

    let i = 1;
    while (i <= tries) {
        const div_try = document.createElement('div');
        div_try.id = 'try-' + i;
        div_try.className = 'row';

        const row_number = document.createElement('div');
        row_number.className = 'rownumber';
        row_number.textContent = i;

        const result = document.createElement('div');
        result.className = 'result';
        let j = 0;
        while (j < codeLength) {
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder';
            result.appendChild(placeholder);
            j++;
        }

        const attempt = document.createElement('div');
        attempt.className = 'attempt';
        let k = 0;
        while (k < codeLength) {
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder';
            attempt.appendChild(placeholder);
            k++;
        }

        const confirm = document.createElement('div');
        confirm.className = 'confirm';

        div_try.appendChild(row_number);
        div_try.appendChild(result);
        div_try.appendChild(attempt);
        div_try.appendChild(confirm);
        main_display.prepend(div_try);

        i++;
    }

    let m = 0;
    while (m < codeLength) {
        const div_select_wrapper = document.createElement('div');
        div_select_wrapper.className = 'select-wrapper';
        const select = document.createElement('select');

        colors.forEach(color => {
            const option = document.createElement('option');
            option.style.backgroundColor = color;
            option.value = color;
            option.textContent = color;
            select.appendChild(option);
        });

        select.style.backgroundColor = colors[0];

        select.addEventListener('change', (e) => {
            e.target.style.backgroundColor = e.target.value;
        });

        div_select_wrapper.appendChild(select);
        div_select_colors.appendChild(div_select_wrapper);

        m++;
    }

    createRandomCode();
}



















































// function createRandomCode() {
//     let i = 0;
//     while (i < codeLength) {
//         let random_color = colors[Math.floor(Math.random() * colors.length)];
//         random_code.push(random_color);
//         i++;
//     }
//     console.log(random_code);
// }

// crack_button.addEventListener('click', (e) => {
//     let input_colors = document.querySelectorAll('.select-wrapper>select');
//     let input_colors_arr = [];
//     let v = input_colors.length - 1; // Initialize index for while loop
//     while (v >= 0) {
//         input_colors_arr.unshift(input_colors[v].value); // Add values in reverse order
//         v--;
//     }

//     show('attempt', input_colors_arr);
//     let correction_Array = createCorrectionArray(input_colors_arr);
//     show('result', correction_Array);
//     crackTry++;
//     checkWin(correction_Array);
// });

// function show(type, colors) {
//     let tryView = document.querySelectorAll('#try-' + crackTry + '>.' + type + '>div');
//     tryView.forEach((v, i) => {
//         v.setAttribute('style', 'background-color:' + colors[i]);
//     });
// }

// function createCorrectionArray(input_colors_arr) {
//     let random_code_copy = [...random_code];
//     let correction_Array = [];

//     // Correct position and color
//     for (let i in random_code_copy) {
//         if (random_code_copy[i] === input_colors_arr[i]) {
//             random_code_copy[i] = null;
//             input_colors_arr[i] = null;
//             correction_Array.push('red');
//         }
//     }

//     // Correct color but wrong position
//     for (let i in random_code_copy) {
//         for (let j in input_colors_arr) {
//             if (random_code_copy[i] !== null && random_code_copy[i] === input_colors_arr[j]) {
//                 random_code_copy[i] = null;
//                 input_colors_arr[j] = null;
//                 correction_Array.push('white');
//             }
//         }
//     }

//     return correction_Array;
// }

// function checkWin(correction_Array) {
//     let countCorrect = correction_Array.filter(color => color === 'red').length;
//     if (countCorrect === codeLength) {
//         alert('WAW, tu es incroyable!');
//         init();
//     } else if (crackTry > tries) {
//         alert('Tu as perdu.. LOOSER!');
//         init();
//     }
// }