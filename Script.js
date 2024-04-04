let LastPressedID =  ""
let display = ""
let subDisplay = ""

$("button").click(function(){  
    let LastPressed = $(this).text()
    let currentPressID = $(this).attr('id')
    let parentID = $(this).parent().attr('id')
    
    function ChangeOperator(){
        if (/(\s\W\s){2}$/.test(subDisplay)){
            subDisplay = subDisplay.replace(/(\s\W\s){2}$/,"")
        } else {
            subDisplay = subDisplay.replace(/\s\W\s/, "")
        }
    }
    
    switch(parentID){
        case "Functions":
            switch(currentPressID){
                case LastPressedID:
                    break
                case "clear":
                    display = "0"
                    subDisplay = "0"
                    LastPressed = ""
                    break
                case "divide":
                    if(/\W\s$/.test(subDisplay)){
                        ChangeOperator();
                    } 
                    if(/=/.test(subDisplay)){
                        subDisplay = subDisplay.match(/(?=\=).+$/g)[0].slice(2)
                    }  
                    display = ""
                    subDisplay += " / "
                    break
                case "multiply":
                    if(/\W\s$/.test(subDisplay)){
                        ChangeOperator();
                    }
                    if(/=/.test(subDisplay)){
                        subDisplay = subDisplay.match(/(?=\=).+$/g)[0].slice(2)
                    } 
                    display = ""
                    subDisplay += " * "
                    break
                case "subtract":
                    if(/=/.test(subDisplay)){
                        subDisplay = subDisplay.match(/(?=\=).+$/g)[0].slice(2)
                    } 
                    display = ""
                    subDisplay += " - "
                    break
                case "add":
                    if(/\W\s$/.test(subDisplay)){
                        ChangeOperator();
                    }
                    if(/=/.test(subDisplay)){
                        subDisplay = subDisplay.match(/(?=\=).+$/g)[0].slice(2)
                    } 
                    display = ""
                    subDisplay += " + "
                    break
                case "equals":
                    display = Math.round(eval(subDisplay)*10000)/10000  
                    subDisplay = subDisplay + " = " + display
                    break
                }
            break
        case "Numbers": 
            //replaces initial zero display with your button press
            if(/^0/.test(display)){
                display = ""
                subDisplay = ""
            }
            //makes sure only one decimal present in display 
            if(LastPressed=="."){
                if(!/\./.test(display)){//if no decimal, proceed
                    display += LastPressed
                    subDisplay += LastPressed
                }
            } else {
                display += LastPressed
                subDisplay += LastPressed
            }
            break
    }

    LastPressedID = $(this).attr('id')
    
    function addCommas(n){
        let parts = n.toString().split(" ")
        let callBack=(x)=>{
            if(/\./.test(x)){
                return x.toString().replace(/\B(?=(\d{3})+(?=\.))/g,",")
            } else {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
            }
        }
        if(parts.length>1){
            return parts.map(callBack).join(" ")
        } else {
            return parts.map(callBack)
        }
    }

    $("#display").text(addCommas(display));
    $("#subDisplay").text(addCommas(subDisplay));
})