

//FILtER START
var $grid = $('.grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
    getSortData: {
        date: function ($elem) {
            return Date.parse($elem.find('.date').text());
        },
        name: '.name', // text from querySelector

        date: function (itemElem) { // function
            var date = $(itemElem).find('.date').text();
            // return parseFloat(weight.replace(/[\(\)]/g, ''));
            return Date.parse(date);
        },
    }
});

function applyFilter() {
    let filters = [];
    let tags = [];
    $('.filter-checkbx:checkbox:checked').each(function () {
        filters.push('.' + $(this).val());
        tags.push($(this).attr("data-tag"));

    })
    $(".tag").remove();
    tags.forEach(function (item) {
        $(".tag-name").append("<p class='tag'>" + item + " <span class='tag_close' tag_close='" + item + "'>x</span></p>");
    });
    if (filters.length === 0) {
        $("#reset_grid").hide()

    } else {
        $("#reset_grid").show()
    }
    $grid.isotope({ filter: filters.toString().split(',').join('') })
}


$('.filter-checkbx').click(function () {
    applyFilter();
})
//FILtER END
$(document).on('click', '.tag_close', function () {

    $(".filter-checkbx:checkbox[data-tag='" + $(this).attr("tag_close") + "']").prop('checked', false);
    applyFilter();

});

//SORT START

$('.filter_drpdwn ul li').click(function () {
    var $sort_dropdown = $(this).attr("id");
    if ($sort_dropdown == 'a_z') {
        sort_a_z();
    }
    else if ($sort_dropdown == 'z_a') {
        sort_z_a();
    }
    else if ($sort_dropdown == 'ending_soon') {
        sort_ending_soon();
    }
    else {
        console.log("Default");
        sort_a_z();
    }
});

function sort_a_z() {
    $grid.isotope({ sortBy: 'name', sortAscending: true })
}
function sort_z_a() {
    $grid.isotope({
        sortBy: 'name', sortAscending: false
    })
}
function sort_ending_soon() {
    $grid.isotope({
        sortBy: 'date'
    })
}


//DROPDOWN
$('.dropdwn, filter_drpdwn li').click(function () {
    // if ($(event.target).is(".dropdwn")) {
    $('.filter_drpdwn').slideToggle();
    // } else {
    //     $('.filter_drpdwn').hide();
    // }
});


// Search filter
$("#quicksearch").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#brands .wrap-brands").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

// Reset Grid button


$("#reset_grid").click(function () {
    $grid.isotope({ filter: '*' });

    $('.filter-checkbx:checkbox:checked').each(function () {
        $(this).prop('checked', false);
    })
    $(".tag").remove();
    $(this).hide()
})
