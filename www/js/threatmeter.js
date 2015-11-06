$(document).ready(function() {
    $( ".drawer" ).collapsible({
        collapseCueText: " collapse with a click"
    });
    
    loadCards();
});


$('#hero').change(function() {
    loadCards();     
});

$('#mana').change(function() {
    loadCards();
});

$('#threat').change(function() {   
    loadCards();
});

$('#search').unbind().click(function() {    
    loadCards();
});

$('#endturn').unbind().click(function() {    
    var mana = $('#mana').val();
    mana++;
    $('#mana').val(mana);    
    loadCards();
    
});

$('#reset').click(function() { 
    var mana = $('#mana').val();
    if(mana!=1) {
        $('#mana').val(0);
        loadCards();
    } 
});

loadCards = function() {    
    
    $('#mana').slider('refresh'); 
    
    clearCards();
    var showThreatOnly = false;    
    if($('#threat').val()=="true") {
        showThreatOnly = true;
    } else {
         showThreatOnly = false;
    }
    
    $.getJSON( "data/AllSets.enUS.json", function( data ) {
    
        var hero = $('#hero').val();         
        var mana = $('#mana').val();
        mana = getValidMana(mana);

        $.each( data, function( cards ) {
            if(this instanceof Array)
            { 
                $.each( this, function( id , card ) {      
                    //if(isPlayableByClass(this, hero) && isManaCostBetween(this, mana, 0)  && isPlayableCard(card)) {
                     //todo get it from form.
                    if(isPlayableByClass(this, hero) && isManaCostBetween(this, mana, mana)  && isPlayableCard(card) && isThreatening(card, showThreatOnly)) {
                                                
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

isThreatening = function(card, showThreatOnly) {        
    if(!showThreatOnly) {
        return true;
    }
    if(card.threat == undefined || card.threat != true) {        
        return false;
    } else {
        return true;
    }    
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
    return (card.playerClass == hero || card.playerClass === undefined);    
}

isManaCostBetween = function(card, upperlimit, lowerlimit) {
    return (card.cost <= upperlimit && card.cost >=lowerlimit);
}

clearCards = function() {
    $('#weapons').empty();
    $('#weapons_set').hide();    
    
    $('#spells').empty();
    $('#spells_set').hide();
    
    $('#class_minions').empty();
    $('#class_minions_set').hide();
    
    $('#neutral_minions').empty();    
    $('#neutral_minions_set').hide();    
}

showCards = function() {
    if($('#weapons').children().length>0) $('#weapons_set').show();    
    if($('#spells').children().length>0) $('#spells_set').show();
    if($('#class_minions').children().length>0) $('#class_minions_set').show();
    if($('#neutral_minions').children().length>0) $('#neutral_minions_set').show();
}