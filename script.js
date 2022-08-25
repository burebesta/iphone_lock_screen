console.log('Password is 1234')
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
hourElement.innerHTML=`${hour} : ${minute.toString().length == 2 ? minute : `0${minute}`}`
dateElement.innerHTML=`${dayOfWeek}, ${day} ${month}`

numbers.forEach(number=> number.addEventListener('click', (e)=>{
        if(tempPassword.length<4 && !lockedStatus){
            tempPassword+=e.target.innerHTML
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
    clearPassword()
    setTimeout(() => {
        lockClosed.classList.remove('fa-shake')    
    }, 1000);
}

deleteButton.addEventListener('click', ()=>{
    if(!lockedStatus){
        tempPassword = tempPassword.slice(0,-1)
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
    setTimeout(openPhone, 1000)
}
body = document.querySelector('body')
function openPhone() {
    container.classList.add('hidden')
    const container2 = document.createElement('div')
    container2.classList.add('container')
    container2.classList.add('hidden')
    appendContainer()
    function appendContainer(){
        container.classList.add('none')
        body.appendChild(container2)
        container2.classList.remove('hidden')  
        container2.innerHTML=`
        <div class="top-area">
            <div class="top-screen">
                <span>Orange</span>
                <div>
                    <i class="fa-solid fa-signal"></i>
                    <i class="fa-solid fa-wifi"></i>
                    <i class="fa-solid fa-battery-full"></i>
                </div>
            </div>
            <div class='menu'>
                <div class='menu-icon'><a href='https://github.com/decebrolus' target='_blank'><i class="fa-brands fa-github"></i></a></div>
                <div class='menu-icon'><a href='https://www.linkedin.com/in/calin-oglinda-990524240/' target='_blank'><i class="fa-brands fa-linkedin"></i></a></div>
            </div>
        </div>
        `  
    }
}

const container = document.querySelector('.container')