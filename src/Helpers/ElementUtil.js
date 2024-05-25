const createElementWithClasses = (tag, classes, attributes = {}) => {
    const element = document.createElement(tag);
    element.className = classes;
    Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
    });
    return element;
};

const createButton = (id, text, classes) => {
    const button = createElementWithClasses('button', classes, { id });
    button.textContent = text;
    return button;
};

const createSelect = (id, options, classes) => {
    const select = createElementWithClasses('select', classes, { id });
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        select.appendChild(optionElement);
    });
    return select;
};

export { createElementWithClasses, createButton, createSelect };
