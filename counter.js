const countersObject={};
const tenminits = document.querySelector('.tenminits');
const minits = document.querySelector('.minits');
const tenseconds = document.querySelector('.tenseconds');
const seconds = document.querySelector('.seconds');
function startCounter(){
    Object.values(document.querySelectorAll('.card')).map((node)=>node.removeEventListener('click',startCounter));
    countersObject[`${tenminits.className} timer`] = incrementCounter(tenminits,6,1000*10*60);
    countersObject[`${minits.className} timer`] = incrementCounter(minits,10,1000*60);
    countersObject[`${tenseconds.className} timer`] = incrementCounter(tenseconds,6,1000*10);
    countersObject[`${seconds.className} timer`] = incrementCounter(seconds,10,1000);
    //console.log(countersObject);
}
function incrementCounter(node,max,interval){
    const id = setInterval(()=>{node.textContent = String((parseInt(node.textContent)+1)%max)},interval);
    //console.log(id);
    return (id);
}
function stopIncrement(node){
    const id = countersObject[`${node.className} timer`];
    //console.log(id);
    clearInterval(id);
}
function stopCounter(){
    //console.log(countersObject);
    //console.log(Object.values(document.querySelectorAll('.tenminits .minits .tenseconds .seconds')));
    Object.values(document.querySelectorAll('.tenminits, .minits, .tenseconds, .seconds')).map((node)=>stopIncrement(node));
    //console.log(document.querySelectorAll('.tenminits .minits .tenseconds .seconds'));
    //console.log(countersObject);
}
function resetCounter(){
    tenminits.textContent = 0;
    minits.textContent = 0;
    tenseconds.textContent = 0;
    seconds.textContent = 0;
}
