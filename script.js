//README: The code here is VERY messy. Look as your own risk. You have been warned...

let total=0;

document.addEventListener("DOMContentLoaded", function(){
    //func defs
    //multiple choice
    function MDisp(x){
        if (this.className=="mwrong"){
            const a = document.querySelectorAll(".mwrong, .mright");
            a.forEach(ab => {
                ab.disabled=true;
            });
            document.querySelector(".mright").style.borderColor="Green";
            this.style.backgroundColor="Red";
        }
        if (this.className=="mright"){
            total+=1;
            const a = document.querySelectorAll(".mwrong, .mright");
            a.forEach(ab => {
                ab.disabled=true;
            });
            this.style.backgroundColor="Green";
        }
    }
    function MDisp2(x){
        if (this.className=="mwrong2"){
            const a = document.querySelectorAll(".mwrong2, .mright2");
            a.forEach(ab => {
                ab.disabled=true;
            });
            document.querySelector(".mright2").style.borderColor="Green";
            this.style.backgroundColor="Red";
        }
        if (this.className=="mright2"){
            total+=1;
            const a = document.querySelectorAll(".mwrong2, .mright2");
            a.forEach(ab => {
                ab.disabled=true;
            });
            this.style.backgroundColor="Green";
        }
    }
    function MDisp3(x){
        if (this.className=="mwrong3"){
            const a = document.querySelectorAll(".mwrong3, .mright3");
            a.forEach(ab => {
                ab.disabled=true;
            });
            document.querySelector(".mright3").style.borderColor="Green";
            this.style.backgroundColor="Red";
        }
        if (this.className=="mright3"){
            total+=1;
            const a = document.querySelectorAll(".mwrong3, .mright3");
            a.forEach(ab => {
                ab.disabled=true;
            });
            this.style.backgroundColor="Green";
        }
    }
    function MDisp4(x){
        if (this.className=="mwrong4"){
            const a = document.querySelectorAll(".mwrong4, .mright4");
            a.forEach(ab => {
                ab.disabled=true;
            });
            document.querySelector(".mright4").style.borderColor="Green";
            this.style.backgroundColor="Red";
        }
        if (this.className=="mright4"){
            total+=1;
            const a = document.querySelectorAll(".mwrong4, .mright4");
            a.forEach(ab => {
                ab.disabled=true;
            });
            this.style.backgroundColor="Green";
        }
    }
    function MDisp5(x){
        if (this.className=="mwrong5"){
            const a = document.querySelectorAll(".mwrong5, .mright5");
            a.forEach(ab => {
                ab.disabled=true;
            });
            document.querySelector(".mright5").style.borderColor="Green";
            this.style.backgroundColor="Red";
        }
        if (this.className=="mright5"){
            total+=1;
            const a = document.querySelectorAll(".mwrong5, .mright5");
            a.forEach(ab => {
                ab.disabled=true;
            });
            this.style.backgroundColor="Green";
        }
    }
    function MDisp6(x){
        if (this.className=="mwrong6"){
            const a = document.querySelectorAll(".mwrong6, .mright6");
            a.forEach(ab => {
                ab.disabled=true;
            });
            document.querySelector(".mright6").style.borderColor="Green";
            this.style.backgroundColor="Red";
        }
        if (this.className=="mright6"){
            total+=1;
            const a = document.querySelectorAll(".mwrong6, .mright6");
            a.forEach(ab => {
                ab.disabled=true;
            });
            this.style.backgroundColor="Green";
        }
    }


    //free response
    function FDisp(x){
        let response=document.querySelector("#submitter").value;
        if (response=="PDQ Bach"||response=="P.D.Q. Bach"){
            total+=1;
            document.querySelector("#submitter").style.borderColor="Green";
            document.querySelector("#fans").style.color="Green";
        }
        else{
            document.querySelector("#submitter").style.borderColor="Red";
            document.querySelector("#fans").style.color="Red";
        }
        document.querySelector("#submitter").disabled=true;
        document.querySelector("#fans").innerHTML="PDQ Bach";
    }
    function FDisp2(x){
        let response=document.querySelector("#submitter2").value;
        if (response=="Euler's Identity"||response=="Eulers Identity"){
            total+=1;
            document.querySelector("#submitter2").style.borderColor="Green";
            document.querySelector("#fans2").style.color="Green";
        }
        else{
            document.querySelector("#submitter2").style.borderColor="Red";
            document.querySelector("#fans2").style.color="Red";
        }
        document.querySelector("#submitter2").disabled=true;
        document.querySelector("#fans2").innerHTML="Euler's Identity";
    }
    function FDisp3(x){
        let response=document.querySelector("#submitter3").value;
        if (response=="🙂"){
            total+=1;
            document.querySelector("#submitter3").style.borderColor="Green";
            document.querySelector("#fans3").style.color="Green";
        }
        else{
            document.querySelector("#submitter3").style.borderColor="Red";
            document.querySelector("#fans3").style.color="Red";
        }
        document.querySelector("#submitter3").disabled=true;
        document.querySelector("#fans3").innerHTML="🙂";
    }
    function FDisp4(x){
        let response=document.querySelector("#submitter4").value;
        if (response=="2.0"){
            total+=1;
            document.querySelector("#submitter4").style.borderColor="Green";
            document.querySelector("#fans4").style.color="Green";
        }
        else{
            document.querySelector("#submitter4").style.borderColor="Red";
            document.querySelector("#fans4").style.color="Red";
        }
        document.querySelector("#submitter4").disabled=true;
        document.querySelector("#fans4").innerHTML="2.0";
    }




    //multiple choice buttons
    const buttons = document.querySelectorAll(".mright, .mwrong");
    buttons.forEach(button => {
        button.addEventListener("click", MDisp);
    });
    const buttons2 = document.querySelectorAll(".mright2, .mwrong2");
    buttons2.forEach(button => {
        button.addEventListener("click", MDisp2);
    });
    const buttons3 = document.querySelectorAll(".mright3, .mwrong3");
    buttons3.forEach(button => {
        button.addEventListener("click", MDisp3);
    });
    const buttons4 = document.querySelectorAll(".mright4, .mwrong4");
    buttons4.forEach(button => {
        button.addEventListener("click", MDisp4);
    });
    const buttons5 = document.querySelectorAll(".mright5, .mwrong5");
    buttons5.forEach(button => {
        button.addEventListener("click", MDisp5);
    });
    const buttons6 = document.querySelectorAll(".mright6, .mwrong6");
    buttons6.forEach(button => {
        button.addEventListener("click", MDisp6);
    });


    //free response
    let ans=document.querySelector("#submit");
    ans.addEventListener("click", FDisp);
    let ans2=document.querySelector("#submit2");
    ans2.addEventListener("click", FDisp2);
    let ans3=document.querySelector("#submit3");
    ans3.addEventListener("click", FDisp3);
    let ans4=document.querySelector("#submit4");
    ans4.addEventListener("click", FDisp4);


    //Score
    function updateScore(x){
        document.querySelector("#sc").innerHTML=`${total}/10`;
    }
    const buttonsTotal = document.querySelectorAll("button");
    buttonsTotal.forEach(button => {
        button.addEventListener("click", updateScore);
    });
});
