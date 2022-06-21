

let datasrc = [
    {
        "previewImage": "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "cat.jpeg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "a man and a woman trying to cook a meal together in a modern kitchen.jpg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "bali-kelingking-beach-plastic-removal-drive.key"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "NextByk Investor Pitch 2022.ppt"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        "title": "interns-performance-report-may-2022.key"
    }
];

const url = "data.json";

let cnt = 0;
let currently_selected = 0;
const navBar = document.createElement("nav");
const imgShow = document.createElement("div");
imgShow.classList.add("imgSide");

document.querySelector("body").append(navBar);
document.querySelector("body").append(imgShow);


const imageElement = document.createElement("img");
imageElement.classList.add("displayImage")

const imageLabel = document.createElement("input");
imgShow.append(imageElement);
imgShow.append(imageLabel);

let buttonArray = [];
let contentArray = [];

fetch(url)
    .then(response => response.json())
    .then(data => {datasrc = data})
    .catch(error => {
        console.log("Error in fetching data");
    });



function checkAndFixOverflow(spanElement){
        let currentWidth = spanElement.scrollWidth;
        const spanText = spanElement.textContent;
        spanElement.textContent = "";
        let minimumWidth = spanElement.scrollWidth;
        spanElement.textContent = spanText;
    
        if(currentWidth > minimumWidth){
            console.log("Span Element overflow..");
        }
}

function createButton(imageData, index){
    const imgURL = imageData["previewImage"];
    const imgTitle = imageData["title"];

    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("index", index);
    
    const buttonIcon = document.createElement("img");
    buttonIcon.setAttribute("src", imgURL);
    buttonIcon.classList.add("buttonIcon");

    const buttonText = document.createElement("span");
    buttonText.setAttribute("textContent", imgTitle);
    buttonText.textContent = imgTitle
    checkAndFixOverflow(buttonText);

    buttonElement.append(buttonIcon);
    buttonElement.append(buttonText);

    return buttonElement;
}


function selectButton(buttonElementIndex){
    buttonArray[currently_selected].classList.remove("selected");
    buttonArray[buttonElementIndex].classList.add("selected");
    currently_selected = buttonElementIndex;

    const buttonIcon = buttonArray[buttonElementIndex].querySelector("img");
    const buttonText = buttonArray[buttonElementIndex].querySelector("span");

    imageElement.setAttribute("src", buttonIcon.getAttribute("src"));
    imageLabel.value = buttonText.textContent;
}


function addImages(data){
    data.forEach(imageData => {
        const buttonElement = createButton(imageData, cnt);
        buttonArray.push(buttonElement);
        contentArray.push()
        navBar.append(buttonElement);

        buttonElement.addEventListener('click', () => {
            selectButton(buttonElement.getAttribute("index"));
        });

        if(cnt==0){
            selectButton(0);
        }
        cnt++;
    });
}

imageLabel.addEventListener('input', () => {

    const spanElement = buttonArray[currently_selected].querySelector("span");
    spanElement.setAttribute("textContent", imageLabel.value);
    spanElement.textContent = imageLabel.value;
    checkAndFixOverflow(spanElement);
});

document.addEventListener('keydown', (keyPress) => {
    switch(keyPress.key) {
        case "ArrowDown":
            selectButton((currently_selected+1)%buttonArray.length);
            break
        case "ArrowUp":
            selectButton((currently_selected-1+buttonArray.length)%buttonArray.length);
            break
        default:
            //do nothing
    }
});




addImages(datasrc);

// function change