const utils = {}; // eslint-disable-line no-unused-vars

utils.createDOMFromHTML = function(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

utils.generateElement = function(thisApp, keyName, className, uniqueArray, templateFn, containerSelector) {
  let value = uniqueArray.length + 1;

  for (const product of thisApp.data.products) {
    const keyValue = product[keyName];

    if (!uniqueArray.includes(keyValue)) {
      uniqueArray.push(keyValue);

      const generatedHtml = templateFn({[keyName]: keyValue, value: value});
      value++;

      const element = utils.createDOMFromHTML(generatedHtml);
      const container = document.querySelector(containerSelector);
      element.classList.add(className);
      container.appendChild(element);
    }
  }
};


export default utils;