//Déclaration des variables 
// Nombre 1 est le nombre à gauche de l'opérateur
let number1; 
// Operator est l'opération qui permet de déterminer la fin de saisie du nombre1
let operator;
//  Opérateur unique pour le carré et la racine carré
let singleOperator;
// Nombre 2 est le nombre à droite de l'opérateur
let number2;
// equal sert à valider et calculer le total des deux nombres
let equal;


// fonctionnalité saisie des chiffres
const enterNumber = figure => {
    // vérification si l'utilisateur modifie le premier ou le deuxieme nombre
    if (operator == null) {
        if (number1 == null) {
            number1 = '';
        }
        number1 += figure;
    } else {
        if (number2 == null) {
            number2 = '';
        }
        number2 += figure;
    }
    screenRefresh();
}

// Fonctionnalité saisie des nombres à virgule
function enterDecimal() {
    if (operator == null) {
        if (number1 == null) {
            number1 = '0.';
        } else if (aDecimal(number1) === false) {
            number1 += ".";
        }        
    } else {
        if (number2 == null) {
            number2 = '0.';
        } else if (aDecimal(number2) === false) {
            number2 += '.';
        }       
    }
    screenRefresh();
}

//  Test de la présence d'une virgule dans le nombre
function aDecimal(textNumber) {
    return textNumber.includes('.');
}

// fonctionnalité saisie des operateurs
const enterOperator = sign => {
    // tester que l'opération n'a pas été saisie
    if (operator != null) {
        return;
    }
    operator = sign;
    screenRefresh();
}


//  fonctionnalité calcul du total de l'operation
const calculateTotal = equality => {
    // test de la saisie de valeur et de l'opérateur
        if (number1 == null
            || number2 == null
            || operator == null) {
                return;
            }
        let n1 = Number.parseFloat(number1);
        let n2 = Number.parseFloat(number2);

    //  test pour le egal
    if (equality === '=') {
        switch (operator) {
            case '+':
                equal = ` = ${n1 + n2}`;
                break;
            case '-':
                equal = ` = ${n1 - n2}`;
                break;
            case '/':
                equal = ` = ${n1 / n2}`;
                break;
            case 'x':
                equal = ` = ${n1 * n2}`;
                break;            
        }
    } 
    //  test pour le pourcentage
    if (equality === '%') {
        switch (operator) {
            case '+':
                equal = ` % = ${n1 + (n1 * n2 / 100)}`;
                break;
            case '-':
                equal = ` % = ${n1 - (n1 * n2 / 100)}`;
                break;
            case '/':
                equal = ` % = ${n1 / (n1 * n2 / 100)}`;
                break;
            case 'x':
                equal = ` % = ${n1 * (n1 * n2 / 100)}`;
                break;            
        }
    }
    screenRefresh();
    addLine();
}


//  Fonctionalité de calcul pour carré et racine carré
const singleOperatorCalculation = (symbol) => {
    //  test de la saisie du nombre
    if (number1 == null) {
        return;
    }
    singleOperator = symbol;
    switch (symbol){
        case 'r':
            if (number1 <0) {
                alert("Le nombre calculé est inférieur à zéro");
                return;
            }
            equal = `&radic;${number1} = ${Math.sqrt(number1)}`;
            break;
        case '²':
            equal = `${number1}² = ${number1*number1}`;
            break;            
    }
    screenRefresh();
    addLine2();
}


// Fonctionnalité ajout d'une ligne pour racine carré et carré
const addLine2 = () => {
    // vérifier si le calcul précédent existe
    if (number1 != null && singleOperator != null) {
        // création d'une ligne dans la div history
        const historyDiv = document.getElementById("history");
        const previousCalculation2 = `${equal}<br>`;
        historyDiv.innerHTML += previousCalculation2;
    }
    number1 = null;
    singleOperator = null;
    equal = null;
   
    screenRefresh();
    
}

//  Fonctionnalité ajout d'une ligne
const historyDiv = document.getElementById("history");
const addLine = () => {
    // vérifier si le calcul précédent existe
    if (number1 != null && number2 != null && operator != null && equal != null) {
        // création d'une ligne dans la div history
        const previousCalculation = `${number1} ${operator} ${number2} ${equal}<br>`;
        historyDiv.innerHTML += previousCalculation;
    }
    number1 = null;
    number2 = null;
    operator = null;
    equal = null;
   
    screenRefresh();   
}


//Fonctionnalité  affichage à l'écran
const screenDisplay = document.getElementById("display");
function display(text) {
    const formattedText = text.replace('.', ',');
    screenDisplay.textContent = formattedText;    
}

// fonctionnalité effacer l'ecran

function erased() {
    screenDisplay.textContent= "";
    number1 = null;
    singleOperator = null;
    equal = null;
    number2 = null;
    operator = null;
}

// Fonctionnalité raffraichir l'écran
function screenRefresh() {
    let text = "";
    
    if (number1 == null) {
        display(text);
        return;
    }
    if (singleOperator != null) {
        text += equal;
        equal = equal.replace('.', ',');
    }
    text += number1;
    if (operator == null) {
        display(text);
        return;
    }
    text += ` ${operator} `;

    if (number2 == null) {
        display(text);
        return;
    }
    text += number2;
    

    if (equal == null) {
        display(text);
        return;
    }
    equal = equal.replace('.', ',');
    text += equal;
    
    display(text);    
}


// Fonctionnalités récupération des iDs des boutons
function retrieveIds() {
    const btn = document.getElementsByTagName("button");
    const ids = [];

    for (let i = 0; i < btn.length; i++) {
        ids.push(btn[i].id);
    }
    return ids
}
// Fonctionnalité evenement onclickbutton attribution des chiffres
function onClickButton(event) {
    const idButton = event.target.id;

    switch (idButton) {
        case 'zero':
            enterNumber(0);
            break;
        case 'un':
            enterNumber(1);
            break;
        case 'deux':
            enterNumber(2);
            break;
        case 'trois':
            enterNumber(3);
            break;
        case 'quatre':
            enterNumber(4);
            break;
        case 'cinq':
            enterNumber(5);
            break;
        case 'six':
            enterNumber(6);
            break;
        case 'sept':
            enterNumber(7);
            break;
        case 'huit':
            enterNumber(8);
            break;
        case 'neuf':
            enterNumber(9);
            break;
        case 'plus':
            enterOperator('+');
            break;
        case 'moins':
            enterOperator('-');
            break;
        case 'diviser':
            enterOperator('/');
            break;
        case 'fois':
            enterOperator('x');
            break;
        case 'egal':
            calculateTotal('=');
            break;  
        case 'pourcentage':
            calculateTotal('%');
            break;
        case 'carre':
            singleOperatorCalculation('²');
            break;  
        case 'racine':
            singleOperatorCalculation('r');
            break;
        case 'point':
            enterDecimal();
            break;
        case 'correction':
            erased();
            break;
    }
}

//fonctionnalité écoute des clics des boutons
function addClicksManager() {
    const idsButton = retrieveIds();
    for (const id of idsButton) {
        const button = document.getElementById(id);
        button.addEventListener("click", onClickButton);
    }
}
document.addEventListener("DOMContentLoaded", addClicksManager);


// Fonctionnalité écoute des touches du clavier
document.addEventListener("keypress", (e) => {
    const code = e.key;
    switch (code) {
        case '0':
            enterNumber(0);
            break;
        case '1':
            enterNumber(1);
            break;
        case '2':
            enterNumber(2);
            break;
        case '3':
            enterNumber(3);
            break;
        case '4':
            enterNumber(4);
            break;
        case '5':
            enterNumber(5);
            break;
        case '6':
            enterNumber(6);
            break;
        case '7':
            enterNumber(7);
            break;
        case '8':
            enterNumber(8);
            break;
        case '9':
            enterNumber(9);
            break;
        case '+':
            enterOperator('+');
            break;
        case '-':
            enterOperator('-');
            break;
        case '*':
            enterOperator('x');
            break;
        case '/':
            enterOperator('/');
            break;
        case 'Enter':
            calculateTotal('=');
            break;
        case '%':
            calculateTotal('%');
            break;
        case '²':
            singleOperatorCalculation('²');
            break;
        case ".":
        case ",":
            enterDecimal();
            break;
        case "Backspace":
            erased();
    }
})