let data = [];
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
  .then(function (response) {
    for(let i=0; i<response.data.length; i++){
    data.push(response.data[i])
    }
    //等axios資料抓完先init一次把資料渲染上畫面
    init();
  });



// 抓取HTML元素的變數專區
const ticketCardArea = document.querySelector(".ticketCard-area");
const searchResultText = document.getElementById("searchResult-text");
const regionSearch = document.querySelector(".regionSearch");
const addTicketBtn = document.querySelector(".addTicket-btn");
const ticketName = document.getElementById("ticketName");
const ticketImgUrl = document.getElementById("ticketImgUrl");
const ticketRegion = document.getElementById("ticketRegion");
const ticketPrice = document.getElementById("ticketPrice");
const ticketNum = document.getElementById("ticketNum");
const ticketRate = document.getElementById("ticketRate");
const ticketDescription = document.getElementById("ticketDescription");

//初始化function
function init() {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        str += `<li class="ticketCard">
        <div class="ticketCard-img">
            <a href="#">
                <img src="${data[i].imgUrl}"
                    alt="">
            </a>
            <div class="ticketCard-region">${data[i].area}</div>
            <div class="ticketCard-rank">${data[i].rate}</div>
        </div>
        <div class="ticketCard-content">
            <div>
                <h3>
                    <a href="#" class="ticketCard-name">${data[i].name}</a>
                </h3>
                <p class="ticketCard-description">
                ${data[i].description}
                </p>
            </div>
            <div class="ticketCard-info">
                <p class="ticketCard-num">
                    <span><i class="fas fa-exclamation-circle"></i></span>
                    剩下最後 <span id="ticketCard-num"> ${data[i].group} </span> 組
                </p>
                <p class="ticketCard-price">
                    TWD <span id="ticketCard-price">$${data[i].price}</span>
                </p>
            </div>
        </div>
    </li>`
    }
    ticketCardArea.innerHTML = str
    searchResultText.innerHTML = `本次搜尋共 ${data.length} 筆資料`
}
//篩選function
function filter(area) {
    //搜尋全部地區就直接初始化。
    if(area == "" || area == "地區搜尋"){
        init();
    }
    else{
        let str = "";
        let temp = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].area == area) {
                temp++;
                str += `<li class="ticketCard">
        <div class="ticketCard-img">
            <a href="#">
                <img src="${data[i].imgUrl}"
                    alt="">
            </a>
            <div class="ticketCard-region">${data[i].area}</div>
            <div class="ticketCard-rank">${data[i].rate}</div>
        </div>
        <div class="ticketCard-content">
            <div>
                <h3>
                    <a href="#" class="ticketCard-name">${data[i].name}</a>
                </h3>
                <p class="ticketCard-description">
                ${data[i].description}
                </p>
            </div>
            <div class="ticketCard-info">
                <p class="ticketCard-num">
                    <span><i class="fas fa-exclamation-circle"></i></span>
                    剩下最後 <span id="ticketCard-num"> ${data[i].group} </span> 組
                </p>
                <p class="ticketCard-price">
                    TWD <span id="ticketCard-price">$${data[i].price}</span>
                </p>
            </div>
        </div>
    </li>`
            }
        }
        ticketCardArea.innerHTML = str
        searchResultText.innerHTML = `本次搜尋共 ${temp} 筆資料`
    }
}
//新增景點function
function addNewSpot() {
    data.push({
        "name": ticketName.value,
        "imgUrl": ticketImgUrl.value,
        "area": ticketRegion.value,
        "description": ticketDescription.value,
        "group": ticketNum.value,
        "price": ticketPrice.value,
        "rate": ticketRate.value
    })
    init();
}

regionSearch.addEventListener("change", function(event){
    filter(regionSearch.value)
});
addTicketBtn.addEventListener("click", function(event){
    addNewSpot()
});