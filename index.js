class Select {
  constructor() {
    this.select = null;
    this.label = null;
    this.url = null;
    this.labels = [];

    let defaults = {
      select: 'some element',
      label: 'label',
      url: 'url',
      labelArr: []
    }
    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = this.extendDefaults(defaults, arguments[0]);
    }
  }

  // Utility method to extend defaults with user options
  extendDefaults(source, properties) {
    let property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }
  // run plagin
  run() {
    this.requestData();
    this.buildSelect();
  }

  // init
  requestData() {
    let self = this;
    let request = new XMLHttpRequest();
    request.open('GET', this.options.url);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
      let data = request.response;
      let selectHtml = document.querySelector(self.options.select);
      let fragment = document.createDocumentFragment();

      for (let item in data) {
        let optionEl = document.createElement('option');
        optionEl.textContent = data[item].label;
        fragment.appendChild(optionEl);
        self.labels.push(data[item].label)
      }
      selectHtml.appendChild(fragment)
    }
    console.log(this.labels)

  }
  // build
  buildSelect() {
    let selectHtml = document.querySelector(this.options.select);
    let fragment = document.createDocumentFragment();

    this.labels.forEach(item => {
      let optionEl = document.createElement('option');
      optionEl.textContent = item;
      fragment.appendChild(optionEl);
    });
    selectHtml.appendChild(fragment)
  }

}

const select = new Select({
  select: '#select',
  label: 'Выберите технологию',
  url: 'https://vladilen-dev.firebaseio.com/technologies.json',
  // onSelect(selectedItem) {}
})

select.run()
