export const select = {
  templateOf:{
    properties: '#template-properties',
    cities: '#template-cities',
    district: '#template-district',
  },
 
  containerOf: {
    properties: '.property',
    cities: '.city',
    district: '.district',
    products: '#offers',
    home: '#home-wrapper', 
    mainTitle:'.main-title',
    pages: '#pages',
    carousel: '.main-carousel'
  }, 

  classNames:{
    active: 'active'
  },
  attribute: {
    href:'href',
  }   
};
export const settings = {
  db:{
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    products: 'products'
  }
};

export const template = {
  properties: Handlebars.compile(document.querySelector(select.templateOf.properties).innerHTML),
  cities: Handlebars.compile(document.querySelector(select.templateOf.cities).innerHTML),
  district: Handlebars.compile(document.querySelector(select.templateOf.district).innerHTML),
};