document.addEventListener("DOMContentLoaded", function() {

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
