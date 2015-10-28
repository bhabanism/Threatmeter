$.getJSON( "data/all-cards-local.json", function( data ) {
    
    $.each( data, function( cards ) {
        if(this instanceof Array)
        { 
            $.each( this, function( id , card ) {                          
                $('#cards').append('<img src='+card.image_url+' alt='+card.name+'/></br>');                
            });
        }
    });
});
