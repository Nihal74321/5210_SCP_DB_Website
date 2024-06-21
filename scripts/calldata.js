import * as CreateElem from "./getcard.js";

const dummy_array = ['./assets/scp-2023.jpg', './assets/scp-2023.jpg', './assets/scp-2023.jpg', './assets/scp-2023.jpg', './assets/scp-2023.jpg', './assets/scp-2023.jpg', './assets/scp-2023.jpg', './assets/scp-2023.jpg', './assets/scp-2023.jpg', './assets/scp-2023.jpg', './assets/scp-2023.jpg'];

const latest = [];

const carousel = [];

function getLatest() {
    fetch('./scripts/featured-content.php')
        .then(response => response.json())
        .then(data => {
            latest.push(data);
            CreateElem.getFeaturedScp(latest[0][0].id,latest[0][0].name, latest[0][0].class, latest[0][0].item, latest[0][0].image, latest[0][0].containment, latest[0][0].description);
        });
}

function getData() {
    fetch('./scripts/get-data.php')
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < data.length; i++) {
                carousel.push(data[i])
            }
            CreateElem.createCategory("More_from_the_foundation", carousel, false)
        })
        .catch(error => console.error('Error fetching data:', error));
}

function drawExtraCar() {
    fetch('./scripts/cat-extend.php')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let carousel_s = []
            let carousel_e = []
            let carousel_r = []
            for(let i = 0; i < data.safe_items.length; i++) {
                carousel_s.push(data.safe_items[i])
            }
            CreateElem.createCategory("safe", carousel_s, true)
            
            for(let i = 0; i < data.euclid_items.length; i++) {
                carousel_e.push(data.euclid_items[i])
            }
            CreateElem.createCategory("euclid", carousel_e, true)
            
            for(let i = 0; i < data.recent_items.length; i++) {
                carousel_r.push(data.recent_items[i])
            }
            CreateElem.createCategory("recent", carousel_r, true)
        })
        .catch(error => console.error('Error drawing new categories: ', error))
}

window.onload = function () {
    getData();
    getLatest();
    drawExtraCar();
}
