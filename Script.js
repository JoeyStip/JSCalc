$(document).ready(function(){
  //  $("button").addClass("animated bounce")
})

let expression = 1
let presscounter = 0
let LastPressed = ""
let currentPressID = ""
let LastPressedID =  ""
let parentID = ""

$("button").click(function(){  
    LastPressed = $(this).text()
    currentPressID = $(this).attr('id')
    parentID = $(this).parent().attr('id')

    if(presscounter<1){
        Topdisplay = "0"
        Botdisplay = "0" 
    }
    
    function ChangeOperator(){
        if ((Botdisplay[Botdisplay.length-2] == "-")){
            if(!parseInt(Botdisplay[Botdisplay.length-5])){
                Botdisplay = Botdisplay.slice(0, Topdisplay.length-4)
            } else{
                Botdisplay = Botdisplay.slice(0, Topdisplay.length-2)
            }
        } else {
            Botdisplay = Botdisplay.slice(0, Topdisplay.length-2)
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
                    expression = 0
                    presscounter = 0
                    LastPressed = ""
                    break
                case "divide":
                    if(!parseInt(Botdisplay[Botdisplay.length-2])){
                        ChangeOperator();
                    }   
                    if(presscounter < 1){
                        expression = 1
                    }
                    expression /= parseInt(Topdisplay)
                    Topdisplay = ""
                    Botdisplay += " / "
                    presscounter += 1;
                    break
                case "multiply":
                    if(!parseInt(Botdisplay[Botdisplay.length-2])){
                        ChangeOperator();
                    }
                    if(presscounter < 1){
                        expression = 1
                    }
                    expression *= parseInt(Topdisplay)
                    Topdisplay = ""
                    Botdisplay += " * "
                    presscounter += 1;
                    break
                case "subtract":
                    if(!parseInt(Botdisplay[Botdisplay.length-2])){
                        ChangeOperator();
                    }
                    expression -= parseInt(Topdisplay) 
                    Topdisplay = ""
                    Botdisplay += " - "
                    presscounter += 1;
                    break
                case "add":
                    if(!parseInt(Botdisplay[Botdisplay.length-2])){
                        ChangeOperator();
                    }
                    expression += parseInt(Topdisplay) 
                    Topdisplay = ""
                    Botdisplay += " + "
                    presscounter += 1;
                    break
                case "equals":
                    Topdisplay = Math.round(eval(Botdisplay)*10000)/10000            
                    Botdisplay = Botdisplay + " = " + Math.round(eval(Botdisplay)*10000)/10000
                    expression = 1
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
                    LastPressed = LastPressed
                    Topdisplay += LastPressed
                    Botdisplay += LastPressed
            }else if($(this).text()=="."){//prevents more than one decimals being entered
            } else {
                presscounter += 1;
                LastPressed = LastPressed
                Topdisplay += LastPressed
                Botdisplay += LastPressed
            }
            break
    }

    LastPressedID = $(this).attr('id')
    
    function addCommas(n, x){
        let reg = /\B(?=(\d{3})+(?!\d))/g
        return n.toString().replace(reg, " ")
    }

    $("#display").text(addCommas(Topdisplay, 1));
    $("#secondLine").text(addCommas(Botdisplay, 0));
})