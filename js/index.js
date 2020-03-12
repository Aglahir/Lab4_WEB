// Aglahir Jiménez Flórez. A01364026

var inputNumber = document.getElementById("inputNumber");
var resetButton = document.getElementById("resetButton");
var equalButton = document.getElementById("equalButton");
var addButton = document.getElementById("addButton");
var substractButton = document.getElementById("substractButton");
var multiplicationButton = document.getElementById("multiplicationButton");
var divisionButton = document.getElementById("divisionButton");
var resultValue = document.getElementById("resultValue");
var logInformation = document.getElementById("logInformation");

var operationText = "";
var queueOperations = [];
inputNumber.value = 0;

function log(text)
{
  logInformation.innerHTML += text + "\n";
}

function pushCurrentValue()
{
  if(inputNumber.value == "")
    queueOperations.push(0);
  else
    queueOperations.push(Number(inputNumber.value));
}

function reset()
{
  queueOperations = [];
  inputNumber.value = "0";
  resultValue.value = "";
}

function equal()
{
  pushCurrentValue();
  
  // Two approaches:
  // 1. The correct one by implementing my own operation handler, 
  //    which doesnt take in count operators priority
  
  /*
  if(queueOperations.length >= 1 && !Number.isNaN(Number(queueOperations[0])))
  {
    var result = queueOperations[0];
    for(var i = 2; i < queueOperations.length; i+=2)
    {
      if(Number.isNaN(Number(queueOperations[i])))
      {
        log("Error! Please make a proper operation");
        reset();
        return ;
      }
      else
      {
        switch(queueOperations[i-1]){
          case "+":
            result += queueOperations[i];
            break;
          case "-":
            result -= queueOperations[i];
            break;
          case "*":
            result *= queueOperations[i];
            break;
          case "/":
            result /= queueOperations[i];
            break;
          default:
            log("Error! Please make a proper operation");
        }
      }
    }
    resultValue.value = result;
    log(queueOperations.join(' ') + " = " + result);
  }
  else
  {
    log("Please make some operations before");
  }
  
  */
  
  // 2. By making sure input is not dangerous, and let javascript
  //    to evaluate the whole operation with operator priority
  //    (easier implementation)
  if(queueOperations.length >= 1)
  {
    // states: number(0), operator(1)
    var state = 0;
    for(var i = 0; i < queueOperations.length; i++)
    {
      if(
        (state!=(state=1) && !Number.isNaN(Number(queueOperations[i])))
        ||
        (state!=(state=0) && (
          queueOperations[i] == "+" ||
          queueOperations[i] == "-" ||
          queueOperations[i] == "*" ||
          queueOperations[i] == "/"
         )
        )
      )
      {
        continue ; // Yes, just keep it going...
      }
      else
      {
        // Otherwise reset
        log("Error! Please make a proper operation");
        reset();
        return ;
      }
    }
    // If operation is not dangerous, evalate it
    var operation = queueOperations.join(' ');
    result = eval(operation);
    resultValue.value = result;
    log(operation + " = " + result);
  }
  else
  {
    log("Please make some operations before");
  }
  
  reset();
}

function newOperation(operator)
{
  pushCurrentValue();
  queueOperations.push(operator);
  inputNumber.value = "0";
}

function sum()
{
  newOperation("+");
}

function substract()
{
  newOperation("-");
}

function multiply()
{
  newOperation("*");
}

function divide()
{
  newOperation("/");
}

resetButton.addEventListener("click",reset);
equalButton.addEventListener("click",equal);
addButton.addEventListener("click",sum);
substractButton.addEventListener("click",substract);
multiplicationButton.addEventListener("click",multiply);
divisionButton.addEventListener("click",divide);