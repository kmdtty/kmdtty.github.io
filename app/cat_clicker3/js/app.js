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
      storeAllCats: function(all_cats) {
         localStorage.cat_array = JSON.stringify(all_cats);
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
        /* XXX: returns a_list[0] is not good*/
        return octopus.getCatList().filter(function(cat) {
            if (cat.name == cat_name) {
                return cat
            }
        })[0]
    },
    updateCat: function(cat) {
        var all_cats = octopus.getCatList();
        var current_cat = octopus.findCat(cat.name);
        var index = all_cats.findIndex(function(c) {return c.name == cat.name;});
        all_cats[index] = cat;
        model.storeAllCats(all_cats);
    }
  }

  var view = {
      init: function() {
          this.cat_select = document.getElementById('cat_select');
          this.cat_display = document.getElementById('cat_display');
          this.cat_select.addEventListener('change', function() {
            var selected_value = this.value
            var cat = octopus.findCat(selected_value);
            view.render(cat);
          });
          view.renderSelection();
          view.render(octopus.getCatList()[0]);
      },
      renderSelection: function() {
         var htmlStr = '';
         octopus.getCatList().map(function(cat) {
             htmlStr += '<option value="' + cat.name + '">' + cat.name +'</option>';
         });
         this.cat_select.innerHTML = htmlStr;
      },
      render: function(cat) {
        var htmlStr = '';
        htmlStr += '<h2>' + cat.name + '</h2>'
        htmlStr += '<img src="'+ cat.image + '" id="cat_image"/>' 
        htmlStr += '<h3><font color="red">' + cat.counter + '</font> clicks</h3>';
        this.cat_display.innerHTML = htmlStr;
        var cat_image = document.getElementById("cat_image");
        cat_image.addEventListener('click', function() {
            cat.counter += 1;
            octopus.updateCat(cat);
            view.render(cat);
        });
      }
  }
  octopus.init();
})(document);

