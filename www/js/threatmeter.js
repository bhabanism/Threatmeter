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
    
    clearCards();
    
    
    $.getJSON( "data/AllSets.enUS.json", function( data ) {
    
        var hero = $('#hero').val();         
        var mana = $('#mana').val();
        mana = getValidMana(mana);

        $.each( data, function( cards ) {
            if(this instanceof Array)
            { 
                $.each( this, function( id , card ) {      
                    //if(isPlayableByClass(this, hero) && isManaCostBetween(this, mana, 0)  && isPlayableCard(card)) {
                    if(isPlayableByClass(this, hero) && isManaCostBetween(this, mana, mana)  && isPlayableCard(card)) {
                                                
                        //var imgSrc = 'http://wow.zamimg.com/images/hearthstone/cards/enus/medium/'+card.id+'.png';
                        var imgSrc = './img/cards/'+card.id+'.png';
                        
                        if(card.playerClass === undefined) {                            
                            $('#neutral_minions').append('<img class="card_image" src='+imgSrc+' alt='+card.name+'/>');
                        } else {
                            if(card.type=="Weapon") {                                
                                $('#weapons').append('<img class="card_image"  src='+imgSrc+' alt='+card.name+'/>');
                            } else if(card.type=="Spell") {                                
                                $('#spells').append('<img class="card_image"  src='+imgSrc+' alt='+card.name+'/>');
                            } else {
                                $('#class_minions').append('<img class="card_image"  src='+imgSrc+' alt='+card.name+'/>');
                            }
                        }

                    }
                });
            }
        });
        showCards();
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

clearCards = function() {    
    $('#weapons').empty();
    $('.weapons').hide();
    
    $('#spells').empty();
    $('.spells').hide();
    
    $('#class_minions').empty();
    $('.class_minions').hide();
    
    $('#neutral_minions').empty();    
    $('.neutral_minions').hide();    
}

showCards = function() {
    if($('#weapons').children().length>0) $('.weapons').show();    
    if($('#spells').children().length>0) $('.spells').show();
    if($('#class_minions').children().length>0) $('.class_minions').show();
    if($('#neutral_minions').children().length>0) $('.neutral_minions').show();
}