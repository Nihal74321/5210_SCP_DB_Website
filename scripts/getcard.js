const prim_container_featured = document.getElementById("explore-sec-container");
const dynamic_title_featured = document.getElementById("explore-title-dyn");
const editable_title = document.getElementById("explore-editable-title");
const category_wrapper = document.querySelector(".category-super-wrapper");

function getFeaturedScp(scp_id, scp_name, scp_class, scp_identifier, scp_image_address, s_desc, s_cont) {
    const div_container = document.createElement('div');
    div_container.classList.add("featured-scp-container");
    
    const details_container = document.createElement('div');
    details_container.classList.add('details-container');
    
    const scp_img_thumbnail = document.createElement('img');
    scp_img_thumbnail.classList.add('large-img');
    scp_img_thumbnail.src = scp_image_address;
    
    let new_scp = document.createElement('p');
    new_scp.textContent = 'new';
    
    let scp_title_new = document.createElement('h1');
    scp_title_new.textContent = scp_name;

    let get_details = document.createElement('p');
    get_details.textContent = `${scp_identifier} | ${scp_class}`;

    let motd = document.createElement('p');
    motd.textContent = 'Check out our newest addition!';

    let button = document.createElement('button');
    button.innerHTML = `Read more <img src="./assets/asset-pack-main/angle-right-solid.svg" alt="">`;
    button.addEventListener("click", ()=> {
        let filtered_image = ""
            if(scp_image_address.includes('preset')){
                filtered_image = scp_image_address
            } else {
                filtered_image = '.' + scp_image_address
            }
        sendToSCP(scp_id, scp_name, scp_class, scp_identifier, filtered_image, s_desc, s_cont)
    })
    
    prim_container_featured.appendChild(div_container);
    div_container.appendChild(scp_img_thumbnail);
    
    div_container.appendChild(details_container);
    details_container.appendChild(new_scp);
    details_container.appendChild(scp_title_new);
    details_container.appendChild(get_details);
    details_container.appendChild(motd);
    details_container.appendChild(button);
}

function createCategory(scp_category_type, scp_information_array, isExplore) {
    //console.log(`createCategory called with: ${scp_category_type}, ${scp_information_array.length} items, isExplore: ${isExplore}`); --debug createCat w/ name, array, and bool
    // Create section to hold title + carousel
    const catSection = document.createElement('Section');
    catSection.classList.add("category");
    catSection.classList.add(`cat-${scp_category_type}`);
    catSection.id = `cat-${scp_category_type}`;
    catSection.id = scp_category_type;

    const scp_name_informal = scp_category_type.replace(/_/g, " ");

    // create title section
    const title_container = document.createElement('div');
    title_container.classList.add('title-container');
    const title_header = document.createElement('h1');
    if(isExplore) {
        title_header.textContent = `Explore: ${scp_name_informal}`;
    } else {
        title_header.textContent = `${scp_name_informal}`;
    }
    const arrow_image = document.createElement('img');
    arrow_image.src = './assets/asset-pack-main/angle-right-solid.svg';
    title_container.appendChild(title_header);
    title_container.appendChild(arrow_image);
    catSection.appendChild(title_container);

    // create carousel
    const wrapper_big = document.createElement('div');
    wrapper_big.classList.add("wrapper-big");
    const prev_button = document.createElement('button');
    prev_button.classList.add("control-button-slider");
    prev_button.classList.add("prev");
    prev_button.innerHTML = `<img src="./assets/asset-pack-main/chevron-left-solid.svg" alt="">`;
    const next_button = document.createElement('button');
    next_button.classList.add("control-button-slider");
    next_button.classList.add("next");
    next_button.innerHTML = `<img src="./assets/asset-pack-main/chevron-right-solid.svg" alt="">`;
    wrapper_big.appendChild(prev_button);
    wrapper_big.appendChild(next_button);
    
    const content_wrapper = document.createElement('div');
    content_wrapper.classList.add('content-container-wrapper');
    content_wrapper.id = `id-${scp_category_type}`;
    prev_button.addEventListener("click", () => prevFunction(content_wrapper.id, content_wrapper.getBoundingClientRect().width));
    next_button.addEventListener("click", () => nextFunction(content_wrapper.id, content_wrapper.getBoundingClientRect().width));
    wrapper_big.appendChild(content_wrapper);

    scp_information_array.forEach((element) => {
        const container_new_content = document.createElement('div');
        container_new_content.classList.add('container-new-content');
        const scp_img_thumbnail_cat = document.createElement('img');
        scp_img_thumbnail_cat.src = element.image;
        scp_img_thumbnail_cat.addEventListener("click", ()=> {
            let filtered_image = ""
            if(element.image.includes('preset')){
                filtered_image = element.image
            } else {
                filtered_image = '.' + element.image
            }
            sendToSCP(element.id, element.name, element.class, element.item, filtered_image, element.description, element.containment)
        })
        container_new_content.appendChild(scp_img_thumbnail_cat);
        content_wrapper.appendChild(container_new_content);
    });
    catSection.appendChild(wrapper_big);
    category_wrapper.appendChild(catSection);
}

let scrollAmount = 0;
const img_width = 11.19;

function nextFunction(item, header_width) {
    let scrollModifier = header_width * 0.8;
    let get_container = document.getElementById(item);
    let offset = get_container.scrollWidth - header_width;
    if(scrollAmount < (offset - img_width)) {
        get_container.scrollTo({
            top: 0,
            left: scrollAmount += scrollModifier,
            behavior: "smooth"
        });
    }
}   

function prevFunction(item, header_width) {
    let scrollModifier = header_width * 0.8;
    let get_container = document.getElementById(item);
    if(scrollAmount > 0){
        get_container.scrollTo({
            top: 0,
            left: scrollAmount -= scrollModifier,
            behavior: "smooth"
        });
    }
}

function sendToSCP(scp_id, scp_name, scp_class, scp_identifier, scp_image_address, s_desc, s_cont) {
    const url = `./pages/detail-scp.html?id=${scp_id}&name=${scp_name}&item=${scp_identifier}&class=${scp_class}&image=${scp_image_address}&description=${s_desc}&containment_procedures=${s_cont}`;
    window.location.href = url;
}

export {createCategory, getFeaturedScp};
