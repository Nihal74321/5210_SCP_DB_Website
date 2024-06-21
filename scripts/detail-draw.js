const get_option_button = document.getElementById('open')
const option_content_container = document.getElementById('menu')

const window_title = document.title
const image_receiver = document.querySelector('.d-img')
const name_receiver = document.querySelector('.d-name')
const item_receiver = document.querySelector('.d-identifier')
const class_receiver = document.querySelector('.d-class')
const desc_reciever = document.querySelector('.d-desc-text')
const cont_receiver = document.querySelector('.d-cont-text')

const update_name = document.querySelector('.d-p-g-name')
const update_item = document.querySelector('.d-p-glance-item')
const update_class = document.querySelector('.d-p-glance-class')
const update_img = document.querySelector('.d-u-img')

const updated_name = document.querySelector('.u-name')
const updated_class = document.querySelector('.u-class')
const updated_item = document.querySelector('.u-item')
const updated_desc = document.querySelector('.u-desc')
const updated_cont = document.querySelector('.u-cont')

const btn_submit = document.querySelector('.u-submit-btn')
const btn_delete = document.querySelector('.delete-btn-main')

const conf_del_context = document.querySelector('.context-form-del')

const opt_context = document.querySelector('.context-choose-option')
const get_opt_mobile = document.querySelector('.img-option-container-mb_rspn')


option_content_container.style.display = "none"

get_option_button.addEventListener("click", ()=> {
    if(option_content_container.style.display === "none") {
        option_content_container.style.display = "block"
        get_option_button.style.backgroundColor = "#317bd6"
    } else {
        option_content_container.style.display = "none"
        get_option_button.style.backgroundColor = "#272727"
    }
})

function callOverflow(elem) {
    if(elem.style.display === "flex") {
        document.body.style.overflowY = "hidden"
    } else {
        document.body.style.overflowY = "scroll"
    }
}

window.load = callOverflow(option_content_container)

function drawEntry() {
    if(window.location.search) {
        const params = new URLSearchParams(window.location.search)
        const id = params.get('id')
        const name = params.get('name')
        const item = params.get('item')
        const classType = params.get('class')
        const imgAddress = params.get('image')
        const desc_text = params.get('description')
        const cont_prd_text = params.get('containment_procedures')

        let default_name = name
        let default_item = item
        let default_class = classType
        let default_img = imgAddress
        let default_desc = desc_text
        let default_cont = cont_prd_text
        
        update_name.textContent = default_name
        update_item.textContent = default_item
        update_class.textContent = default_class
        update_img.src = default_img

        document.title = name + ' - SCP Foundation'
        name_receiver.textContent = name
        item_receiver.textContent = item
        class_receiver.textContent = classType
        image_receiver.src = imgAddress
        desc_reciever.textContent = desc_text
        cont_receiver.textContent = cont_prd_text
        
        function updateSCP(nameGet, itemGet, classTypeGet, descGet, contGet, imgGet) {
            if(nameGet.value === ""){
               default_name = name
            } else {
               default_name = nameGet.value 
            }
            if(itemGet.value === ""){
                default_item = item
            } else {
                default_item = itemGet.value
            }
            if(classTypeGet.value === "") {
                default_class = classType
            } else {
                default_class = classTypeGet.value
            }
            if(descGet.value === "") {
                default_desc = desc_text
            } else {
                default_desc = descGet.value
            }
            if(contGet.value === "") {
                default_cont = cont_prd_text
            } else {
                default_cont = contGet.value
            }
            console.log(default_name, default_item, default_class, default_desc, default_cont)
            
            const formData = new FormData()
            formData.append('id', id)
            formData.append('name', default_name)
            formData.append('item', default_item)
            formData.append('class', default_class)
            formData.append('description', default_desc)
            formData.append('containment', default_cont)
            
            fetch('../scripts/update_scp.php', {
                method : 'POST',
                body : formData
            })
            .then(response => response.json())
            .then(data => {
                alert('Succesfully updated SCP')
                window.location.href = '../index.html'
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors, such as displaying an error message to the user
                alert('An error occurred while submitting SCP.');
            });
        }
        function deleteSCP(id) {
                const formData = new FormData()
                formData.append('id', id)
                
                fetch('../scripts/delete-scp.php', {
                    method : 'POST',
                    body : formData
                })
                .then(response => response.json())
                .then(data => {
                    window.location.href = '../index.html'
                })
            }
        btn_submit.addEventListener("click", ()=> {
            updateSCP(updated_name, updated_class, updated_item, updated_desc, updated_cont)
        })
        btn_delete.addEventListener("click", ()=> {
            deleteSCP(id)
        })
    } else {
        console.error("ERROR_01_SCP: Nothing to load")
    }
}

const update_context = document.querySelector('.d-update-context-form')

function showUContext() {
    callOverflow(update_context)
    update_context.style.display = "flex"
}
function closeUContext() {
    update_context.style.display = "none"
    callOverflow(update_context)
}

const txt_area_array = document.querySelectorAll(".u-large-input")

txt_area_array.forEach((elem) => {
    elem.setAttribute("style", "height:" + (elem.scrollHeight) + "px;overflow-y:hidden;")
    elem.addEventListener("input",inputResize, false)
})

function inputResize() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + "px";
}
function confirmDelete() {
    conf_del_context.style.display = "flex"
    closeOptContext()
}
function closeConfirmDelete() {
    conf_del_context.style.display = "none"
}
function closeOptContext() {
    opt_context.style.display = "none"
    callOverflow(opt_context)
}
get_opt_mobile.addEventListener("click", ()=> {
    opt_context.style.display = "flex"
    callOverflow(opt_context)
})
window.onload = drawEntry()