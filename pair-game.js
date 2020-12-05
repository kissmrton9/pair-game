const turnFrontTime = getCSSvarValue('--turn-front-duration');
const turnBackTime = getCSSvarValue('--turn-back-duration');
const visible = 400; // how many millisecs are the two cards visible
const delay = 0; // next turn can start after the beginning of turn back animation
let cardNumbersArray;
startGame();

function getCSSvarValue(varName){
    const varValueString = getComputedStyle(document.querySelector(':root')).getPropertyValue(varName);
    return varValueString.includes('ms') ? parseFloat(varValueString) : parseFloat(varValueString)*1000;
}
function startRound(){
    //console.log(Object.values(document.querySelectorAll('.card')));
    //Object.values(document.querySelectorAll('.card')).map(node=>console.log(node));
    Object.values(document.querySelectorAll('.card:not(.found)')).map((node)=>node.addEventListener('click',cardClickHandler));
}
function checkPairs(){
    const turning = document.querySelectorAll('.turning');
    turning[0].className = turning[0].className.replace( /(?:^|\s)turning(?!\S)/g , '' ).replace(/  /g, ' ').replace(/^ /, '');
    turning[1].className = turning[1].className.replace( /(?:^|\s)turning(?!\S)/g , '' ).replace(/  /g, ' ').replace(/^ /, '');
    //console.log(turning);
    if (turning[0].firstChild.alt === turning[1].firstChild.alt){
        turning[0].className += ' found';
        turning[1].className += ' found';
        if (!checkEnd()) setTimeout(startRound,delay);
    }
    else{
        setTimeout(()=>{
        turnBack(turning[0]);
        turnBack(turning[1]);},visible);
        setTimeout(startRound,visible+delay);
    }
    //return turning[0].className
}
function checkEnd(){
    //console.log('checkEnd fut!');
    if (document.querySelectorAll('.card:not(.found)').length>0){
        return false;
    }
    else{
        console.log('Game ended!');
        Object.values(document.querySelectorAll('.card')).map((node)=>{node.className = node.className.replace( /(?:^|\s)found(?!\S)/g , '' )});
        stopCounter();
        setTimeout(startGame,5000);
        return true;
    }
}
function turnBack(card){
    //console.log(card);
    card.className += ' not_a_pair';
    setTimeout(()=>{
        card.firstChild.src = "images/back.jpg";
        card.firstChild.alt = "Back cover of a memory card";
    },turnBackTime/2);
    setTimeout(()=>{
        card.className = card.className.replace( /(?:^|\s)not_a_pair(?!\S)/g , '' ).replace(/  /g, ' ').replace(/^ /, '');
    },turnBackTime);
}
function rand(n){
    const arr=[];
    for (i=0; i<n; i++){
        arr.push([i, Math.random()]);
    //    console.log(arr);
    }
    arr.sort(([,a],[,b]) => a-b)
    // console.log(arr);
    return arr.reduce((a,b) => {a.push(b[0]); return a}, []);
}
function startGame(){
    resetCounter();
    Object.values(document.querySelectorAll('.card')).map((node)=>{turnBack(node);node.addEventListener('click',startCounter)});
    startRound();
    cardNumbersArray = rand(10).map(x=>x%5).map(x=>x===0 ? 5 : x);
    //console.log(cardNumbersArray);
    //return cardNumbersArray;
}
function cardClickHandler(){
    //    console.log(Array.prototype.indexOf.call(this.parentNode.children, this));
    const lineNum = Array.prototype.indexOf.call(this.parentNode.parentNode.children, this.parentNode);
    const cardNum = Array.prototype.indexOf.call(this.parentNode.children, this);
    //console.log(cardNum);
    //console.log(this.className);
    this.className += ' turning';
    // if this is the first turning card remove event listener from the card
    if (document.querySelectorAll('.turning').length === 1){
        //console.log(document.querySelector(`.line:nth-child(${lineNum+1})>.card:nth-child(${cardNum+1})`));
        document.querySelector(`.line:nth-child(${lineNum+1})>.card:nth-child(${cardNum+1})`).removeEventListener('click',cardClickHandler);
    }
    // else remove event listeners from all cards and check if turned cards are pairs
    else {
        Object.values(document.querySelectorAll('.card')).map((node)=>node.removeEventListener('click',cardClickHandler));
        setTimeout(checkPairs,turnFrontTime);
    }
    setTimeout(()=>{
        this.firstChild.src = `images/${cardNumbersArray[5*lineNum+cardNum]}.png`;
        this.firstChild.alt = `Memory card no. ${cardNumbersArray[5*lineNum+cardNum]}`;
    },turnFrontTime/2);
}

