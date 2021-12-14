const buttons = document.querySelectorAll("[data-slider-button]");
const start_btn = document.querySelector(".start-btn");
const start_modal = document.querySelector(".intro-modal");

chuteSopalin

start_btn.addEventListener("click",()=>{
    start_modal.classList.add("fadeout");
})

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
            
            console.log(length,newIndex);
            if( offset > 0){
                //activeSlide.classList.add("nextUp");
                gsap.fromTo(slides.children[newIndex],{y:-10},{y:0});
            }
            else if(offset < 0){
                //activeSlide.classList.add("nextDown");
            }
           
            delete activeSlide.dataset.active;
            window.align();
        }
    });
})

window.align = ()=>{
    let points = document.querySelectorAll(".slide-point");

    points.forEach(point=>{
        const x = point.dataset.x;
        const y = point.dataset.y;
        const h = point.dataset.h;
        const w = point.dataset.w;
    
        let image = point.closest(".slide").querySelector("img");
        let natH = image.naturalHeight; 
        let natW = image.naturalWidth;
    
        let clientH = image.clientHeight;
        let clientW = image.clientWidth;
    
    
        point.style.left = x*clientW/natW + "px";
        point.style.top = y*clientH/natH + "px";
        point.style.width = w*clientW/natH + "px";
        point.style.height = h*clientH/natH + "px";
    });
}

window.align();



