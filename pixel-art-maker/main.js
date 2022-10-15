const container = document.querySelector('.container')
const sizeElWidth = document.querySelector('#sizeWidth')
const sizeElHeight = document.querySelector('#sizeHeight')
let sizeWidth = sizeElWidth.value
let sizeHeight = sizeElHeight.value
const color = document.querySelector('#color')
const resetBtn = document.querySelector('#btnReset')
const convertToShadowBtn = document.querySelector('#btnConvertToShadow')
const shadowToPixelBtn = document.querySelector('#btnShadowToPixel')
const generateText = document.querySelector('#generateText')
const manipulatedFactorInput = document.querySelector('#manipulatedFactor')

let draw = false
const defaultColor = '#3D3D3DFF'
let manipulatedFactor = parseInt(manipulatedFactorInput.value);
function populate(sizeWidth, sizeHeight) {
  container.style.setProperty('--sizeWidth', sizeWidth)
  container.style.setProperty('--sizeHeight', sizeHeight)
    for (let i = 0; i < sizeHeight; i++) {
        for (let k = 0; k < sizeWidth; k++) {
            const div = document.createElement('div')
            div.classList.add('pixel')
            div.dataset.axisX = '' + k;
            div.dataset.axisY = '' + i;
            div.addEventListener('mouseover', function(e){
                if(!draw) return
                drawPixel(div, e.ctrlKey);
            })
            div.addEventListener('mousedown', function(e){
                drawPixel(div, e.ctrlKey);
            })
            container.appendChild(div)
        }
    }
}

function drawPixel(element, isCtrlKey) {
    element.style.backgroundColor = color.value
    if(isCtrlKey) {
        element.style.backgroundColor = defaultColor
    }
}

window.addEventListener("mousedown", function(){
    draw = true
})
window.addEventListener("mouseup", function(){
    draw = false
})

function reset(){
    container.innerHTML = ''
    populate(sizeWidth, sizeHeight)
}

resetBtn.addEventListener('click', reset)

sizeElWidth.addEventListener('keyup', function(){
    sizeWidth = sizeElWidth.value
    reset()
})

sizeElHeight.addEventListener('keyup', function(){
    sizeHeight = sizeElHeight.value
    reset()
})

manipulatedFactorInput.addEventListener('keyup', function(){
    manipulatedFactor = parseInt(manipulatedFactorInput.value);
})

convertToShadowBtn.addEventListener('click', function () {
    let shadow = [];

    for (let i = 0; i < sizeElWidth.value; i++) {
        for (let k = 0; k < sizeElHeight.value; k++) {
            const div = document.querySelector(`[data-axis-x="${k}"][data-axis-y="${i}"]`);

            if (div === null) {
                continue;
            }

            let color = div.style.backgroundColor;

            if (color === defaultColor || color === '') {
                continue;
            }

            shadow.push((k*manipulatedFactor) + 'px ' + (i*manipulatedFactor) + 'px 0 ' + color);
        }
    }
    shadow = shadow.join(', ');
    generateText.value = shadow;
})

shadowToPixelBtn.addEventListener('click', function() {
    let shadowValue = generateText.value;
    let shadowArray = shadowValue.split(', ');
    console.log(shadowArray);
    for (let i = 0; i < shadowArray.length; i++) {
        let shadow = shadowArray[i];
        console.log(shadow);
        let pixelArray = shadow.split(' ');

        if (pixelArray.length < 3) {
            continue;
        }

        let axisX = parseInt(pixelArray[0])/manipulatedFactor;
        let axisY = parseInt(pixelArray[1])/manipulatedFactor;
        console.log(axisX);
        console.log(axisY)
        console.log(manipulatedFactor)
        const div = document.querySelector(`[data-axis-x="${axisX}"][data-axis-y="${axisY}"]`);

        if (div === null) {
            continue;
        }

        div.style.backgroundColor = pixelArray.length === 2 ? pixelArray[2] : pixelArray[3];
        console.log(pixelArray);
        console.log(div);
    }
});

populate(sizeWidth, sizeHeight)