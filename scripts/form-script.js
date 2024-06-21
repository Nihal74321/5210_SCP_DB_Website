const name_input = document.getElementById('f-i-name');
const class_input = document.getElementById('f-i-class');
const desc_input = document.getElementById('f-i-desc');
const cont_input = document.getElementById('f-i-cont');
const f_section = document.querySelector('.create-main-header');
const header_context = document.querySelector('.f-scroll');
const get_img_title = document.querySelector('.f-h-img');
const txt_area_array = document.querySelectorAll(".f-large-content-container");
const image_review = document.querySelector('.f-finish-img');
const doc_width = window.outerWidth;

txt_area_array.forEach((elem) => {
    elem.setAttribute("style", "height:" + (elem.scrollHeight) + "px;overflow-y:hidden;");
    elem.addEventListener("input", inputResize, false);
});

function inputResize() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + "px";
}

const main_container = document.querySelector(".f-main-container");
let main_container_top = main_container.getBoundingClientRect().top;
const finish_wrapper = document.querySelector(".f-finish-wrapper");
const form_container = document.querySelector(".f-container");
let f_scroll_amount = 0;

if (doc_width > 1200) {
    document.addEventListener("scroll", () => {
        main_container_top = main_container.getBoundingClientRect().top;
        if (main_container_top > 70) {
            document.body.style.overflowY = "scroll";
            // document.body.style.overflow = "hidden";
        }
    });
}

function f_next_btn() {
    if (name_input.value === "" || class_input.value === "" || desc_input.value === "" || cont_input.value === "") {
        let y = 0;
        form_container.scroll(0, -170);
        if (name_input.value === "") {
            name_input.classList.add("f-i-invalid");
        }
        if (class_input.value === "") {
            class_input.classList.add("f-i-invalid");
        }
        if (desc_input.value === "") {
            desc_input.classList.add("f-i-invalid");
        }
        if (cont_input.value === "") {
            cont_input.classList.add("f-i-invalid");
        }
        setTimeout(() => {
            if (name_input.classList.contains("f-i-invalid")) {
                name_input.classList.remove("f-i-invalid");
            }
            if (class_input.classList.contains("f-i-invalid")) {
                class_input.classList.remove("f-i-invalid");
            }
            if (desc_input.classList.contains("f-i-invalid")) {
                desc_input.classList.remove("f-i-invalid");
            }
            if (cont_input.classList.contains("f-i-invalid")) {
                cont_input.classList.remove("f-i-invalid");
            }
        }, 1000);
    } else {
        document.body.style.overflowY = "scroll";
        finish_wrapper.scrollIntoView({ behavior: 'smooth' });
        if (name_input.classList.contains("f-i-invalid")) {
            name_input.classList.remove("f-i-invalid");
        }
        if (class_input.classList.contains("f-i-invalid")) {
            class_input.classList.remove("f-i-invalid");
        }
        if (desc_input.classList.contains("f-i-invalid")) {
            desc_input.classList.remove("f-i-invalid");
        }
        if (cont_input.classList.contains("f-i-invalid")) {
            cont_input.classList.remove("f-i-invalid");
        }
    }
    if (doc_width < 1200) {
        if (name_input.value === "" || class_input.value === "" || desc_input.value === "" || cont_input.value === "") {
            header_context.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

const check_box = document.getElementById("f-c_box");

const submit_btn = document.querySelector(".f-submit-btn");

function handle_btn() {
    submit_btn.disabled ? submit_btn.disabled = false : submit_btn.disabled = true;
}

const color_preset_array = [
    ["../public/images/presets/scp-user-preset-01_fire.png", "../public/images/presets/scp-user-preset-01_ocean.png", "../public/images/presets/scp-user-preset-01_leaf.png", "../public/images/presets/scp-user-preset-01_starlight.png"],
    ["../public/images/presets/scp-user-preset-02_fire.png", "../public/images/presets/scp-user-preset-02_ocean.png", "../public/images/presets/scp-user-preset-02_leaf.png", "../public/images/presets/scp-user-preset-02_starlight.png"],
    ["../public/images/presets/scp-user-preset-03_fire.png", "../public/images/presets/scp-user-preset-03_ocean.png", "../public/images/presets/scp-user-preset-03_leaf.png", "../public/images/presets/scp-user-preset-03_starlight.png"],
    ["../public/images/presets/scp-user-preset-04_fire.png", "../public/images/presets/scp-user-preset-04_ocean.png", "../public/images/presets/scp-user-preset-04_leaf.png", "../public/images/presets/scp-user-preset-04_starlight.png"]
];

const preview_image = document.querySelector(".f-p-img");

const image_array = document.querySelectorAll('.f-image');

image_array.forEach((elem) => {
    elem.addEventListener("click", ()=> {
        image_array.forEach((sub_elem => {
            if(sub_elem.classList.contains('f-selected')) {
                sub_elem.classList.remove('f-selected')
            }
        }))
        elem.classList.add('f-selected')
        if(elem.classList.contains('f-selected')) {
            preview_image.src = elem.src
            image_review.src = elem.src
        } else {
            preview_image.src = "../public/images/presets/scp-user-preset-01.png"
            image_review.src = "../public/images/presets/scp-user-preset-01.png"
        }
    })
})

const color_options = document.querySelectorAll('.f-color-container');

const color_option_1 = document.querySelector('.f-color-1');
const color_option_2 = document.querySelector('.f-color-2');
const color_option_3 = document.querySelector('.f-color-3');
const color_option_4 = document.querySelector('.f-color-4');

color_option_1.classList.contains("f-color-selected");
color_option_1.classList.remove("f-color-selected");

color_option_1.addEventListener("click", ()=> {
    for(let i = 0; i < color_preset_array.length;){
        image_array.forEach((elem) => {
                elem.src = color_preset_array[i][0]
                if(elem.classList.contains('f-selected')) {
                    preview_image.src = elem.src
                    image_review.src = elem.src
                }
                i++
        })
    }
    color_options.forEach((elem)=> {
        if(elem.classList.contains("f-color-selected")){
            elem.classList.remove("f-color-selected")
        }
        color_option_1.classList.add("f-color-selected")
    })
})
color_option_2.addEventListener("click", ()=> {
    for(let i = 0; i < color_preset_array.length;){
        image_array.forEach((elem) => {
                elem.src = color_preset_array[i][2]
                if(elem.classList.contains('f-selected')) {
                    preview_image.src = elem.src
                    image_review.src = elem.src
                }
                i++
        })
    }
    color_options.forEach((elem)=> {
        if(elem.classList.contains("f-color-selected")){
            elem.classList.remove("f-color-selected")
        }
        color_option_2.classList.add("f-color-selected")
    })
})
color_option_3.addEventListener("click", ()=> {
    for(let i = 0; i < color_preset_array.length;){
        image_array.forEach((elem) => {
                elem.src = color_preset_array[i][3]
                if(elem.classList.contains('f-selected')) {
                    preview_image.src = elem.src
                    image_review.src = elem.src
                }
                i++
        })
    }
    color_options.forEach((elem)=> {
        if(elem.classList.contains("f-color-selected")){
            elem.classList.remove("f-color-selected")
        }
        color_option_3.classList.add("f-color-selected")
    })
})
color_option_4.addEventListener("click", ()=> {
    for(let i = 0; i < color_preset_array.length;){
        image_array.forEach((elem) => {
                elem.src = color_preset_array[i][1]
                if(elem.classList.contains('f-selected')) {
                    preview_image.src = elem.src
                    image_review.src = elem.src
                }
                i++
            })
    }
    color_options.forEach((elem)=> {
        if(elem.classList.contains("f-color-selected")){
            elem.classList.remove("f-color-selected")
        }
        color_option_4.classList.add("f-color-selected")
    })
})

cont_input.addEventListener("focusout", () => {
    if (cont_input.value === "") {
    } else {
        form_container.scroll(0, 600);
    }
});

color_option_1.classList.add('f-color-selected');

const button = document.querySelector('.f-next-btn').addEventListener("click", ()=> {
    f_next_btn()
})
