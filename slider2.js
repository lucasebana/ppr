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
            closeModals();
            const offset = button.dataset.sliderButton === "prev" ? -1 : 1;
            const slides = button.closest("[data-slider]").querySelector("[data-slides]")
    
            const activeSlide = slides.querySelector("[data-active]")
            let newIndex = [...slides.children].indexOf(activeSlide) + offset
            const length = slides.children.length;
            
            if(newIndex >=0 && newIndex < length){
                slides.children[newIndex].dataset.active = true;
                
                if( offset > 0){
                    gsap.fromTo(activeSlide,{y:"0"},{y:"-130%",ease:"power4.out",duration:0.1})
                    gsap.fromTo(activeSlide,{opacity:"1"},{opacity:"0",duration:0.25})
                    let v = activeSlide.querySelector(".vAnim");
                    if(v != undefined){
                        //v.currentTime = 0;
                    }
                }
                else if(offset < 0){                
                    gsap.fromTo(slides.children[newIndex],{y:"-130%"},{y:"0%",ease:"power4.out",duration:0.1})
                    
                    gsap.to(slides.children[newIndex],{opacity:"1",duration:0.25})

                    let v = slides.children[newIndex].querySelector(".vAnim");
                    if(v != undefined){
                        v.currentTime = 0;
                    }
                }
               



                delete activeSlide.dataset.active;
                window.align();
            }
            
            if (newIndex === 1){
                //document.querySelector("video").play();
                document.querySelector("#kitchenAnim").currentTime = 0;
                
                document.querySelector("#feuillesAnim").pause();
                setTimeout(()=>{document.querySelector("#kitchenAnim").play();},1000);
                
            }
            if (newIndex === 2){
                //document.querySelector("video").play();
                document.querySelector("#feuillesAnim").currentTime = 0;
                
                document.querySelector("#feuillesAnim").pause();
                setTimeout(()=>{let v=document.querySelector("#feuillesAnim");v.play();},1700);
            }

            if (newIndex === 3){
                //document.querySelector("video").play();
                document.querySelector("#p5Anim").currentTime = 0;
                
                document.querySelector("#p5Anim").pause();
                setTimeout(()=>{let v=document.querySelector("#p5Anim");v.play();},1700);
            }

        });
    })
}

let closeModals = ()=>{
    //close modals
    let modals = document.querySelectorAll(".modal")
    modals.forEach(m=>{
        m.classList.remove("shown")
        let tog = m.parentNode.querySelector(".slide-outline")
        gsap.to(tog,{opacity:"0",ease:"stepped",duration:0.3})
    });
}

let SwitchSlide = (dir)=>{
    (()=>{

        
        closeModals();

        const offset = dir
        const slides = document.querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        const length = slides.children.length;
        
        if(newIndex >=0 && newIndex < length){
            slides.children[newIndex].dataset.active = true;
            
            if( offset > 0){
                gsap.fromTo(activeSlide,{y:"0"},{y:"-130%",ease:"power4.out",duration:0.1})
                gsap.fromTo(activeSlide,{opacity:"1"},{opacity:"0",duration:0.25})
                let v = activeSlide.querySelector(".vAnim");
                if(v != undefined){
                    //v.currentTime = 0;
                }
            }
            else if(offset < 0){                
                gsap.fromTo(slides.children[newIndex],{y:"-130%"},{y:"0%",ease:"power4.out",duration:0.1})
                
                gsap.to(slides.children[newIndex],{opacity:"1",duration:0.25})

                let v = slides.children[newIndex].querySelector(".vAnim");
                if(v != undefined){
                    v.currentTime = 0;
                }
            }
           



            delete activeSlide.dataset.active;
            window.align();
        }
        
        if (newIndex === 1){
            //document.querySelector("video").play();
            document.querySelector("#kitchenAnim").currentTime = 0;
            
            document.querySelector("#kitchenAnim").pause();
            setTimeout(()=>{document.querySelector("#kitchenAnim").play();},1000);
            
        }
        if (newIndex === 2){
            //document.querySelector("video").play();
            
            document.querySelector("#feuillesAnim").currentTime = 0;
            
            document.querySelector("#feuillesAnim").pause();
            setTimeout(()=>{let v=document.querySelector("#feuillesAnim");v.play();},1700);
        }

        if (newIndex === 3){
            //document.querySelector("video").play();
            
            console.log("arrivee slide 3e")
            document.querySelector("#p5Anim").currentTime = 0;
            
            document.querySelector("#p5Anim").pause();
            setTimeout(()=>{let v=document.querySelector("#p5Anim");v.play();},1700);
        }

    })()
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
    let E = videoElement.addEventListener("timeupdate", function(){
        if(videoElement.currentTime >= 1/50*211 && playKitchen) {
            //videoElement.pause();
            playKitchen = false;
        }
    });

}

const kitchenClick = (videoElement)=>{
    videoElement.currentTime = 0;
    videoElement.play()
    //=> change slide
}

//let index =[...slides.children].indexOf(activeSlide);

document.addEventListener('DOMContentLoaded', (event) => {
    gsap.to(".slides-loader",{display:"none"});
    window.align();


    let v = document.querySelector("video")
    startKitchen(v);
  })

//modal box event listeners
let points = document.querySelectorAll(".slide-point");
points.forEach(point=>{
    if(point.dataset.box != undefined){
        let modal = point.querySelector("#"+point.dataset.box);
        point.addEventListener("click",(e)=>{
            modal.classList.toggle("shown");
            let tog = modal.parentNode.querySelector(".slide-outline")
            if(modal.classList.contains("shown")){
                if(tog){
                    gsap.to(tog,{opacity:"0.4",ease:"stepped",duration:0.4})
                }
                //gsap.fromTo("")                
            }
            else{
                gsap.to(tog,{opacity:"0",ease:"stepped",duration:0.3})
            }
        });
    }
});

let v = document.querySelectorAll(".vAnim");
v.forEach(a=>{
    a.addEventListener("timeupdate",function(){
        if(!a.paused){
            if(a.currentTime >= 1/50*211) {
                a.currentTime = 1/50 * 211;
                //a.pause();
            }
        }
        else{
            //a.closest(".slide").classList.toggle("slide-point-inv")
            //gsap.fromTo(a.closest(".slide").querySelector(".slide-point-inv"),{opacity:"0"},{opacity:"1",ease:"power4.out",duration:0.1})
        }
    })


});

let bt = document.querySelector("#anim1Trigger");
bt.addEventListener("click",()=>{
    let btvid = document.querySelector("#paperAnim")
    btvid.play();

    let func = ()=>{
        btvid.pause();
        SwitchSlide(1);
        setTimeout(()=>{btvid.currentTime=0},400);
        document.querySelector("#paperAnim").removeEventListener("ended",func);
    }
    let e = document.querySelector("#paperAnim").addEventListener("ended",func)

})

