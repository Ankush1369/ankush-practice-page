let imageList = ["img1.jpeg", "img2.jpeg", "img3.jpeg", "img4.jpeg", "img5.jpeg"];

const navBar = document.querySelector("nav");
const imageShow = document.querySelector(".imageShow");

function createImageElement(imageURL, index){

    const imgElement = document.createElement("div");
    imgElement.classList.add("imgElement")
    
    //creating the actual image element
    const imgPng = document.createElement("img");
    imgPng.setAttribute("src", imageURL);
    imgPng.classList.add("displayImage");
    imgElement.append(imgPng); 

    //creating the input textbox below image element
    const inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.classList.add("inputName");
    inputText.value = imageURL;

    imgElement.append(inputText);

    return imgElement;

}

function createButtonElement(imageURL){
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('displayButton');
    
    //adding the image for icon purposes .
    const buttonIcon = document.createElement("img");
    buttonIcon.classList.add("icon");
    buttonIcon.setAttribute("src", imageURL);

    const newButton = document.createElement("span");
    newButton.textContent = imageURL;

    buttonElement.append(buttonIcon);
    buttonElement.append(newButton);

    return buttonElement;
}
imageList.forEach((item, index) => {
    // console.log(item, index);


    const buttonElement = createButtonElement(item);
    const imgElement = createImageElement(item, index);

    if (index>0) {
        imgElement.classList.add("hidden");
    }else{
        buttonElement.classList.add("selected");
    }

    navBar.append(buttonElement);
    imageShow.append(imgElement);

    buttonElement.addEventListener('click', () => {
        document.querySelectorAll('button.displayButton').forEach((button)=>{
            button.classList.remove("selected");
        });

        document.querySelectorAll(".imgElement").forEach((image) => {
            image.classList.add("hidden");
        });
        imgElement.classList.remove("hidden");
        buttonElement.classList.add("selected")
    });

    const inputElement = imgElement.querySelector("input");
    inputElement.addEventListener("input", () =>{
        const spanElement = buttonElement.querySelector("span");
        spanElement.textContent = inputElement.value;
    });

});