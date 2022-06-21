const url = "data.json";

const navBar = document.createElement("nav");
const imgShow = document.createElement("div");

fetch(url)
    .then(response => response.json())
    .then(data => addImage(data))

// let cnt = 0;
function addImage(data){
    console.log(data);
}