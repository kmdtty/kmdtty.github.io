(function(document) {
  'use strict';
  var model = {
      cat_array:  [{name: "Nyan", image:"cat.jpg", counter:0},
                  {name: "Mya", image:"cat2.jpg", counter:0},
                  {name: "NyanNyan", image:"cat3.jpg", counter:0},
                  {name: "Mia", image:"cat4.jpg", counter:0},
                  {name: "NyanNyanNyan", image:"cat5.jpg", counter:0},
                  {name: "Nyaaaa", image:"cat6.jpg", counter:0},
                  ],
      init: function() {
          if (!localStorage.cat_array) {
              localStorage.cat_array = JSON.stringify(model.cat_array);
          }
      },
      getAllCats: function() {
          return JSON.parse(localStorage.cat_array);
      }
  }

  var octopus = {
    init: function() {
        model.init();
        view.init();
    },
    getCatList: function() {
        return model.getAllCats();
    },
    findCat: function(cat_name) {
        return octopus.getCatList().filter(function(cat) {
            if (cat.name == cat_name) {
                return cat
            }
        })[0]
    }
  }

  var view = {
      init: function() {
          this.cat_select = document.getElementById('cat_select');
          this.cat_display = document.getElementById('cat_display');
          this.cat_select.addEventListener('change', function() {
            var selected_value = this.value
            console.log('selected:' + selected_value);
            var cat = octopus.findCat(selected_value);
            console.log(cat);
            console.log(cat.image);
            view.render(cat);
          });
          view.renderSelection();
          view.render(octopus.getCatList()[0]);
      },
      renderSelection: function() {
         var htmlStr = '';
         console.log(octopus.getCatList());
         console.log(octopus.getCatList()[0]);
         octopus.getCatList().map(function(cat) {
           htmlStr += '<option value="' + cat.name + '">' + cat.name +'</option>';
         });
         console.log(cat_select);
         console.log(htmlStr);
         this.cat_select.innerHTML = htmlStr;
      },
      render: function(cat) {
        var htmlStr = '';
        htmlStr += '<img src="'+ cat.image + '"/><h3>' + cat.counter + '</h3>';
        console.log(this.cat_display);
        console.log(htmlStr);
        this.cat_display.innerHTML = htmlStr;
      }
  }
  octopus.init();
  /*
  var currentElement = document.getElementById('cat_select');

  function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }

  function findCat(cat_name) {
      var found_cat = cat_array.filter(function(cat_dict) {
          if (cat_dict['name'] == cat_name) {
              return cat_dict
          }
      });
      console.log(found_cat);
      return found_cat[0];
  }

  function addSelection() {
    var cat_select = document.getElementById('cat_select');
    cat_array.map(function(cat_dict) {
       var option  = document.createElement('option');
       option.text = cat_dict['name'];
       option.value = cat_dict['name']
       cat_select.add(option);
    });
    cat_select.addEventListener('change', function() {
       var selected_value = this.value
       console.log('selected:' + selected_value);
       if (document.getElementById(selected_value) == null) {
          var cat = findCat(selected_value);
          console.log(cat['image']);
          addCat(cat['name'], cat['image'], this.value);
       }
       document.getElementById(selected_value).style.display  = "block";
       cat_array.map(function(cat_dict) {
         if (cat_dict['name'] != selected_value) {
           var unselected = document.getElementById(cat_dict['name']);
           if (unselected !== null) {
               unselected.style.display  = "none";
           }
         }
       });
    });

  }
  function addCat(cat_name, img_src, cat_id) {
    var cat_div = document.createElement('div')
    var h2_title = document.createElement('h2');
    h2_title.textContent = cat_name;
    var cat_img = document.createElement('img');
    var counter = document.createElement('h3');
    counter.textContent = 0;
    var count = 0;
    cat_div.id = cat_id
    cat_img.src = img_src;
    cat_img.addEventListener('click', function() {
      count = count + 1;
      counter.textContent = count;
    }, false);
    cat_div.appendChild(h2_title);
    cat_div.appendChild(cat_img);
    cat_div.appendChild(counter);
    insertAfter(cat_div, currentElement);
    currentElement = cat_div;
  }
  addSelection();
  addCat(cat_array[0].name, cat_array[0].image, cat_array[0].name);
  */
  /*
  document.addEventListener('DOMContentLoaded', function() {
    currentElement.selectedIndex = 1; 
  }, false);
  */
})(document);

