$(document).ready(function(){
  //  $("button").addClass("animated bounce")
})

let presscounter = 0
let LastPressed = ""
let currentPressID = ""
let LastPressedID =  ""
let parentID = ""
let Topdisplay = ""
let Botdisplay = ""

$("button").click(function(){  
    LastPressed = $(this).text()
    currentPressID = $(this).attr('id')
    parentID = $(this).parent().attr('id')

    //if(presscounter<1){
    //    Topdisplay = "0"
    //    Botdisplay = "0" 
    //}
    
    function ChangeOperator(){
        if (/\s\W\s\s\W\s$/.test(Botdisplay)){
            Botdisplay = Botdisplay.replace(/\s\W\s\s\W\s$/,"")
        } else {
            Botdisplay = Botdisplay.slice(0, Topdisplay.length-3)
        }
    }
    
    switch(parentID){
        case "Functions":
            switch(currentPressID){
                case LastPressedID:
                    break
                case "clear":
                    Topdisplay = "0"
                    Botdisplay = "0"
                    presscounter = 0
                    LastPressed = ""
                    break
                case "divide":
                    if(/\W\s$/.test(Botdisplay)){
                        ChangeOperator();
                    } 
                    if(/=/.test(Botdisplay)){
                        Botdisplay = Botdisplay.match(/(?=\=).+$/g)[0].slice(2)
                    }  
                    Topdisplay = ""
                    Botdisplay += " / "
                    presscounter += 1;
                    break
                case "multiply":
                    if(/\W\s$/.test(Botdisplay)){
                        ChangeOperator();
                    }
                    if(/=/.test(Botdisplay)){
                        Botdisplay = Botdisplay.match(/(?=\=).+$/g)[0].slice(2)
                    } 
                    Topdisplay = ""
                    Botdisplay += " * "
                    presscounter += 1;
                    break
                case "subtract":
                    if(/=/.test(Botdisplay)){
                        Botdisplay = Botdisplay.match(/(?=\=).+$/g)[0].slice(2)
                    } 
                    Topdisplay = ""
                    Botdisplay += " - "
                    presscounter += 1;
                    break
                case "add":
                    if(/\W\s$/.test(Botdisplay)){
                        ChangeOperator();
                    }
                    if(/=/.test(Botdisplay)){
                        Botdisplay = Botdisplay.match(/(?=\=).+$/g)[0].slice(2)
                    } 
                    Topdisplay = ""
                    Botdisplay += " + "
                    presscounter += 1;
                    break
                case "equals":
                    Topdisplay = Math.round(eval(Botdisplay)*10000)/10000  
                    Botdisplay = Botdisplay + " = " + Topdisplay
                    presscounter = 0
                    break
                }
            break
        case "Numbers": 
            if(Topdisplay.indexOf("0")==0){ //replaces the zero display with your button press
                Topdisplay = ""
                Botdisplay = ""
            }
            if(Topdisplay.indexOf(".")<0){//if no decimal, proceed
                    presscounter += 1;
                    Topdisplay += LastPressed
                    Botdisplay += LastPressed
            }else if($(this).text()=="."){//prevents more than one decimals being entered
            } else {
                presscounter += 1;
                Topdisplay += LastPressed
                Botdisplay += LastPressed
            }
            break
    }

    LastPressedID = $(this).attr('id')
    
    function addCommas(n, x){
        let reg = /\B(?=(\d{3})+(?!\d))/g
        
        if(/\.\d{3,}/.test(n)){
            let beforeDec = n.toString().match(/.+(?=\.)/)
            let afterDec = n.toString().match(/(?<=\.).+/)
            return beforeDec[0].replace(reg, ",") + "." + afterDec[0]
        } else {
            return n.toString().replace(reg, ",")
        }

        
    }

    $("#display").text(addCommas(Topdisplay, 1));
    $("#secondLine").text(addCommas(Botdisplay, 0));
})