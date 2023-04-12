import { settings, template, select } from './settings.js';
import utils from './utils.js';

const app  = {
  initPages: function() {     /* uruchamiana w momencie odswiezenia strony*/
    const thisApp = this;
    thisApp.pages = document.querySelector('#pages').children; /* kontenery podstron */
  
    thisApp.navLinks = document.querySelectorAll('.nav-link'); /* wszystkie linki prowadzace do  podstron*/
    

    const idFromHash = window.location.hash.replace('#/', '');      /* z url strony wydobywamy id podstrony ktora ma byc otwarta jako domyslna */

    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id==idFromHash){          /* sprawdzamy czy ktoras z podstron pasuje do idFromHash,  */
        pageMatchingHash = page.id;     /* jesli nie to wyswietlamy domyslna strone - czyli pierwsza [0] */
        break;                          /* jesli pasuje to przypisujemy jej id jako domyslna strone */
      }
    }
    thisApp.activatePage(pageMatchingHash);   /* aktywujemy odpowiednia postrone*/

    for(let navLink of thisApp.navLinks){
      navLink.addEventListener('click', function(event){    /* dodajemy nasluchiwacze do wszystkich linkow od podstron */
        event.preventDefault();
        const clickedElement = this;
        const id = clickedElement.getAttribute('href').replace('#', ''); /*na klikniecie wydobywamy atrubut href kliknietego linka */
        thisApp.activatePage(id);       /*i aktywujemy odpowiednia strone o tym id */

        window.location.hash = '#/' + id;     /* zmieniamy url zeby strona nie przeskakiwala do sekcji z dana podstrona */
      });
    }

  },
  activatePage: function(pageId){
    const thisApp = this;
    for(let page of thisApp.pages){
      if (page.id == pageId){
        page.classList.add('active');
      }
      else{
        page.classList.remove('active');
      }
    }

    for(let link of thisApp.navLinks){
      if (link.getAttribute('href')=='#'+ pageId){
        link.classList.add('active');
        // link.setAttribute('aria-current', 'page');
      }
      else{
        link.classList.remove('active');
        // link.removeAttribute('aria-current');
      }
    }
  
  },
  initData: function() {
    const thisApp = this;
    thisApp.data ={};
    const url = settings.db.url + '/'+ settings.db.products;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.products = parsedResponse;
       
        thisApp.initForm();
      });

  },

  initForm() {
    const thisApp = this;
    const uniqueProperties = [];
    const uniqueCities = [];
    const uniqeDistricts = [];
    // let value = 1;
    utils.generateElement(thisApp, 'property', 'property', uniqueProperties, template.properties, select.containerOf.properties);
    utils.generateElement(thisApp, 'city', 'city', uniqueCities, template.cities, select.containerOf.cities);
    utils.generateElement(thisApp, 'district', 'district', uniqeDistricts, template.district, select.containerOf.district);

 
    // for (const product of thisApp.data.products) {
    //   const properties = product.property;
      
    //   if (!uniqueProperties.includes(properties)) {
    //     uniqueProperties.push(properties);
        
    //     const generatedHtml = template.properties({property: properties, value: value});
    //     value++;
        
    //     const propertiesElement = utils.createDOMFromHTML(generatedHtml);
    //     const propertiesContainer = document.querySelector(select.containerOf.properties);
    //     propertiesContainer.appendChild(propertiesElement);
    //   }
    // }

    // for (const product of thisApp.data.products) {
    //   const cities = product.city;
      
    //   if (!uniqueCities.includes(cities)) {
    //     uniqueCities.push(cities);
        
    //     const generatedHtml = template.cities({city: cities, value: value});
    //     value++;
        
    //     const citiesElement = utils.createDOMFromHTML(generatedHtml);
    //     const citiesContainer = document.querySelector(select.containerOf.cities);
    //     citiesContainer.appendChild(citiesElement);
    //   }
    // }

    // for (const product of thisApp.data.products) {
    //   const district = product.district;
      
    //   if (!uniqeDistricts.includes(district)) {
    //     uniqeDistricts.push(district);
        
    //     const generatedHtml = template.district({district: district, value: value});
    //     value++;
        
    //     const districtElement = utils.createDOMFromHTML(generatedHtml);
    //     const districtContainer = document.querySelector(select.containerOf.district);
    //     districtContainer.appendChild(districtElement);
    //   }
    // }

  },
  
  init: function(){
    const thisApp = this;
    thisApp.initData();
    thisApp.initPages();
    
  } 
};

app.init();