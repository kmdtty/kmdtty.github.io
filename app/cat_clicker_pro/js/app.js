(function(document) {
  'use strict';
  var model = {
      current_cat: null,
      cat_array:  [{uid:1, name: "Nyan", image:"cat.jpg", counter:0},
                  {uid:2, name: "Mya", image:"cat2.jpg", counter:0},
                  {uid:3, name: "NyanNyan", image:"cat3.jpg", counter:0},
                  {uid:4, name: "Mia", image:"cat4.jpg", counter:0},
                  {uid:5, name: "NyanNyanNyan", image:"cat5.jpg", counter:0},
                  {uid:6, name: "Nyaaaa", image:"cat6.jpg", counter:0},
                  ],
      init: function() {
         if (!localStorage.cat_array) {
           localStorage.cat_array = JSON.stringify(model.cat_array);
         }
      },
      reset: function() {
          localStorage.cat_array = JSON.stringify(model.cat_array);
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
        selection_view.init();
        this.setCurrentCat(this.getCatList()[0]);
        cat_view.init();
        admin_view.init();
    },
    reset: function() {
        model.reset();
        this.init();
    },
    getCatList: function() {
        return model.getAllCats();
    },
    findCat: function(cat_uid) {
        /* XXX: returns a_list[0] is not good*/
        return octopus.getCatList().filter(function(cat) {
            if (cat.uid == cat_uid) {
                return cat
            }
        })[0]
    },
    updateCat: function(cat) {
        var all_cats = octopus.getCatList();
        var index = all_cats.findIndex(function(c) {return c.uid == cat.uid;});
        all_cats[index] = cat;
        model.storeAllCats(all_cats);
    },
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },
    getCurrentCat: function() {
        return model.currentCat;
    }

  }

  var cat_view = {
      init: function() {
          this.cat_display = document.getElementById('cat_display');
          this.render();
      },
      render: function() {
        var cat = octopus.getCurrentCat();
        var htmlStr = '';
        htmlStr += '<h2>' + cat.name + '</h2>'
        htmlStr += '<img src="'+ cat.image + '" id="cat_image"/>' 
        htmlStr += '<h3><font color="red">' + cat.counter + '</font> clicks</h3>';
        this.cat_display.innerHTML = htmlStr;
        var cat_image = document.getElementById("cat_image");
        cat_image.addEventListener('click', function() {
            cat.counter += 1;
            octopus.updateCat(cat);
            cat_view.render();
            admin_view.render();
        });
      }
  }
  var selection_view = {
      init: function() {
          this.cat_select = document.getElementById('cat_select');
          this.cat_select.addEventListener('change', function() {
            var selected_value = this.value
            var cat = octopus.findCat(selected_value);
            octopus.setCurrentCat(cat);
            cat_view.render();
            admin_view.render();
          });
          this.render();
      },
      render: function() {
         var cat = octopus.getCurrentCat();
         var htmlStr = '';
         octopus.getCatList().map(function(cat) {
             htmlStr += '<option value="' + cat.uid+ '">' + cat.name +'</option>';
         });
         this.cat_select.innerHTML = htmlStr;
      },
  }
  var admin_view = {
      init: function() {
          var admin_area = document.getElementById('admin_area');
          admin_area.style.display = 'none';
          var admin_button = document.getElementById('admin_button');
          admin_button.addEventListener('click', function() {
              admin_area.style.display = 'block';
              admin_view.render();
          });
          var reset_button = document.getElementById('reset_button');
          reset_button.addEventListener('click', function() {
              octopus.reset();
          });
          var cancel_button = document.getElementById('cancel_button');
          cancel_button.addEventListener('click', function() {
              admin_area.style.display = 'none';
          });
          var save_button = document.getElementById('save_button');
          this.admin_cat_name = document.getElementById('admin_cat_name');
          this.admin_cat_image_url = document.getElementById('admin_cat_image_url');
          this.admin_cat_click_counter = document.getElementById('admin_cat_click_counter');
          save_button.addEventListener('click', function() {
              var cat = octopus.getCurrentCat();
              cat.name = admin_view.admin_cat_name.value;
              cat.image = admin_view.admin_cat_image_url.value;
              cat.counter = admin_view.admin_cat_click_counter.value;
              octopus.updateCat(cat);
              octopus.setCurrentCat(cat);
              selection_view.render();
              cat_view.render();
              admin_view.render();
          });
      },
      render: function() {
          var cat = octopus.getCurrentCat();
          this.admin_cat_name.value = cat.name;
          this.admin_cat_image_url.value = cat.image;
          this.admin_cat_click_counter.value = cat.counter;
      }
  }
  octopus.init();
})(document);

