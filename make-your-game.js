//CONSTANTES DU JEU
//CANON
const posCanonTOP = 850
const largeurCanon = 50
const hauteurCanon = 50
let total = 30
let level = 1
let nbr = 0
let nbr2 = 100
let number = 0
let groupAlien
let goal = 0 
let count = 3
let bulletsNumber = 3
let state = false
//Fonction Creation des aliens
function createAliens() {
    var style = document.createElement('style')
            document.head.appendChild(style)
    groupAlien = document.createElement('div')
    groupAlien.setAttribute("id", "group")
    groupAlien.style.width = 740 +'px'
    groupAlien.style.height = 420 + 'px'
        groupAlien.style.left = nbr + 'px'
    groupAlien.style.top = nbr2 + 'px'
        for (let i=0; i<total; i++) {
        const alien = document.createElement('div')
        alien.setAttribute("id", i)
        alien.classList.add("alien")
        groupAlien.appendChild(alien)
        alien.style.left = 50*(i%(total/5))  +'px'
        alien.style.top = 25*(i-i%(total/5))/5 +'px'
    }
    document.body.append(groupAlien)
}
//fonction creation bullet
function generateBullet() {
    let bullet = document.createElement('div')
    let canon = document.getElementById('canon')
        bullet.setAttribute("id", "bullet")
    bullet.style.left = number + 20 + canon.getBoundingClientRect().x + 'px'
    bullet.style.top =  posCanonTOP -5 + 'px'
    document.body.appendChild(bullet)
}
//fonction creation canon
function caNon() {    
    let canon = document.createElement('div')
    canon.setAttribute("id", "canon")
        canon.style.top = posCanonTOP +'px'
    document.body.appendChild(canon)
    } 
//Initialise les elements du jeu
createAliens()
caNon()

function start() {
    const begin = document.createElement('div')
    begin.setAttribute("id", "start")
    document.body.appendChild(begin)
    begin.innerHTML = "Press on 'S' to start"
    document.addEventListener("keydown", (ev)=>{
        if (ev.key=='s' && state == false) {
            ennemiesBullets()
            state = true; mainloop();
            document.body.removeChild(begin)
        }
    })
}
start()
function timer() {
let timing = document.createElement('div')
timing.setAttribute("id", "timing")
timing.style.left =5*window.innerWidth/16 +'px'
document.body.appendChild(timing)
let timerEl = document.getElementById("timing")
let temps = 0
    setInterval(() => {
        if (state) {
        let minutes = parseInt(temps / 60, 10)
        let secondes = parseInt(temps % 60, 10)
            minutes = minutes < 10 ? "0" + minutes : minutes
        secondes = secondes < 10 ? "0" + secondes : secondes
            timerEl.innerText = `${minutes}:${secondes}`
        temps = temps + 1
        }
    }, 1000)
}
timer()

class KeyManager {
    //Const ->
    static get RightArrow (){ return  'ArrowRight'}
    static get LeftArrow (){ return  'ArrowLeft'}
    static get UpArrow (){ return  'ArrowUp'}
    static get DownArrow (){ return  'ArrowDown'}
    static get Space (){ return  ' '}
    static get Escape (){ return  'Escape'}
    //Key Listener and map save
    static keyMap = new Map
    static keyMapLastState = new Map
    static listenerUp = document.addEventListener('keydown', (k)=>{
        this.keyMap[k.key] = true
    })
    static listenerDown = document.addEventListener('keyup', (k)=>{
        this.keyMap[k.key] = false
    })
    // KeyManager Methode
    static whileKeyDown(key, func) {
        if (this.keyMap[key]) func()
    }
    static whileKeyUp(key, func) {
        if (!this.keyMap[key]) func()
    }
    static onKeyDown(key, func) {
        if (this.keyMap[key] && !this.keyMapLastState[key]) func(); this.keyMapLastState[key] = this.keyMap[key]
    }
    
}
let mov = 'aller'
function moveGroup() {
    if (true) {

        groupAlien.style.left = nbr+'px'
        groupAlien.style.top = nbr2 + 'px'
                    
        if (mov === 'aller'){
            nbr++
        } 
        if (mov === 'retour'){
            nbr--
        }
        let aliens = document.getElementsByClassName('alien')
        for (let i=0; i<aliens.length;i++) {

            if (aliens[i].getBoundingClientRect().left + 40>= window.innerWidth){
                mov = 'retour'
                nbr2 = nbr2 + 30
                break
            }
        }
        if (nbr < 0){
            mov = 'aller'
            nbr2 = nbr2 + 25
        }
    }
}
function moveCanon() {
    let canon = document.getElementById('canon')
    KeyManager.whileKeyDown('ArrowRight', ()=>{
        if (canon.getBoundingClientRect().left<window.innerWidth-50) {

            canon.style.left = canon.getBoundingClientRect().left + 10 + 'px'
        }
    })
    KeyManager.whileKeyDown('ArrowLeft', ()=>{
        if (canon.getBoundingClientRect().left>5) {
            canon.style.left = canon.getBoundingClientRect().left - 10 + 'px'
        }
    })
}
let bl = false
function firing(){
    const bullet = document.getElementById('bullet')
    if (bl) bullet.style.top = bullet.getBoundingClientRect().top - 10 + 'px'
    KeyManager.onKeyDown(' ', ()=>{
        if (bullet === null) {
            generateBullet()    
            bl = true
        }
    })
}

function scoRing() {
    const score = document.createElement('p')
    score.setAttribute("id", "score")
    document.body.appendChild(score)
        document.getElementById('score').innerHTML = "Score : 0" 
}
scoRing()
function liVes() {
    const lives = document.createElement('p')
    lives.setAttribute("id", "lives")
    lives.style.left = window.innerWidth/2 -50 + 'px'
    document.body.appendChild(lives)
    document.getElementById('lives').innerHTML= "Lives :" + count +" left"
}
liVes()

function colliSion() {
    let currentBullet = document.getElementById('bullet')
    if (currentBullet !== null) {
        let bu = currentBullet.getBoundingClientRect()
        let aliens = document.getElementsByClassName('alien')
        for (let i=0; i<aliens.length;i++) {
            let ali = aliens[i].getBoundingClientRect()
                    if (((bu.left >= ali.left && bu.left<= ali.left+40) && (bu.top >= ali.top+30 && bu.top<= ali.top+40))|| 
            ((bu.left+10>=ali.left && bu.left+10<= ali.left+40)&&(bu.top >=ali.top+30 && bu.top<= ali.top+40))) {
                    groupAlien.removeChild(aliens[i])
                    goal += 50 - 10*(i-i%(total/5))/(total/5)
                    document.getElementById('score').innerHTML = "Score : " + goal
                    document.body.removeChild(currentBullet)
                    bl=false
                            } 
            if (currentBullet.getBoundingClientRect().top < 0) {
                    document.body.removeChild(currentBullet)
                    bl=false
                            }
        }

    }
}

function pauSe() {
    
    document.addEventListener("keydown", (ev)=> {
        if (ev.key=='Escape') {
            window.location.reload()
        }
    })
    document.addEventListener("keydown", (ev)=>{
        if (ev.key=='p') {
            if (state) {state = false} else {state = true; requestAnimationFrame(mainloop)}
        }
    })
}
pauSe()
function ennemiesBullets() {
    let aliens = document.getElementsByClassName('alien')
    for (let i=0; i<bulletsNumber; i++) {
                j=Math.floor(Math.random() * aliens.length)
        let shoot = document.createElement('div')
        shoot.setAttribute("id", "shoot"+i)
        shoot.className = "shoot"
        shoot.style.left= aliens[j].getBoundingClientRect().left+'px'
        shoot.style.top= aliens[j].getBoundingClientRect().top+'px'
        document.body.appendChild(shoot)
    }
}

function fireBullets() {
    let j=0
    let canon = document.getElementById('canon')
    let can = canon.getBoundingClientRect()
    for (let i=0; i<bulletsNumber; i++) {
        let bullets = document.getElementById("shoot"+i)
        if (bullets === null) continue
        let bul = bullets.getBoundingClientRect()
        bullets.style.top=bul.top + 7 +'px'
        if (bul.top > window.innerHeight) {
            document.body.removeChild(bullets)
            if (document.getElementsByClassName('shoot').length === 0) ennemiesBullets()
        } else if ((bul.top+4>=can.top && bul.top+4<=can.top+50)&&(bul.left>=can.left && bul.left<=can.left+50)
        || (bul.top+4>=can.top && bul.top+4<=can.top+50)&&(bul.left+4>=can.left && bul.left+4<=can.left+50)) {
            count--
            document.getElementById('lives').innerHTML= "Lives :" + count +" left"
            document.body.removeChild(bullets)
            if (document.getElementsByClassName('shoot').length <= 1) ennemiesBullets()
        }
    }
}
function gameOver() {
    let canon=document.getElementById('canon')
    let can = canon.getBoundingClientRect()
    let aliens = document.getElementsByClassName('alien')
    if (count<=0) {
        state = false
        enDguides()
    }
for (let i=0; i<aliens.length; i++) {
    let ali = aliens[i].getBoundingClientRect()
    if (((can.left >= ali.left && can.left<= ali.left+40) && (can.top >= ali.top && can.top<= ali.top+40))|| 
    ((can.left+10>=ali.left && can.left<= ali.left+40)&&(can.top >= ali.top && can.top<= ali.top+40))) {
        state=false
        enDguides()
    }
}
}
gameOver()
function enDguides() {
    const over = document.createElement('div')
    over.setAttribute('id', 'over')
    over.innerHTML="GAME OVER press on 'R' to restart"
    document.body.appendChild(over)
        document.addEventListener("keydown",(ev) => {
            if (ev.key=='r') {
                window.location.reload()
                state = true
                requestAnimationFrame(mainloop)
            }
    })
}
function vicTory() {
    let aliens = document.getElementsByClassName('alien')
if (aliens.length === 0) {
    state = false
    let victoire = document.createElement('div')
    victoire.setAttribute("id", "victoire")
    document.body.removeChild(groupAlien)
    document.body.appendChild(victoire)
    victoire.innerHTML="YOU WIN Press 'C' to go on or 'Escape' to quit"

    document.addEventListener("keydown", (ev)=> {
        if (ev.key=='c') {
            document.body.removeChild(victoire)
            nbr=0
            nbr2=100
            total += 10
            bulletsNumber += 1
            level += 1
            levels()
            createAliens()
            state=true
            requestAnimationFrame(mainloop)
        }
    })
}
let qit = document.getElementById("quit")
if (qit ==! null) {
    document.getElementById("quit").onclick = function() {
                createAliens()
        state=true
    }
}
}
function levels() {
    const lev = document.createElement('div')
    lev.setAttribute("id", "level")
    lev.style.left = 7*window.innerWidth/10+ "px"
    
    document.body.appendChild(lev)
    document.getElementById("level").innerHTML = "Level: " + level
}
levels()
function mainloop() {
    moveGroup()
    moveCanon()
    firing()
    colliSion()
    fireBullets()
    gameOver()
    vicTory()  
    if (state) {
        window.requestAnimationFrame(mainloop)
    }
}



// KeyManager.onKeyDown('p', ()=>{
    //             if (state) {state = false} else {state = true; requestAnimationFrame(mainloop)}
    // })