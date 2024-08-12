
function createRGBSpectrumDivs() {
    // Crea un contenitore con display: flex e flex-direction: column
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.width = '30px';  // Imposta la larghezza del contenitore
    document.body.appendChild(container);
    
    let red = 255, green = 0, blue = 0;

    for (let i = 0; i < 1530; i++) {
        const div = document.createElement('div');
        div.style.width = '30px';  // Larghezza dei div
        div.style.height = '5px';  // Altezza dei div
        div.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

        // Aggiungi il div al contenitore
        container.appendChild(div);

        // Cambia il colore per il prossimo div
        if (red === 255 && green < 255 && blue === 0) {
            green++;
        } else if (red > 0 && green === 255 && blue === 0) {
            red--;
        } else if (red === 0 && green === 255 && blue < 255) {
            blue++;
        } else if (red === 0 && green > 0 && blue === 255) {
            green--;
        } else if (red < 255 && green === 0 && blue === 255) {
            red++;
        } else if (red === 255 && green === 0 && blue > 0) {
            blue--;
        }
    }
}

// Chiamata della funzione
createRGBSpectrumDivs();
