$(document).ready(function(){
  //  $("button").addClass("animated bounce")
})

let Topdisplay = ""
let Botdisplay = ""
let expression = 1
let presscounter = 0

$("button").click(function(){  
    switch($(this).attr('id')){
        case "clear":
            Topdisplay = ""
            Botdisplay = ""
            expression = 0
            presscounter = 0
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

            let exp = Botdisplay.slice().split(" ")
            //console.log(Botdisplay, exp, parseInt("56")?"Y":"N")

            let result = exp.reduce((result, x, ind, arr)=>{
                //console.log("result: " + result, "x: " + parseInt(x), "ind: " + ind, "arr: " + arr)
                if(parseInt(x)){
                    if(ind>0){
                        console.log(result, ind, parseInt(x) + arr[ind-1] + result)
                        return parseInt(x) + arr[ind-1] + result
                        //console.log(result, "test1") 
                    } else {
                        
                        return result + parseInt(x) 
                        //console.log("x: " + x, "result: " + result, "test2")
                    }
                }
            },0)
            console.log(result)
            break
    }

    if($(this).parent().attr('id')=="Numbers"){
        //console.log(Topdisplay.indexOf("."))
        if(Topdisplay.indexOf(".")<0){
            Topdisplay += $(this).text()
            Botdisplay += $(this).text()
            
        }else if($(this).text()=="."){

        } else {
            Topdisplay += $(this).text()
            Botdisplay += $(this).text()
        }
    };

    $("#firstLine").text(Topdisplay);
    $("#secondLine").text(Botdisplay);
    
})