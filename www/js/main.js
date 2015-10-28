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

loadCards = function() {
    
    $('#class_cards').empty();
    $('#neutral_cards').empty();
    
    
    $.getJSON( "data/all-cards-local.json", function( data ) {
    
        var hero = $('#hero').val();         
        var mana = $('#mana').val();
        mana = getValidMana(mana);

        $.each( data, function( cards ) {
            if(this instanceof Array)
            { 
                $.each( this, function( id , card ) {      
                    if(isPlayableByClass(this, hero) && isManaCostBetween(this, mana, 0)  && isPlayableCard(card)) {                  
                        if(card.hero == "neutral") {
                            $('#neutral_cards').append('<img src='+card.image_url+' alt='+card.name+'/>'); 
                        } else {
                            $('#class_cards').append('<img src='+card.image_url+' alt='+card.name+'/>');                         
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
    return (card.hero == hero || card.hero == "neutral");    
}

isManaCostBetween = function(card, upperlimit, lowerlimit) {
    return (card.mana <= upperlimit && card.mana >=lowerlimit);
}