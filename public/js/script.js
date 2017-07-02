$(() => {
    console.log('js connected!');

    flatpickr(".tour-date-input", { altInput: true, minDate: "today" });
    flatpickr(".tour-date-edit", { altInput: true, minDate: "today" });

    //Date display solution sourced from here: https://www.w3schools.com/jsref/jsref_getmonth.asp
    let month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    for (i = 0; i < $('.date').length; i++) {
        let date = new Date($('.date').eq(i).text());
        $('.date').eq(i).text(month[date.getMonth()] + " " + date.getDate());
    }


    //TAKE INPUTS FROM NEW TOUR DATE PAGE AND GO TO SEARCH
    $('.new-date-form').on('submit', (e) => {
        e.preventDefault();

        const date = $('.tour-date-input').val(),
            name = $('.tour-venue-input').val(),
            city = $('.tour-city-input').val(),
            state = $('.tour-state-input').val(),
            id = null;

        $.ajax({
            method: 'GET',
            url: `/dates/search/${date}/${name}/${city}/${state}/${id}`,
            success: response => {
                window.location.replace('/dates/search')
            },
            error: msg => {
                console.log(msg);
            }
        });
    });

    //UPDATE TOUR DATE
    $('.edit-date-form').on('submit', (e) => {
        e.preventDefault();

        const date = $('.tour-date-edit').val(),
            name = $('.tour-venue-edit').val(),
            city = $('.tour-city-edit').val(),
            state = $('.tour-state-edit').val(),
            id = $('.search').data('id');

        $.ajax({
            method: 'GET',
            url: `/dates/search/${date}/${name}/${city}/${state}/${id}`,
            success: response => {
                window.location.replace('/dates/search')
            },
            error: msg => {
                console.log(msg);
            }
        });
    });


    //DELETE TOUR DATE
    $('.deleteTour').on('click', (e) => {
        e.preventDefault();

        const id = $(e.target).data('id');

        $.ajax({
            method: 'DELETE',
            url: `/dates/${id}`,
            success: response => {
                window.location.reload();
            },
            error: msg => {
                console.log(msg);
            }
        });
    })

    //EDIT BAND NAME
    $('.edit-band-form').on('submit', (e) => {
        e.preventDefault();

        const name = $('.band-name-edit').val(),
            id = $('.submit').data('id');

        const updatedName = {
            name: name,
            id: id
        };

        $.ajax({
            method: 'PUT',
            url: '/bands/edit/',
            data: updatedName,
            success: response => {
                window.location.replace('/bands/profile')
            },
            error: msg => {
                console.log(msg);
            }
        });
    });


    //ADD NEW TOUR DATE
    $('.select').on('click', (e) => {
        e.preventDefault();

        const name = $(e.target).data('name'),
            address = $(e.target).data('address'),
            lat = $(e.target).data('lat'),
            lng = $(e.target).data('lng'),
            place_id = $(e.target).data('id'),
            date = $('#date').data('date'),
            date_id = parseInt($('#date').data('date_id'));

        const newDate = {
            name: name,
            address: address,
            lat: lat,
            lng: lng,
            place_id: place_id,
            date: date,
            date_id: date_id
        }

        console.log(date_id);
        console.log(typeof(date_id));

        if (date_id > 0) {
            console.log("RIGHT PATH");
            $.ajax({
                method: 'PUT',
                url: '/dates/',
                data: newDate,
                success: response => {
                    window.location.replace('/bands/profile')
                },
                error: msg => {
                    console.log(msg);
                }
            });

        } else {
            $.ajax({
                method: 'POST',
                url: '/dates/',
                data: newDate,
                success: response => {
                    window.location.replace('/bands/profile')
                },
                error: msg => {
                    console.log(msg);
                }
            });
        }
    })

});
