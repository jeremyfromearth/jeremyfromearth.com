var UIBotId = 0;

function UIBot() {
  var bindId = 0;
  var inputs = [];
  var bindings = [];
  var uibotId = ++UIBotId;

  function createUIElement(target, param, container, callback) {
    if(!target.hasOwnProperty(param.name)) {
      console.warn('UIBots Warning: target does not contain property: ', param.name);
    } else {
      var input = null;
      var type = typeof(target[param.name]); 
      switch(type) {
        case 'boolean':
          input = createBooleanComponent(target, param, container, callback);
          break;
        case 'function':
          input = createFunctionComponent(target, param, container, callback);
          break;
        case 'number':
          input = createRangeComponent(target, param, container, callback);
          break;
        case 'string':
          input = createStringComponent(target, param, container, callback);
          break;
      }

      if(input != null) {
        input.setAttribute('data-param', param.name);
        input.id = 'uibot-' + uibotId + '-' + param.name;
      }
      return input;
    }
    return null;
  }

  function createBooleanComponent(target, param, container, callback) {
    var div = document.createElement('div');
    div.className = 'component';

    var label = document.createElement('div');
    label.innerHTML = param.label;
    label.className = 'label';

    var input = document.createElement('div');
    input.className = 'checkbox';
    input.checked = target[param.name];

    div.appendChild(label);
    div.appendChild(input);
    container.appendChild(div);

    var selected = target[param.name];
    function on_selected(event) {
      if(selected) {
        input.classList.add('checkbox-selected');
      } else {
        input.classList.remove('checkbox-selected');
      }
      target[param.name] = selected;
      if(callback) callback(event);
    }

    label.addEventListener('mousedown', function(event) {
      selected = !selected;
      on_selected(event);
    });

    input.addEventListener('mousedown', function(event) {
      selected = !selected;
      on_selected(event);
    });

    bindings.push(function() {
      if(selected != target[param.name]) {
        selected = target[param.name];
        on_selected();
      }
    });

    on_selected();
    return input;
  }

  function createFunctionComponent(target, param, container, callback) {
    var div = document.createElement('div');
    div.className = 'component';

    var input = document.createElement('div');
    input.innerHTML = param.label;
    input.className = 'button';
    input.param = param;

    div.appendChild(input);
    container.appendChild(div);

    input.addEventListener('click', function(event) {
      var args = param.args || []
      target[param.name].apply(null, args);
      if(callback) callback(event);
    });

    return input;
  }

  function createRangeComponent(target, param, container, callback) {
    if(param.hasOwnProperty('options')) {
      createSelectComponent(target, param, container, callback);
    } else {
      param.step = param.step || 0.01;
      param.units = param.units || '';

      var div = document.createElement('div');
      div.className = 'component';

      var label = document.createElement('div');
      label.innerHTML = param.label;
      label.className = 'label';

      var value = document.createElement('div');
      value.innerHTML = target[param.name] + ' ' + param.units;

      var input = document.createElement('input');
      input.type = 'range';
      input.min = 0;
      input.max = 1;
      input.step = param.step;
      input.value = target[param.name];
      input.param = param;

      div.appendChild(label);
      div.appendChild(input);
      div.appendChild(value);
      container.appendChild(div);

      function update_value(event) {
        var v = Number(input.value);
        target[param.name] = v;
        var formatted = Number(v);
        if(v == 1) {
          formatted = '1.00';
        } else if (v == 0) {
          formatted = '0.00';
        } else if((v * 10) % 1 == 0) {
          formatted = v + '0';
        }
        
        value.innerHTML = formatted + param.units;
        if(callback) callback(event);
      }

      input.addEventListener('input', update_value);

      bindings.push(function() {
        if(input.value != target[param.name]) {
          input.value = target[param.name];
          value.innerHTML = target[param.name] + ' ' + param.units;
        }
      });

      update_value();
      return input;
    }
  }

  function createStringComponent(target, param, container, callback) {
    if(param.hasOwnProperty('options')) {
      createSelectComponent(target, param, container, callback);
    } else {
      var div = document.createElement('div');
      div.className = 'component';

      var label = document.createElement('div');
      label.innerHTML = param.label;
      label.className = 'label';

      var input = document.createElement('input');
      input.type = 'text';
      input.value = target[param.name];
      input.placeholder = param.placeholder || "";

      if(param.hasOwnProperty('max_length')) {
        input.maxLength = param.max_length;
      }

      div.appendChild(label);
      div.appendChild(input);
      container.appendChild(div);

      function update(event) {
        var value = param.delimiter ?
          input.value.split(param.delimiter) : input.value;
        target[param.name] = value;
        if(callback) callback(event);
      }

      input.addEventListener('change', update);

      input.addEventListener('keyup', update);

      var focus = false;
      input.addEventListener('focus', function(event) {
        focus = true;
      });

      input.addEventListener('blur', function(event) {
        focus = false;
      });

      bindings.push(function() {
        if(!focus) input.value = target[param.name];
      });
      return input;
    }
  }

  function createSelectComponent(target, param, container, callback) {
    var div = document.createElement('div');
    div.className = 'component';

    var label = document.createElement('div');
    label.innerHTML = param.label;
    label.className = 'label';

    var select = document.createElement('select');
    for(var i = 0; i < param.options.length; i++) {
      var option = document.createElement('option');
      option.value = param.options[i];
      option.innerHTML = param.options[i];
      select.appendChild(option);
    }
    select.selectedIndex = param.options.indexOf(target[param.name]);

    div.appendChild(label);
    div.appendChild(select);
    container.appendChild(div);

    select.addEventListener('change', function(event) {
      target[param.name] = param.options[select.selectedIndex];
      if(callback) callback(event);
    })

    var focus = false;
    select.addEventListener('focus', function(event) {
      focus = true;
    });

    select.addEventListener('blur', function(event) {
      focus = false;
    });

    bindings.push(function() {
      if(!focus) {
        var index = param.options.indexOf(target[param.name]);
        select.selectedIndex = index;
      }
    });
  }

  function bind(interval) {
    unbind();
    bindId = setInterval(function() {
      for(var i = 0; i < bindings.length; i++) {
        bindings[i]();
      }
    }, interval || 500);
  }

  function unbind() {
    clearInterval(bindId);
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return {
    id : uibotId,
    bind : bind,
    get_inputs : function() { return inputs; },
    build : function(target, params, wrapper, callback) {
      var container = document.createElement('div');
      wrapper.appendChild(container);
      container.className = 'uibot';
      container.id = 'uibot-' + uibotId + '-container';

      for(var i = 0; i < params.length; i++) {
        var row = document.createElement('div');
        container.appendChild(row);
        row.className = 'row';
         for(var name in params[i]) {
          var param = params[i][name];
          if(name == 'defaults') {
            for(var item in param) {
              var input = createUIElement(
                target, {
                  label : toTitleCase(param[item]), 
                  name : param[item]
                }, 
                row, callback);
              if(input) inputs.push(input);
            }
          } else {
            param.name = name;
            param.label = param.label || toTitleCase(name);
            var input = createUIElement(target, param, row, callback);
            if(input) inputs.push(input);
          }
        } 
      }
    },
    unind : unbind
  }
}
