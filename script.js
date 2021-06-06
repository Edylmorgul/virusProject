const canvas = document.getElementById("canvas");
const score = document.getElementById("score");
const days = document.getElementById("days");
const endScreen = document.getElementById("endScreen");

daysLeft = 60; //Jours restant
gameOverNumber = 50; // Nombre de virus avant gameover
loopPlay = false; //Problème avec les relances du jeu, les virus repop trop vite par relance

function start(){
    count = 0; // A chaque relance de la fonction, count reviens à 0
    getFaster = 6000; //Pop plus rapide des virus, départ 6secs
    daysRemaining = daysLeft; // A chaque restart, on repart de 60

    canvas.innerHTML = ''; //Vider le canvas
    score.innerHTML = count;
    days.innerHTML = daysRemaining;

    game();

    function game(){
        let randomTime = Math.round(Math.random() * getFaster); // Arrondi + calcul temps aléatoire
        getFaster > 700 ? getFaster = (getFaster * 0.90) : ''; //Rapidité, diminue de 10% mais s'arrête si moins de 700 dixième de secondes sinon injouable

        setTimeout(() =>{
            virusPop();
            game();
        }, randomTime)
    };
}

// Fonction apparition du virus + calcul aléatoire
function virusPop(){
    let virus = new Image();
    virus.src ="./media/basic-pics/pngwave.png";

    virus.classList.add('virus'); //Chaque fois qu'il crée un virus, il va ajouter la classe virus
    virus.style.top = Math.random() * 500 + 'px'; //Calcul coordonnées d'apparition du virus
    virus.style.left = Math.random() * 500 + 'px';

    let x,y;
    x = y = (Math.random() * 45) + 30; // Calcul taille virus, minimum 30 pixels
    virus.style.setProperty('--x', `${x}px`); //Ecrire du javascript dans du html ou du CSS
    virus.style.setProperty('--y', `${y}px`);

    let plusMinus = Math.random() < 0.5 ? -1 : 1 //Si Math.random() est inférieur à 0.5 tu fais -1 sinon 1
    let trX = Math.random() * 500 - plusMinus; // Le résultat sera soit un plus ou un moins
    let trY = Math.random() * 500 - plusMinus;
    virus.style.setProperty('--trX', `${trX}%`);
    virus.style.setProperty('--trY', `${trY}%`);
    canvas.appendChild(virus); //Création de l'enfant virus à canvas
}

// Fonction suppression du virus lors clic utilisateur
document.addEventListener("click", function(e){
    let targetElement = e.target || e.srcElement; // Détermine les éléments ou clic l'utilisateur
    console.log(targetElement) // Aide sur console de commande

    if(targetElement.classList.contains('virus')){
        targetElement.remove();
        count++;
        score.innerHTML = count; //A chaque virus tué ==> Score +1
    };
});