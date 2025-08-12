document.addEventListener("DOMContentLoaded", function() {

    function fulinSFlash(){
        let colorPicker= Math.floor(Math.random()*5.9);
        let flashItem= document.querySelector("#fulinSFlash");
        if (colorPicker==0){
            flashItem.style.color="Red";
        }
        else if (colorPicker==1){
            flashItem.style.color="Green";
        }
        else if (colorPicker==2){
            flashItem.style.color="Blue";
        }
        else if (colorPicker==3){
            flashItem.style.color="Yellow";
        }
        else if (colorPicker==4){
            flashItem.style.color="#03fce8";
        }
        else{
            flashItem.style.color="Purple";
        }
    }

    function directMusic(x){
        this.style.backgroundColor="#545454";
        window.location="music.html";
    }
    function directRecs(x){
        this.style.backgroundColor="#545454";
        window.location="recs.html";
    }
    function directProject(x){
        this.style.backgroundColor="#545454";
        window.location="Projects/index.html";
    }
    function directIndex(x){
        window.location="index.html";
    }

    function hover(x){
        this.style.backgroundColor="#545454";
    }
    function notHover(x){
        this.style.backgroundColor="#000000";
    }




    window.setInterval(fulinSFlash, 400);
    document.querySelector("#musicLink").addEventListener("click", directMusic);
    document.querySelector("#recLink").addEventListener("click", directRecs);
    document.querySelector("#projectLink").addEventListener("click", directProject);
    document.querySelector(".topbarLinkL").addEventListener("click", directIndex);
    const topbarLinkR=document.querySelectorAll(".topbarLinkR");
    topbarLinkR.forEach(TBLink=>{
        TBLink.addEventListener("mouseover", hover);
        TBLink.addEventListener("mouseout", notHover);
    });
});
