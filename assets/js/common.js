    console.log('common.js ready');

function toggleClass(element, className) {
    element.classList.toggle(className);
}

function autocomplete(element, suggestions) {
    if ((Array.isArray(suggestions) && suggestions.length > 0) && (element instanceof HTMLElement)) {
        console.log('do something');
        const elementId = element.id || 'undefined';
        const datalistId = `${elementId}-suggestions`;
        element.setAttribute("list", datalistId);

        const dataList = document.createElement("datalist");
        dataList.id = datalistId
        suggestions.forEach((value) => {
            const option = document.createElement("option")
            option.value = value
            dataList.appendChild(option)
        });

        element.after(dataList)
    }
}