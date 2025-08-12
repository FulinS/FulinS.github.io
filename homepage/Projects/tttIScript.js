document.addEventListener("DOMContentLoaded", function(){
    const lButton=document.querySelectorAll("a");
    lButton.forEach(f=>{
        f.addEventListener("mouseenter", function(a){
            this.style.borderStyle="solid";
        })
        f.addEventListener("mouseleave", function(a){
            this.style.borderStyle="none";
        })
    });

})
