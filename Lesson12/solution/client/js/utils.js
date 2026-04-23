export const output = (text, content = '') => {
    const message = document.createElement('div');
    
    const mainText = document.createElement('p');
    mainText.innerText = text;
    
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.innerText = new Date().toLocaleString('en-GB').replace(',', '') + ' ';
    mainText.prepend(timestamp);
    
    message.append(mainText);

    if (content !== '') {
        const mainContent = document.createElement('p');
        mainContent.classList.add('content');
        if (typeof content === 'object') {
            mainContent.innerText = JSON.stringify(content);
        } else {
            mainContent.innerText = content;
        }
        message.append(mainContent);
    }
    
    document.querySelector('#output').prepend(message);
};