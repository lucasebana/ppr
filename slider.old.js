gsap;
const buttons = document.querySelectorAll("[data-slider-button]");
const start_btn = document.querySelector(".start-btn");
const start_modal = document.querySelector(".intro-modal");

const chuteSopalin = document.querySelector("#chuteSopalin");

const slides =  document.querySelectorAll(".slide");
let z = 50;
slides.forEach(s=>{
    s.style.zIndex= z;
    z--;
})


start_btn.addEventListener("click",()=>{
    start_modal.classList.add("fadeout");
    document.querySelector(".slides-container").style.filter="none";
    enable_buttons();
    window.align();
})

const enable_buttons = ()=>{
    
    gsap.to(".slider-button",{display:"block"});
    buttons.forEach(button=>{
        button.addEventListener("click",()=>{
            const offset = button.dataset.sliderButton === "prev" ? -1 : 1;
            console.log(offset)
            const slides = button.closest("[data-slider]").querySelector("[data-slides]")
    
            const activeSlide = slides.querySelector("[data-active]")
            let newIndex = [...slides.children].indexOf(activeSlide) + offset
            const length = slides.children.length;
            
            if(newIndex >=0 && newIndex < length){
                slides.children[newIndex].dataset.active = true;
                
                console.log(activeSlide);
                if( offset > 0){
                    gsap.fromTo(activeSlide,{y:"0"},{y:"-130%",ease:"power4.out",duration:0.1})
                }
                else if(offset < 0){                
                    gsap.fromTo(slides.children[newIndex],{y:"-130%"},{y:"0%",ease:"power4.out",duration:0.1})
                }
               
                delete activeSlide.dataset.active;
                window.align();
            }
            
            if (newIndex === 1){
                document.querySelector("video").play();
                
                console.log("index 2")
            }

        });
    })
}

window.align = ()=>{
    let points = document.querySelectorAll(".slide-point");

    points.forEach(point=>{
        const x = point.dataset.x;
        const y = point.dataset.y;
        const h = point.dataset.h;
        const w = point.dataset.w;
    
        let image = point.closest(".slide").querySelector("#slide-img");
        let natH = image.naturalHeight; 
        let natW = image.naturalWidth;
    
        let clientH = image.clientHeight;
        let clientW = image.clientWidth;
    
        /*
        const img = point.querySelectorAll("img")
        img.forEach(i=>{
            i.style.width = w*clientW/natH + "px";
            i.style.height = h*clientH/natH + "px";
        });
        */
        const ratioX = clientW/natW;
        const ratioY = clientH/natH;
        point.style.left = x*ratioX + "px";
        point.style.top = y*ratioY + "px";
        point.style.width = w*ratioX + "px";
        point.style.height = h*ratioY + "px";
    });
}

let playKitchen = true;
const startKitchen = (videoElement)=>{
    console.log("startKitchen")
    let E = videoElement.addEventListener("timeupdate", function(){
        if(videoElement.currentTime >= 1/50*211 && playKitchen) {
            videoElement.pause();
            playKitchen = false;
        }
    });

}

const kitchenClick = (videoElement)=>{
    videoElement.play()
    //=> change slide
}

//let index =[...slides.children].indexOf(activeSlide);

document.addEventListener('DOMContentLoaded', (event) => {
    gsap.to(".slides-loader",{display:"none"});
    console.log("loaded")
    window.align();


    let v = document.querySelector("video")
    startKitchen(v);
  })




