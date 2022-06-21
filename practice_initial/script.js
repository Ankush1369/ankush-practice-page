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

    const id = `Image_${item}_${index+1}`
    buttonElement.setAttribute("data-id", id);
    imgElement.setAttribute("id", id);

    navBar.append(buttonElement);
    imageShow.append(imgElement);

    buttonElement.se

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

    buttonElement.addEventListener("keydown", (event) => {
        console.log(event);
    });

    const inputElement = imgElement.querySelector("input");
    inputElement.addEventListener("input", () =>{
        const spanElement = buttonElement.querySelector("span");
        spanElement.textContent = inputElement.value;
    });

});

const buttonList = document.querySelectorAll(".displayButton");
const number_of_buttons = buttonList.length;

document.addEventListener("keydown", (event) => {
    let flag = 0;
    if(event.key == "ArrowDown"){
        flag = 1;
    }else if(event.key == "ArrowUp"){
        flag = -1;
    }else{
        return;
    }

    
    buttonList.forEach((button, index) => {
        if(button.classList.contains("selected") && flag!=0){
            if((flag+index)<number_of_buttons && (flag+index)>=0){
                button.classList.remove("selected");

                //hidding the already selected image element;
                const id = button.getAttribute("data-id");
                const imgElement = document.getElementById(id);
                imgElement.classList.add("hidden");

                //updating the new image element
                const updateButton = buttonList[flag+index];
                updateButton.classList.add("selected");
                const newImg = document.getElementById(updateButton.getAttribute("data-id"));
                newImg.classList.remove("hidden");
            }
            flag = 0;
        }
    });
});


