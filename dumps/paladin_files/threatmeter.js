$( document ).ready(function() {
    loadCards();
});

$('#hero').change(function() {   
    loadCards();
});

$('#mana').change(function() {
    loadCards();
});

$('#search').click(function() {
    loadCards();
});

$('#endturn').click(function() {
    var mana = $('#mana').val();
    mana++;
    $('#mana').val(mana);
    loadCards();
});

$('#reset').click(function() {
    var mana = $('#mana').val();
    if(mana!=1) {
        $('#mana').val(1);
        loadCards();
    } 
});

loadCards = function() {
    
    $('#class_cards').empty();
    $('#neutral_cards').empty();
    
    
    $.getJSON( "data/AllSets.enUS.json", function( data ) {
    
        var hero = $('#hero').val();         
        var mana = $('#mana').val();
        mana = getValidMana(mana);

        $.each( data, function( cards ) {
            if(this instanceof Array)
            { 
                $.each( this, function( id , card ) {      
                    if(isPlayableByClass(this, hero) && isManaCostBetween(this, mana, 0)  && isPlayableCard(card)) {                  
                        if(card.playerClass === undefined) {
                            $('#neutral_cards').append('<img class="card_image" src="http://wow.zamimg.com/images/hearthstone/cards/enus/medium/'+card.id+'.png" alt='+card.name+'/>');                        
                        } else {
                            //$('#class_cards').append('<img src='+card.image_url+' alt='+card.name+'/>');                         
                            $('#class_cards').append('<img class="card_image" src="http://wow.zamimg.com/images/hearthstone/cards/enus/medium/'+card.id+'.png" alt='+card.name+'/>');                         
                            
                        }

                    }
                });
            }
        });
    });
}

getValidMana = function(mana) {
    if(mana<=100 && mana>=0 && mana!='') {
        return mana;
    }
    return 100;
}

isPlayableCard = function(card) {
  return (card.collectible == true && card.category!= "hero");
}

isPlayableByClass = function(card, hero) { 
    /*if(card.name == "Voidwalker") {
        console.log('wait');
    }*/
    return (card.playerClass == hero || card.playerClass === undefined);    
}

isManaCostBetween = function(card, upperlimit, lowerlimit) {
    return (card.cost <= upperlimit && card.cost >=lowerlimit);
}