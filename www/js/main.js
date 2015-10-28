$( document ).ready(function() {
    loadCards();
});

$('#hero').change(function() {
    $('#class_cards').empty();
    $('#neutral_cards').empty();
    loadCards();
});

loadCards = function() {
    $.getJSON( "data/all-cards-local.json", function( data ) {
    
        var hero = $('#hero').val();         

        $.each( data, function( cards ) {
            if(this instanceof Array)
            { 
                $.each( this, function( id , card ) {      
                    if(isPlayableByClass(this, hero) && isManaCostBetween(this, 10, 0)  && isPlayableCard(card)) {                  
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