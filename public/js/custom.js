// START
$(() => {
    var finalData = [];
    // Show/Hide dropdown menu
    let arrow = $('.dropdown-arrow');
    let menu = $('.drop-menu');
    

    $(arrow).on('click', () => {
        if ($(arrow).hasClass('fa-chevron-circle-down')) {
            $(arrow).removeClass('fa-chevron-circle-down');
            $(arrow).addClass('fa-chevron-circle-up');
        } else {
            $(arrow).removeClass('fa-chevron-circle-up');
            $(arrow).addClass('fa-chevron-circle-down');
        }
    });

    // Autocomplete Card Names
    $.ajax({
        type: 'GET',
        url: '/auto',
        data: {},
        async: false,
        dataType: 'json',
        success: function (data) {
            finalData = data;
        }
      });

    // Submit Autocomplete form on click
    $( "#tags" ).autocomplete({
        minLength: 3,
        source: finalData,
        select: function( event, ui ) {
            $("#tags").val(ui.item.label);
            this.form.submit();
        }
    });

    // Remove title when zooming on image
    $( ".small-card" ).hover( function() {
        let card_title = $( this ).find(".small-card-title");
        $( card_title ).toggleClass( "hide" );
    });

    function testIt(val) {
        console.log(val);
    }
});