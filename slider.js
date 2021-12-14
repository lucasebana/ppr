gsap;

const buttons = document.querySelectorAll("[data-slider-button]");
const start_btn = document.querySelector(".start-btn");
const start_modal = document.querySelector(".intro-modal");

const chuteSopalin = document.querySelector("#chuteSopalin");

const slidesList =  document.querySelectorAll(".slide");
let z = 50;
slidesList.forEach(s=>{
    s.style.zIndex= z;
    z--;
})

//TODO : ADD /!\ ALL /!\ CALLBACKS/EVENTLISTENERS FIRST, METHODS SECOND

const slides = document.querySelector("[data-slides]")
const length = slides.children.length;

const activeSlide = slides.querySelector("[data-active]")
const index = [...slides.children].indexOf(activeSlide)
let slidesStatus = new Array(length);
for(i = 0; i<length;i++){
    slidesStatus[i] =  (index === i) ? true:false;
}

buttons.forEach(button=>{
button.addEventListener("click",()=>{
    const offset = button.dataset.sliderButton === "prev" ? -1 : 1;
    switchSlides(offset);
    });

})
let refreshVars = ()=>{
    const activeSlide = slides.querySelector("[data-active]")
    const index = [...slides.children].indexOf(activeSlide)
    let slidesStatus = new Array(length);
    for(i = 0; i<length;i++){
        slidesStatus[i] =  (index === i) ? true:false;
}
}


start_btn.addEventListener("click",()=>{
    start_modal.classList.add("fadeout");
    document.querySelector(".slides-container").style.filter="none";
    gsap.to(".slider-button",{display:"block"});
    gsap.fromTo(".slides-prestart",{opacity:"1"},{opacity:"1"})
    window.align();
})


let sliderNextPrev= ()=>{

    //button = buttons[0]
    
        
        
        let switchSlides = (off)=>{
        let newIndex = [...slides.children].indexOf(activeSlide) + off

        
        if(newIndex >=0 && newIndex < length){
            slides.children[newIndex].dataset.active = true;

            if( off > 0){
                gsap.fromTo(activeSlide,{y:"0"},{y:"-130%",ease:"power4.out",duration:0.1})//slideup
            }
            else if(off < 0){                
                gsap.fromTo(slides.children[newIndex],{y:"-130%"},{y:"0%",ease:"power4.out",duration:0.1})//slidedown
            }
           
            delete activeSlide.dataset.active;
            window.align();
            refreshVars();
        }
        }

        for (it = 0; it < length;it++){
            if(it === index){
                if(it == 1){
                
                    //kitchen.mp4
                    let v1 = document.querySelector("#kitchen")
                    let videoElement = document.querySelector("#kitchenAnim")
                    //play anim
                    //play anim
                    if(index === it){
                        videoElement.play();
                    }
                    //add EventListener to pause...
                    //let p1 = false;
                    console.log(videoElement.currentTime)
                    let E = videoElement.addEventListener("timeupdate", (it)=>{
                        (it)=>{
                        console.log(videoElement.currentTime,it)
                    if(videoElement.currentTime >= 1/50*211 && slidesStatus[it]) {
                        videoElement.currentTime = 1/50*211
                        videoElement.pause();
                        slidesStatus[it] = false;
    
                    /* */
                    videoElement.addEventListener('ended', (event) => {
                        //next slide
                        switchSlides(+1);
                        
                      });
                      
                    }
    
                    }
                    
                    });
                }
            }

        }

        /*
        
        for(i = 0; i < slides.size(); i++){
            //pour chaque slide
            if(i === 1){
                //kitchen.mp4
                if (newIndex === 1){
                    let v1 = document.querySelector("#kitchen")
                    //play anim
                    document.querySelector("#kitchenAnim").play();
                    //add EventListener to pause...
                    let E = videoElement.addEventListener("timeupdate", function(){
                    let p1 = false;
                    if(videoElement.currentTime >= 1/50*211 && !p1) {
                        videoElement.pause();
                        p1 = true;
                    }
    
        });
                }
            }
    
    
        }
        
        */
       /*
        if (newIndex === 1){
            document.querySelector("video").play();
        }
        */

}


let align = ()=>{
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
window.align = align;



const startKitchen = (videoElement)=>{
    console.log("startKitchen")
    let E = videoElement.addEventListener("timeupdate", function(){
        let done = false;
        if(videoElement.currentTime >= 1/50*211 && !done) {
            videoElement.pause();
            done = true;
        }
        
    });

}

const kitchenClick = (videoElement)=>{
    videoElement.play()
    //=> change slide
}

//let index =[...slides.children].indexOf(activeSlide);

document.addEventListener('DOMContentLoaded', (event) => {

    console.log(`
    ┌┐ ┌─┐┌┐┌┌─┐┌┐┌┌─┐╔═╗┬  ┬┌┬┐┌─┐┬─┐  )
    ├┴┐├─┤│││├─┤│││├─┤╚═╗│  │ ││├┤ ├┬┘  )
    └─┘┴ ┴┘└┘┴ ┴┘└┘┴ ┴╚═╝┴─┘┴─┴┘└─┘┴└─o`)

    buttons.forEach(b=>{
        b.addEventListener("click", sliderNextPrev,null);
    })

    gsap.fromTo(
        ".slides-loader",
        {opacity:"1"},
        {opacity:"0",ease:"power2",
        duration:2,
        onComplete:(()=>{
            gsap.to(".slides-loader",{display:"none"})
        })}
    );
    console.log("loaded")
    align();


    //let v = document.querySelector("video")
    //startKitchen(v);
  })




