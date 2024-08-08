let much_sots=Number($('body > input[type=number]:nth-child(2)')[0].value)
let much_bombs=Number($('body > input[type=number]:nth-child(5)')[0].value)
grider()
$('body > input[type=number]:nth-child(2)').on('change',function(e){
    if (e.target.value>40) {e.target.value=40}
    much_sots=Number(e.target.value)
    if (much_bombs>(much_sots*much_sots)) {$('body > input[type=number]:nth-child(5)')[0].value=(much_sots*much_sots-1)}
    if($('body > input[type=number]:nth-child(5)')[0].value<0){$('body > input[type=number]:nth-child(5)')[0].value=0}
    much_bombs=Number($('body > input[type=number]:nth-child(5)')[0].value)
    grider()
    number_Bombs()
    matrixer()
})

$('body > input[type=number]:nth-child(5)').on('change',function(e){
    if (e.target.value>=(much_sots*much_sots)) e.target.value=(much_sots*much_sots-1)
    much_bombs=Number(e.target.value)
    grider()
    number_Bombs()
    matrixer()
})

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var number_bombs=[]
number_Bombs()
function number_Bombs(){
    number_bombs=[]
    while(number_bombs.length<much_bombs){
    numbr=randomNumber(0,(much_sots*much_sots-1))
    if(!(number_bombs.includes(numbr))){
        number_bombs.push(numbr)
    }}}

function grider(){
    $('.grid').css(`grid-template-columns`,`repeat(${much_sots}, 1fr)`)
    .css(`grid-template-rows`,`repeat(${much_sots}, 1fr)`)
    .html(``)
    for (let i=0;i<(much_sots*much_sots);i++){
        $('.grid').append(`<div class="sota" data-counter=${i}></div>`
        )}
    }
let matrix=[[]]
matrixer()
function matrixer(){
matrix=[[]]
for(let i=0;i<(much_sots*much_sots);i++){
    if((number_bombs.includes(i))){

        matrix[matrix.length-1].push("bomb")}
        else{
        matrix[matrix.length-1].push(i)
    }
        if(!(i==(much_sots*much_sots-1  ))&& (i%much_sots==(much_sots-1))){
            matrix.push([])}
        }
}
document.addEventListener('click',function(e){
    if(!(e.target.dataset.counter)) {return}
    if(number_bombs.includes(Number(e.target.dataset.counter))) {Showbomb();lose()}
    else{Show(e.target), win()}
})
document.addEventListener('contextmenu',function(e){
    if(!(e.target.dataset.counter)) {return}
    e.preventDefault() 
    ToggleDefuse(e.target)
})
function Showbomb(){
    for(let i=0;i<number_bombs.length;i++){
        $(`.sota[data-counter=${number_bombs[i]}]`).addClass('bomb').removeClass('sota')
    }
}
 function lose(){
     $('.grid').append(`<div class="lose">Вы проиграли<br><input type="submit" value="Начать сначала"></div>`)
     $('.lose').fadeOut(0).slideDown(2000)
     $(`input[type=submit]`).on('click',function(){location.reload ()})}
function Show(el){
    let num=Number(el.dataset.counter)
    let pos_x=num%much_sots
    let pos_y=(num-pos_x)/(much_sots)
    let bc=0
    if((pos_y+1)<much_sots){
        if(((pos_x+1)<much_sots)&&matrix[pos_y+1][pos_x+1]=='bomb'){bc++}
        if(((pos_x-1)>=0)&&matrix[pos_y+1][pos_x-1]=='bomb'){bc++}
        if(matrix[pos_y+1][pos_x]=='bomb'){bc++}
    }
    if((pos_y-1)>=0){
        if(((pos_x+1)<much_sots)&&matrix[pos_y-1][pos_x+1]=='bomb'){bc++}
        if(((pos_x-1)>=0)&&matrix[pos_y-1][pos_x-1]=='bomb'){bc++}
        if(matrix[pos_y-1][pos_x]=='bomb'){bc++}
    }
    if(((pos_x+1)<much_sots)&&matrix[pos_y][pos_x+1]=='bomb'){bc++}
    if(((pos_x-1)>=0)&&matrix[pos_y][pos_x-1]=='bomb'){bc++}
    $(el).addClass(`for${bc}`).removeClass(`sota`)
    if(!(bc==0)){$(el).text(bc).css('line-height',`${$(el).height()}px`).css('font-size',`${($(el).height())*2/3}px`)}
     if (bc==0){
        setTimeout(function(){
         if((pos_y+1)<much_sots){
            console.log(num+much_sots+1)
             if(((pos_x+1)<much_sots)){$(`.sota[data-counter=${num+much_sots+1}]`).click()}
             if(((pos_x-1)>=0)){$(`.sota[data-counter=${num+much_sots-1}]`).click()}
             $(`.sota[data-counter=${num+much_sots}]`).click()
         }
         if((pos_y-1)>=0){
            if(((pos_x+1)<much_sots)){$(`.sota[data-counter=${num-much_sots+1}]`).click()}
             if(((pos_x-1)>=0)){$(`.sota[data-counter=${num-much_sots-1}]`).click()}
             $(`.sota[data-counter=${num-much_sots}]`).click()
         }
         if(((pos_x+1)<much_sots)){$(`.sota[data-counter=${num+1}]`).click()}
         if(((pos_x-1)>=0)){$(`.sota[data-counter=${num-1}]`).click()}},20)
         
    }
}
function ToggleDefuse(el){
el.classList.toggle('sota')
el.classList.toggle('defuse')};
function win(){  
     if(($('.for0').length+$('.for1').length+$('.for2').length+$('.for3').length+$('.for4').length+$('.for5').length+$('.for6').length+$('.for7').length+$('.for8').length)==((much_sots*much_sots)-much_bombs))
    {
        $('.grid').append(`<div class="win">Вы выиграли!<br><input type="submit" value="Еще раз"></div>`)
        $('.win').fadeOut(0).slideDown(2000)
        $(`input[type=submit]`).on('click',function(){location.reload ()})}
 }