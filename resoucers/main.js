//Inicialización de variables
let discoverCard = 0;
let card1 = null;
let card2 = null;
let firstNumber = null;
let secondNumber = null;
let move = 0;
let hits = 0;
let timer = false;
let time = 0;
let countTimeId = null;

//Apuntadores a documento HTML
let showMove = document.getElementById("move");
let showHits = document.getElementById("hits");
let showTime = document.getElementById("time");

//Generación de números aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(()=>{return Math.random() - 0.5});
console.log(numbers);

//Funciones  
function countTime(){
  countTimeId = setInterval(()=>{
    time++;
    showTime.innerHTML = `Tiempo: <br>${time} segundos`;
    if(time == 60){
      clearInterval(countTimeId);
      swal({
        title: "Oops!",
        text: "Se te acabo el tiempo!",
        icon: "error",
        button: "Ver respuesta",
        closeOnClickOutside: false,
      }).then(okay => {
        if (okay) {
          blockCards();
        }
      });   
    }
  },1000)
}

function blockCards(){
  for (let i = 0; i<=15;i++){
    let blockCard = document.getElementById(i);
    blockCard.innerHTML = numbers[i];
    blockCard.disabled = true;
    if (blockCard.style.backgroundColor == "green"){
      blockCard.style.backgroundColor = "green";
    }else{
      blockCard.style.backgroundColor = "red";
    }
  }
}

function reset(){
  location.reload();
}

//Función principal
function tap(id){

  if(timer == false){
    countTime();
    timer = true;
  }

  discoverCard++;

  if(discoverCard == 1){
    //Mostrar primera carta
    card1 = document.getElementById(id);
    firstNumber = numbers[id];
    card1.innerHTML = firstNumber;

    //Deshabilitar primera carta
    card1.disabled = true;
    card1.style.backgroundColor = "blue";
  }else if(discoverCard == 2) {
    //Mostrar segunda carta
    card2 = document.getElementById(id);
    secondNumber = numbers[id];
    card2.innerHTML = secondNumber;

    //Deshabilitar segunda carta
    card2.disabled = true;
    card2.style.backgroundColor = "blue";

    //Incrementar movimiento
    move++;
    showMove.innerHTML = `Movimientos: ${move}`;

    if(firstNumber == secondNumber){
      //Reiniciar contador
      discoverCard = 0;

      //aumentar aciertos
      hits++;
      showHits.innerHTML = `Aciertos: <br>${hits}/8`;
      card1.style.backgroundColor = "green";
      card2.style.backgroundColor = "green";

      if(hits == 8){
        clearInterval(countTimeId);
        if (time <= 30) {
          showHits.innerHTML = `Has ganado en ${move} movimientos`;
          showTime.innerHTML = `Tardaste ${time} segundos`;
          showMove.innerHTML = `¡Eres muy inteligente!`;
          swal({
            title: "¡Buen trabajo!",
            text: "Lograste completar el juego en menos de 30 segundos",
            icon: "success",
            button: "Ver detalles",
            timer: 3000,
          });
        }else{
          showHits.innerHTML = `Has ganado en ${move} movimientos`;
          showTime.innerHTML = `Tardaste ${time} segundos`;
          showMove.innerHTML = `¡Eres bueno!`;
          swal({
            title: "¡Buen trabajo!",
            text: "Lograste completar el juego",
            icon: "success",
            button: "Ver detalles",
            timer: 3000,
          });
        }
      }
    }else{
      //mostrar momentaneammento y volver a mostrar
      setTimeout(()=>{
        card1.innerHTML = ' ';
        card2.innerHTML = ' ';
        card1.disabled = false;
        card2.disabled = false;
        discoverCard = 0;
        card1.style.backgroundColor = "white";
        card2.style.backgroundColor = "white";
      },350)
    }
  }
}
