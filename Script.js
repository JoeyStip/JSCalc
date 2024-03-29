$(document).ready(function(){
  //  $("button").addClass("animated bounce")
})

let expression = 1
let presscounter = 0
let LastPressed = ""

$("button").click(function(){  
    if(presscounter<1){
        Topdisplay = "0"
        Botdisplay = "0"
    }
    if(parseInt($(this).text())){
    } else {
        Topdisplay = Topdisplay.slice(0,-1)
        Botdisplay = Botdisplay.slice(0, -1)
    }

    LastPressed = $(this).text()
    
    switch($(this).attr('id')){
        case "clear":
            Topdisplay = "0"
            Botdisplay = "0"
            expression = 0
            presscounter = 0
            LastPressed = ""
            break
        case "divide":
            if(presscounter < 1){
                expression = 1
            }
            expression /= parseInt(Topdisplay)
            Topdisplay = ""
            Botdisplay += " / "
            presscounter += 1;
            //console.log(expression)
            break
        case "multiply":
            if(presscounter < 1){
                expression = 1
            }
            expression *= parseInt(Topdisplay)
            Topdisplay = ""
            Botdisplay += " * "
            presscounter += 1;
            //console.log(expression)
            break
        case "subtract":
            expression -= parseInt(Topdisplay) 
            Topdisplay = ""
            Botdisplay += " - "
            presscounter += 1;
            //console.log(expression)
            break
        case "add":
            expression += parseInt(Topdisplay) 
            Topdisplay = ""
            Botdisplay += " + "
            presscounter += 1;
            //console.log(expression)
            break
        case "equals":
            Topdisplay = Math.round(eval(Botdisplay)*10000)/10000            
            Botdisplay = Botdisplay + " = " + Math.round(eval(Botdisplay)*10000)/10000
            expression = 1
            presscounter = 0
            break
    }
    function addCommas(n, x){
        let reg = /\B(?=(\d{3})+(?!\d))/g
        return n.toString().replace(reg, " ")
    }

    if($(this).parent().attr('id')=="Numbers"){
        
        //replaces the zero display with your button press
        if(Topdisplay.indexOf("0")==0){
            Topdisplay = ""
            Botdisplay = ""
        }
        //if no decimal, proceed
        if(Topdisplay.indexOf(".")<0){
                presscounter += 1;
                LastPressed = $(this).text()
                Topdisplay += $(this).text()
                Botdisplay += $(this).text()
        //prevents more than one decimals being entered
        }else if($(this).text()=="."){
        } else {
            presscounter += 1;
            LastPressed = $(this).text()
            Topdisplay += $(this).text()
            Botdisplay += $(this).text()
        }
    };

    $("#display").text(addCommas(Topdisplay, 1));
    $("#secondLine").text(addCommas(Botdisplay, 0));
})