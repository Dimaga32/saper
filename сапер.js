const SizeInput=$('body > input')[0]
const BombInput=$('body > input')[1]
const max_much_sots=30
let much_sots=Number(SizeInput.value)
let much_bombs=Number(BombInput.value)
let number_bombs=[]
let matrix=[[]]

$(SizeInput).on('change',function(e){
    if (e.target.value>max_much_sots) {e.target.value=max_much_sots}
    much_sots=Number(e.target.value)
    if (much_bombs>(much_sots*much_sots)) {BombInput.value=(much_sots*much_sots-1)}
    if(BombInput.value<0){BombInput.value=0}
    much_bombs=Number(BombInput.value)
    grider()
    number_Bombs()
    matrixer()
})

$(BombInput).on('change',function(e){
    if (e.target.value>=(much_sots*much_sots)) e.target.value=(much_sots*much_sots-1)
    much_bombs=Number(e.target.value)
    grider()
    number_Bombs()
    matrixer()
})

document.addEventListener('click',function(e){
    if(!(e.target.dataset.counter)) {return}
    if(number_bombs.includes(Number(e.target.dataset.counter))) {Showbomb(e.target);lose(e.target)}
    else{Show(e.target), win()}
})

document.addEventListener('contextmenu',function(e){
    if(!(e.target.dataset.counter)) {return}
    e.preventDefault()
    ToggleDefuse(e.target)
})

function grider(){
    $('.grid').css(`grid-template-columns`,`repeat(${much_sots}, 1fr)`)
        .css(`grid-template-rows`,`repeat(${much_sots}, 1fr)`)
        .html(``)
    for (let i=0;i<(much_sots*much_sots);i++){
        $('.grid').append(`<div class="sota" data-counter=${i}></div>`
        )}
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function number_Bombs(){
    number_bombs=[]
    while(number_bombs.length<much_bombs){
    numbr=randomNumber(0,(much_sots*much_sots))
    if(!number_bombs.includes(numbr)){
        number_bombs.push(numbr)
    }}
}

function matrixer(){
matrix=[[]]
for(let i=0;i<(much_sots*much_sots);i++){
    if((number_bombs.includes(i))){

        matrix[matrix.length-1].push("bomb")
    }
    else{
        matrix[matrix.length-1].push(i)
    }
    if(!(i==(much_sots*much_sots-1  )) && (i%much_sots==(much_sots-1))){
            matrix.push([])}
        }
}

function Showbomb(el){
    if(el.classList.contains('defuse')){
        return
    }
    for(let i=0;i<much_bombs;i++){
        $(`.sota[data-counter=${number_bombs[i]}]`).addClass('bomb').removeClass('sota')
    }
}

function lose(el){
    if(el.classList.contains('defuse')){
        return
    }
    $('.grid').append(`<div class="lose">Вы проиграли<br><input type="submit" value="Начать сначала"></div>`)
    $('.lose').fadeOut(0).slideDown(2000)
    $(`input[type=submit]`).on('click',()=>location.reload () )}

function Show(el){
    let num=Number(el.dataset.counter)
    let pos_x=num%much_sots
    let pos_y=(num-pos_x)/(much_sots)
    let bc=0

    if((pos_y+1)<much_sots){
        if(((pos_x+1)<much_sots)&&matrix[pos_y+1][pos_x+1]=='bomb')
            bc++
        if(((pos_x-1)>=0)&&matrix[pos_y+1][pos_x-1]=='bomb')
            bc++
        if(matrix[pos_y+1][pos_x]=='bomb')
            bc++
    }

    if((pos_y-1)>=0){
        if(((pos_x+1)<much_sots)&&matrix[pos_y-1][pos_x+1]=='bomb')
            bc++
        if(((pos_x-1)>=0)&&matrix[pos_y-1][pos_x-1]=='bomb')
            bc++
        if(matrix[pos_y-1][pos_x]=='bomb')
            bc++
    }

    if(((pos_x+1)<much_sots)&&matrix[pos_y][pos_x+1]=='bomb')
        bc++
    if(((pos_x-1)>=0)&&matrix[pos_y][pos_x-1]=='bomb')
        bc++

    $(el).addClass(`for${bc}`).removeClass(`sota`)
    if(!(bc==0)){
        $(el).text(bc)
            .css('line-height',`${$(el).height()}px`)
            .css('font-size',`${($(el).height())*2/3}px`)
    }
    if (bc==0){
        setTimeout(function(){
            if((pos_y+1)<much_sots){
                if(((pos_x+1)<much_sots)){
                    $(`.sota[data-counter=${num+much_sots+1}]`).click()
                }
                if(((pos_x-1)>=0)){
                    $(`.sota[data-counter=${num+much_sots-1}]`).click()
                }
                $(`.sota[data-counter=${num+much_sots}]`).click()
            }
            if((pos_y-1)>=0){
                if(((pos_x+1)<much_sots)){
                    $(`.sota[data-counter=${num-much_sots+1}]`).click()
                }
                if(((pos_x-1)>=0)){
                    $(`.sota[data-counter=${num-much_sots-1}]`).click()
                }
                $(`.sota[data-counter=${num-much_sots}]`).click()
            }
            if(((pos_x+1)<much_sots)){
                $(`.sota[data-counter=${num+1}]`).click()
            }
            if(((pos_x-1)>=0)){
                $(`.sota[data-counter=${num-1}]`).click()}
            },20)

    }
}

function ToggleDefuse(el){
    if(el.classList.contains('sota')||el.classList.contains('defuse')){
    el.classList.toggle('sota')
    el.classList.toggle('defuse')
    }
    else return
}

function win(){
    if(($('.for0').length+$('.for1').length+$('.for2').length+$('.for3').length+$('.for4').length+$('.for5').length+$('.for6').length+$('.for7').length+$('.for8').length)==((much_sots*much_sots)-much_bombs))
    {
        $('.grid').append(`<div class="win">Вы выиграли!<br><input type="submit" value="Еще раз"></div>`)
        $('.win').fadeOut(0).slideDown(2000)
        $(`input[type=submit]`).on('click',function(){location.reload ()})}
}

grider()
number_Bombs()
matrixer()

