/*
GRID LAYOUT:
(0,4) (1,4) (4,2) (4,1) (4,0)  }
(0,3) (1,3) (3,2) (3,1) (3,0)  }
(0,2) (2,2) (2,2) (2,1) (2,0)  } ADD 1 TO ALL
(0,1) (1,1) (1,2) (1,1) (1,0)  }
(0,0) (1,0) (0,2) (0,1) (0,0)  }

GRID BUTTON ID:
#-xyzw ex.#-1234

R is x-reversed

P1 and P2 are correctly ordered
*/

function main(){
    const R=[];
    function fillR(i){
        if (i>=625){
            return;
        }
        let temp=i.toString(5);
        let len=temp.length;
        if (len==1){
            R.push(['0','0','0',temp[0],0]);
        }
        else if (len==2){
            R.push(['0','0',temp[0],temp[1],0]);
        }
        else if (len==3){
            R.push(['0',temp[0],temp[1],temp[2],0]);
        }
        else{
            R.push([temp[0],temp[1],temp[2],temp[3],0]);
        }
        fillR(i+1);
        return;
    }
    fillR(0);
    const dimensions=[1,1];
    const P1=[];
    const P2=[];
    let player='X';
    let win=0;

    document.addEventListener("DOMContentLoaded", function(){
        //functions

        function generateGrid(t,f, rowAlready,i){
            if (i<0){
                return;
            }
            let table=document.querySelector("table");
            let counter=i.toString(5).padStart(2, '0');
            let current = R.find(function(value){
                return [counter[1], counter[0], (t-1).toString(), (f-1).toString()].every((val, idx) => val == value[idx]);
            });
            let symbol = '*';
            let boo=null;
            if (current) {
                boo = current[4];
                if (boo == 2){
                    symbol = 'O';
                }
                if (boo == 1){
                    symbol = 'X';
                }
            }
            if (boo==2){
                symbol='O';
            }
            if (boo==1){
                symbol="X";
            }
            if (!rowAlready){
                const row = document.createElement("tr");
                table.appendChild(row);
            }
            /* AI provided syntax for how to create HTML elements in JS*/
            const cell = document.createElement("td");
            const button = document.createElement("button");
            button.id = `-${5-parseInt(counter[1])}${parseInt(counter[0])+1}${t}${f}`;
            button.classList.add('tableButton');
            button.textContent = symbol;
            cell.appendChild(button);
            table.querySelector("tr:last-child").appendChild(cell);
            generateGrid(t,f, !Number.isInteger(i/5), i-1);
        }


        function update(a){
            if (this.id[0]=="3"){
                let temp=document.querySelector("#third");
                let f=temp.querySelectorAll('button');
                f.forEach(f=>{
                    f.style.opacity="1";
                });
                /* AI provided the name for opacity property */
                this.style.opacity="0.6";
                dimensions[0]=this.id[2];
                document.querySelector("#tellUserDimensions3").innerHTML="3d layer: "+dimensions[0];
            }
            else if (this.id[0]=="4"){
                let temp=document.querySelector("#fourth");
                let f=temp.querySelectorAll('button');
                f.forEach(f=>{
                    f.style.opacity="1";
                });
                this.style.opacity="0.6";
                dimensions[1]=this.id[2];
                document.querySelector("#tellUserDimensions4").innerHTML="4d layer: "+dimensions[1];
            }
            document.querySelector("table").innerHTML=""
            generateGrid(parseInt(dimensions[0]),parseInt(dimensions[1]), false, 24,);
            document.querySelectorAll("table button").forEach(f=>{
                f.addEventListener("mouseenter", informUser);
                f.addEventListener("mouseleave", revertColor);
                f.addEventListener("click", updateUserList);
            });
        }


        function informUser(a){
            this.style.backgroundColor='rgb(29, 204, 75)';
            let coord=this.id;
            document.querySelector("#currentCoordinatep").innerHTML=`(${coord[1]} ,${coord[2]}, ${coord[3]}, ${coord[4]})`;
        }
        function revertColor(a){
            this.style.backgroundColor="transparent";
        }


        function updateUserList(a){
            let current=this.id.substring(1);
            let temp=[];
            for (i in current){
                temp.push(current[i]);
            }
            let cur = R.find(function(value){
                return [(4-(Number(temp[0])-1)).toString(), (Number(temp[1])-1).toString(), (Number(temp[2])-1).toString(), (Number(temp[3])-1).toString()].every((val, idx) => val == value[idx]);
            });
            if (cur[4] !=0){
                return;
            }
            if (player=="X"){
                P1.push(temp);
                player="O";
                cur[4]=1;
                this.textContent = "X";
                if (P1.length>=4){
                    checkForRow(P1, "X");
                }
            }
            else {
                P2.push(temp);
                player="X";
                cur[4]=2;
                this.textContent = "O";
                if (P2.length>=4){
                    checkForRow(P2, "O");
                }
            }

        }

        /*AI created arraysEqual function */
        function arraysEqual(a, b) {
        return a.length === b.length && a.every((val, index) => val === b[index]);
        }

        /* AI taught slice method */
        function check1d(dim, currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[dim]=String(Number(checkArray[dim])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[dim]=String(Number(checkArray[dim])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[dim]=String(Number(checkArray[dim])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check2d(dim1, dim2, currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[dim1]=String(Number(checkArray[dim1])+1);
            checkArray[dim2]=String(Number(checkArray[dim2])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[dim1]=String(Number(checkArray[dim1])+1);
                checkArray[dim2]=String(Number(checkArray[dim2])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[dim1]=String(Number(checkArray[dim1])+1);
                    checkArray[dim2]=String(Number(checkArray[dim2])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check2dR(dim1, dim2, currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[dim1]=String(Number(checkArray[dim1])-1);
            checkArray[dim2]=String(Number(checkArray[dim2])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[dim1]=String(Number(checkArray[dim1])-1);
                checkArray[dim2]=String(Number(checkArray[dim2])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[dim1]=String(Number(checkArray[dim1])-1);
                    checkArray[dim2]=String(Number(checkArray[dim2])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check3d(dim1, dim2, dim3, currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[dim1]=String(Number(checkArray[dim1])+1);
            checkArray[dim2]=String(Number(checkArray[dim2])+1);
            checkArray[dim3]=String(Number(checkArray[dim3])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[dim1]=String(Number(checkArray[dim1])+1);
                checkArray[dim2]=String(Number(checkArray[dim2])+1);
                checkArray[dim3]=String(Number(checkArray[dim3])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[dim1]=String(Number(checkArray[dim1])+1);
                    checkArray[dim2]=String(Number(checkArray[dim2])+1);
                    checkArray[dim3]=String(Number(checkArray[dim3])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check3dR1(dim1, dim2, dim3, currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[dim1]=String(Number(checkArray[dim1])-1);
            checkArray[dim2]=String(Number(checkArray[dim2])+1);
            checkArray[dim3]=String(Number(checkArray[dim3])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[dim1]=String(Number(checkArray[dim1])-1);
                checkArray[dim2]=String(Number(checkArray[dim2])+1);
                checkArray[dim3]=String(Number(checkArray[dim3])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[dim1]=String(Number(checkArray[dim1])-1);
                    checkArray[dim2]=String(Number(checkArray[dim2])+1);
                    checkArray[dim3]=String(Number(checkArray[dim3])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check3dR2(dim1, dim2, dim3, currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[dim1]=String(Number(checkArray[dim1])-1);
            checkArray[dim2]=String(Number(checkArray[dim2])-1);
            checkArray[dim3]=String(Number(checkArray[dim3])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[dim1]=String(Number(checkArray[dim1])-1);
                checkArray[dim2]=String(Number(checkArray[dim2])-1);
                checkArray[dim3]=String(Number(checkArray[dim3])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[dim1]=String(Number(checkArray[dim1])-1);
                    checkArray[dim2]=String(Number(checkArray[dim2])-1);
                    checkArray[dim3]=String(Number(checkArray[dim3])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check3dR3(dim1, dim2, dim3, currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[dim1]=String(Number(checkArray[dim1])+1);
            checkArray[dim2]=String(Number(checkArray[dim2])-1);
            checkArray[dim3]=String(Number(checkArray[dim3])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[dim1]=String(Number(checkArray[dim1])+1);
                checkArray[dim2]=String(Number(checkArray[dim2])-1);
                checkArray[dim3]=String(Number(checkArray[dim3])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[dim1]=String(Number(checkArray[dim1])+1);
                    checkArray[dim2]=String(Number(checkArray[dim2])-1);
                    checkArray[dim3]=String(Number(checkArray[dim3])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check4d(currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[0]=String(Number(checkArray[0])+1);
            checkArray[1]=String(Number(checkArray[1])+1);
            checkArray[2]=String(Number(checkArray[2])+1);
            checkArray[3]=String(Number(checkArray[3])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[0]=String(Number(checkArray[0])+1);
                checkArray[1]=String(Number(checkArray[1])+1);
                checkArray[2]=String(Number(checkArray[2])+1);
                checkArray[3]=String(Number(checkArray[3])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[0]=String(Number(checkArray[0])+1);
                    checkArray[1]=String(Number(checkArray[1])+1);
                    checkArray[2]=String(Number(checkArray[2])+1);
                    checkArray[3]=String(Number(checkArray[3])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check4dR1(currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[0]=String(Number(checkArray[0])-1);
            checkArray[1]=String(Number(checkArray[1])+1);
            checkArray[2]=String(Number(checkArray[2])+1);
            checkArray[3]=String(Number(checkArray[3])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[0]=String(Number(checkArray[0])-1);
                checkArray[1]=String(Number(checkArray[1])+1);
                checkArray[2]=String(Number(checkArray[2])+1);
                checkArray[3]=String(Number(checkArray[3])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[0]=String(Number(checkArray[0])-1);
                    checkArray[1]=String(Number(checkArray[1])+1);
                    checkArray[2]=String(Number(checkArray[2])+1);
                    checkArray[3]=String(Number(checkArray[3])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check4dR2(currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[0]=String(Number(checkArray[0])+1);
            checkArray[1]=String(Number(checkArray[1])-1);
            checkArray[2]=String(Number(checkArray[2])+1);
            checkArray[3]=String(Number(checkArray[3])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[0]=String(Number(checkArray[0])+1);
                checkArray[1]=String(Number(checkArray[1])-1);
                checkArray[2]=String(Number(checkArray[2])+1);
                checkArray[3]=String(Number(checkArray[3])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[0]=String(Number(checkArray[0])+1);
                    checkArray[1]=String(Number(checkArray[1])-1);
                    checkArray[2]=String(Number(checkArray[2])+1);
                    checkArray[3]=String(Number(checkArray[3])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check4dR3(currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[0]=String(Number(checkArray[0])+1);
            checkArray[1]=String(Number(checkArray[1])+1);
            checkArray[2]=String(Number(checkArray[2])-1);
            checkArray[3]=String(Number(checkArray[3])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[0]=String(Number(checkArray[0])+1);
                checkArray[1]=String(Number(checkArray[1])+1);
                checkArray[2]=String(Number(checkArray[2])-1);
                checkArray[3]=String(Number(checkArray[3])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[0]=String(Number(checkArray[0])+1);
                    checkArray[1]=String(Number(checkArray[1])+1);
                    checkArray[2]=String(Number(checkArray[2])-1);
                    checkArray[3]=String(Number(checkArray[3])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check4dR4(currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[0]=String(Number(checkArray[0])+1);
            checkArray[1]=String(Number(checkArray[1])+1);
            checkArray[2]=String(Number(checkArray[2])+1);
            checkArray[3]=String(Number(checkArray[3])-1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[0]=String(Number(checkArray[0])+1);
                checkArray[1]=String(Number(checkArray[1])+1);
                checkArray[2]=String(Number(checkArray[2])+1);
                checkArray[3]=String(Number(checkArray[3])-1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[0]=String(Number(checkArray[0])+1);
                    checkArray[1]=String(Number(checkArray[1])+1);
                    checkArray[2]=String(Number(checkArray[2])+1);
                    checkArray[3]=String(Number(checkArray[3])-1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check4dR5(currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[0]=String(Number(checkArray[0])-1);
            checkArray[1]=String(Number(checkArray[1])-1);
            checkArray[2]=String(Number(checkArray[2])+1);
            checkArray[3]=String(Number(checkArray[3])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[0]=String(Number(checkArray[0])-1);
                checkArray[1]=String(Number(checkArray[1])-1);
                checkArray[2]=String(Number(checkArray[2])+1);
                checkArray[3]=String(Number(checkArray[3])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[0]=String(Number(checkArray[0])-1);
                    checkArray[1]=String(Number(checkArray[1])-1);
                    checkArray[2]=String(Number(checkArray[2])+1);
                    checkArray[3]=String(Number(checkArray[3])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check4dR6(currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[0]=String(Number(checkArray[0])-1);
            checkArray[1]=String(Number(checkArray[1])+1);
            checkArray[2]=String(Number(checkArray[2])-1);
            checkArray[3]=String(Number(checkArray[3])+1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[0]=String(Number(checkArray[0])-1);
                checkArray[1]=String(Number(checkArray[1])+1);
                checkArray[2]=String(Number(checkArray[2])-1);
                checkArray[3]=String(Number(checkArray[3])+1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[0]=String(Number(checkArray[0])-1);
                    checkArray[1]=String(Number(checkArray[1])+1);
                    checkArray[2]=String(Number(checkArray[2])-1);
                    checkArray[3]=String(Number(checkArray[3])+1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }
        function check4dR7(currentElement, warray){
            let checkArray=warray[currentElement].slice();
            checkArray[0]=String(Number(checkArray[0])-1);
            checkArray[1]=String(Number(checkArray[1])+1);
            checkArray[2]=String(Number(checkArray[2])+1);
            checkArray[3]=String(Number(checkArray[3])-1);
            if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                checkArray[0]=String(Number(checkArray[0])-1);
                checkArray[1]=String(Number(checkArray[1])+1);
                checkArray[2]=String(Number(checkArray[2])+1);
                checkArray[3]=String(Number(checkArray[3])-1);
                if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                    checkArray[0]=String(Number(checkArray[0])-1);
                    checkArray[1]=String(Number(checkArray[1])+1);
                    checkArray[2]=String(Number(checkArray[2])+1);
                    checkArray[3]=String(Number(checkArray[3])-1);
                    if (warray.some(subArray => arraysEqual(subArray, checkArray))==true){
                        return true;
                    }
                }
            }
            return false;
        }

        function restart(){
            R.length=0;
            P1.length=0;
            P2.length=0;
            document.querySelector("table").innerHTML='';
            fillR(0);
            generateGrid(parseInt(dimensions[0]),parseInt(dimensions[1]), false, 24,);
            document.querySelectorAll("table button").forEach(f=>{
                f.addEventListener("mouseenter", informUser);
                f.addEventListener("mouseleave", revertColor);
                f.addEventListener("click", updateUserList);
            });
            player='X';
        }

        function checkForRow(player, letter){
            for (let i=0; i<player.length; i++){
                if (check1d(0,i, player)==true || check1d(1,i, player)==true || check1d(2,i, player)==true || check1d(3,i, player)==true){
                    alert(letter+" wins!");
                    restart();
                }
                if (check2d(0, 1,i, player)==true || check2d(0, 2,i, player)==true || check2d(0, 3,i, player)==true || check2d(1, 2,i, player)==true || check2d(1, 3,i, player)==true || check2d(2, 3,i, player)==true){
                    alert(letter+" wins!");
                    restart();
                }
                if (check2dR(0, 1,i, player)==true || check2dR(0, 2,i, player)==true || check2dR(0, 3,i, player)==true || check2dR(1, 2,i, player)==true || check2dR(1, 3,i, player)==true || check2dR(2, 3,i, player)==true){
                    alert(letter+" wins!");
                    restart();
                }
                if (check3d(0, 1, 2, i, player)==true || check3d(0, 1, 3, i, player)==true || check3d(0, 2, 3, i, player)==true || check3d(1, 2, 3, i, player)==true){
                    alert(letter+" wins!");
                    restart();
                }
                if (check3dR1(0, 1, 2, i, player)==true || check3dR1(0, 1, 3, i, player)==true || check3dR1(0, 2, 3, i, player)==true || check3dR1(1, 2, 3, i, player)==true){
                    alert(letter+" wins!");
                    restart();
                }
                if (check3dR2(0, 1, 2, i, player)==true || check3dR2(0, 1, 3, i, player)==true || check3dR2(0, 2, 3, i, player)==true || check3dR2(1, 2, 3, i, player)==true){
                    alert(letter+" wins!");
                    restart();
                }
                if (check3dR3(0, 1, 2, i, player)==true || check3dR3(0, 1, 3, i, player)==true || check3dR3(0, 2, 3, i, player)==true || check3dR3(1, 2, 3, i, player)==true){
                    alert(letter+" wins!");
                    restart();
                }
                if (check4d(i, player)==true || check4dR1(i, player)==true || check4dR2(i, player)==true || check4dR3(i, player)==true || check4dR4(i, player)==true || check4dR5(i, player)==true || check4dR6(i, player)==true || check4dR7(i, player)==true){
                    alert(letter+" wins!");
                    restart();
                }
                if (player.length==313){
                    alert("Draw!");
                    restart();
                }
            }
            return;
        }



        //Control
        let temp=document.querySelector("#dSelector");
        let f=temp.querySelectorAll('button');
        f.forEach(f=>{
            f.addEventListener("click", update);
        });
        generateGrid(parseInt(dimensions[0]),parseInt(dimensions[1]), false, 24,);
        document.querySelectorAll("table button").forEach(f=>{
            f.addEventListener("mouseenter", informUser);
            f.addEventListener("mouseleave", revertColor);
            f.addEventListener("click", updateUserList);
        });

    });
}
main();
