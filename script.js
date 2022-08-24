
const password = '1234'
let tempPassword = ''
let passwordTries = 0
let lockedStatus = false
let date = new Date()
const hour = date.getHours()
const minute = date.getMinutes()
const day = date.getDate()
const month = date.toLocaleString('default', { month: 'long' });
const dayOfWeek = date.toLocaleString("default", { weekday: "long" })

const deleteButton = document.querySelector('.delete-button')
const numbers = document.querySelectorAll('.password-number')
const enterPassword = document.querySelector('.enter-password')
const hourElement = document.querySelector('.hour')
const dateElement = document.querySelector('.date')
hourElement.innerHTML=`${hour} : ${minute}`
dateElement.innerHTML=`${dayOfWeek}, ${day} ${month}`

numbers.forEach(number=> number.addEventListener('click', (e)=>{
        console.log(passwordTries)
        if(tempPassword.length<4 && !lockedStatus){
            tempPassword+=e.target.innerHTML
            console.log(`the temporary pass is ${tempPassword}`)
            updateDots()
        }
        if (tempPassword.length==4){
            checkValid()
        }
}))

ban = document.querySelector('.ban')

function checkValid() {
    if (tempPassword == password){
        clearPassword()
        openLock()
    }
    else{
        if(!lockedStatus) addShake()
        passwordTries++
    }
    if(passwordTries==3){
        enterPassword.style.display='none'
        lockedStatus = true
        let seconds = 60; 
        renderError()
        let intervalId = setInterval(renderError,1000)
    
         
        function renderError(){
            if(seconds<1){
                clearInterval(intervalId)
                ban.innerHTML='';
                passwordTries = 0
                lockedStatus = false
                clearPassword()
            }
            else
            {
                ban.innerHTML=`You entered the wrong password 3 times. </br> Time-out ${seconds} ${seconds == 1 ? 'second': 'seconds'}`  
            }
        seconds--
    } 
    }
    
}

function clearPassword() {
    tempPassword = ''
    passDots.forEach(dot=>{
        dot.classList.remove('dot-active')
    })
}


function addShake() {
    lockClosed.classList.add('fa-shake')
    setTimeout(() => {
        lockClosed.classList.remove('fa-shake')    
    }, 1000);
}

deleteButton.addEventListener('click', ()=>{
    if(!lockedStatus){
        tempPassword = tempPassword.slice(0,-1)
        console.log(tempPassword)
        updateDots()
    }
})

passDots = document.querySelectorAll('.pass-dots > div')

function updateDots() {
    for (let i=0; i<4; i++) {
        if (i<tempPassword.length) {
            passDots[i].classList.add('dot-active')
        }
        else {
            passDots[i].classList.remove('dot-active')
        }
    }
}

lockOpen = document.querySelector('.fa-lock-open')
lockClosed = document.querySelector('.fa-lock')

function openLock() {
    lockOpen.classList.add('visibility-true')
    lockOpen.classList.remove('visibility-false')
    lockClosed.classList.add('visibility-false')
    lockClosed.classList.remove('visibility-true')
}



