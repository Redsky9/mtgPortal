$(() => {
  let test = $( '.card-items' ).find('tr')[2];
  let cardCost = $(test).find('td')[1];
  let textTemp = $( '.card-items' ).find('tr')[5];
  let text = $(textTemp).find('td')[1];
  
  (function buildCardCost() {
    let values = $(cardCost).html().replace(/{/g, '').replace(/}/g, '');
    let temp = "";
    for(let i = 0; i < values.length; i++){
      temp += insertImage(values[i]);
    }
    $(cardCost).html(temp);
  })();

  (function buildText() {
    console.log($(text).html());
    temp = $(text).html();
    for(let i = 0; i < temp.length; i++){
      if(temp[i] == '{' && temp[i + 2] == '}'){
        temp = temp.replace(temp.substring(i, i + 3), insertImage(temp[i + 1])); 
      }
    }
    $(text).html(temp);
    console.log(text);
  })();

  function insertImage(val) {
    if(val == 'B'){
      return '<img class="cost-item" src="http://eakett.ca/mtgimage/symbol/mana/b.svg" title="Black" alt="Black" />';
    }else if(val == 'U'){
      return '<img class="cost-item" src="http://eakett.ca/mtgimage/symbol/mana/u.svg" title="Water" alt="Water" />';
    }else if(val == 'G'){
      return '<img class="cost-item" src="http://eakett.ca/mtgimage/symbol/mana/g.svg" title="Green" alt="Green" />';
    }else if(val == 'R'){
      return '<img class="cost-item" src="http://eakett.ca/mtgimage/symbol/mana/r.svg" title="Red" alt="Red" />';
    }else if(val == 'W'){
      return '<img class="cost-item" src="http://eakett.ca/mtgimage/symbol/mana/w.svg" title="White" alt="White" />';
    }else if(val == 'T'){
      return '<img class="cost-item" src="http://eakett.ca/mtgimage/symbol/other/t.svg" title="Tap" alt="Tap" />';
    }else{
      return '<img class="cost-item" src="http://eakett.ca/mtgimage/symbol/mana/' + val + '.svg" title="' + val + '" alt="' + val + '" />';
    }
  }

});