let digitalElement = document.querySelector('.digital');
let sElement = document.querySelector('.p_s')
let mElement = document.querySelector('.p_m')
let hElement = document.querySelector('.p_h')

function updateClock() {
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let second = now.getSeconds();

    digitalElement.innerHTML = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(second).padStart(2, '0')}`

    let sDeg = ((360 / 60) * second) - 90 // Um círculo tem 360 graus, 1 mínuto é 60 segundos, cada segundo pega 6 graus -> 360/60 -> 6
    let mDeg = ((360 / 60) * minutes) - 90 // usamos -90 pois ele começa na horizontal
    let hDeg = ((360 / 60) * hour) - 90

    sElement.style.transform = `rotate(${sDeg}deg)`
    mElement.style.transform = `rotate(${mDeg}deg)`
    hElement.style.transform = `rotate(${hDeg}deg)`
}

setInterval(updateClock, 1000)
updateClock()