function eval() {
    // Do not use eval!!!
    return;
}

Array.prototype.last = function() {
    return this[this.length - 1];
}


function expressionCalculator(expr) {
    if(expr.length==3){
        //console.log(expr[0]);
        let result=parseFloat(calculate(expr[2],expr[0],expr[1]));
        //console.log(result);
        return result;
    }
    let initialExpr=expr.trim().split(" ");
    let mathStack=[];
    let numbersStack=[];
    console.log(expr);
    for(let i = 0; i < initialExpr.length; i++){
        if(initialExpr[i]==""){
            i--;
            initialExpr.splice (i,1);
        }
        else if(Number(initialExpr[i])>= 0){
             numbersStack.push(initialExpr[i]);
            }
        else if(priority(initialExpr[i]) > priority(mathStack.last())){
                mathStack.push(initialExpr[i]);
                }else   if(mathStack.last()== '('){
                    if(initialExpr[i] == ')'){
                        mathStack.pop();
                    }else{
                    mathStack.push(initialExpr[i]);
                    }
                }else if(initialExpr[i] == ')'){
                    numbersStack.push(calculate(numbersStack.pop(), numbersStack.pop(), mathStack.pop()));
                    i--;
                }else if(mathStack.length == 0){
                    mathStack.push(initialExpr[i]);}
                else if(initialExpr[i] == '('){''
                    mathStack.push(initialExpr[i]);
                }else {
                    let first_number=numbersStack.pop();
                    let second_number=numbersStack.pop();
                    let math_symbol=mathStack.pop();
                    numbersStack.push(calculate(first_number, second_number, math_symbol));
                    i--;
                }
        }
    console.log(numbersStack);
    console.log(mathStack);
    if(numbersStack.length > 1){
        for(let j = 0; j < numbersStack.length; j++){
            let first_number=numbersStack.pop();
            let second_number=numbersStack.pop();
            let math_symbol=mathStack.pop();
            numbersStack.push(calculate(first_number, second_number, math_symbol));
            
        }
    }
    console.log(numbersStack.last());
    console.log(numbersStack);
    if(isNaN(numbersStack.last())){
        throw new Error("ExpressionError: Brackets must be paired");
    }
    if(numbersStack.length == 1){

        return parseFloat(numbersStack.last());}
    else{
        throw new Error("ExpressionError: Brackets must be paired");
    }
}
    function calculate(first, second, mathSymbol){
   switch(mathSymbol){
       case '+': 
           return (Number(first)+Number(second));
       case '-':
           return second-first;
       case '*':
           return first*second;
       case '/':{
           if(first==0){
              throw new Error('TypeError: Division by zero.');
           }
           return second/first;}
       }
   }

 function priority(mathSymbol){
    switch(mathSymbol){
        case '+': 
            return 1;
        case '-':
            return 1;
        case '*':
            return 2;
        case '/':
            return 2;
        }
    }

//expressionCalculator(' 20 - 57 * 12 - (  58 + 84 * 32 / 27  )');







module.exports = {
    expressionCalculator
}

