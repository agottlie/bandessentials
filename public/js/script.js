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

    //takes inputs from "Add tour date" page and returns search results when the form is submitted
    $('.new-date-form').on('submit', (e) => {
        e.preventDefault();

        const date = $('.tour-date-input').val(),
            name = $('.tour-venue-input').val(),
            city = $('.tour-city-input').val(),
            state = $('.tour-state-input').val(),
            id = null;

        //users the variables as parameters as a way to pass them through a GET call
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

    //takes inputs from "Edit tour date" page and returns search results when the form is submitted
    $('.edit-date-form').on('submit', (e) => {
        e.preventDefault();

        const date = $('.tour-date-edit').val(),
            name = $('.tour-venue-edit').val(),
            city = $('.tour-city-edit').val(),
            state = $('.tour-state-edit').val(),
            id = $('.search').data('id');

        //users the variables as parameters as a way to pass them through a GET call
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


    //deletes a tour date when the "Delete Date" button is clicked
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

    //updates the user's band name when the form is submitted
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


    //adds or edits a new tour date when the "Add Date" button is clicked
    $('.select').on('click', (e) => {
        e.preventDefault();

        //uses the data attribute to pass through info on the specific entry clicked
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

        //checks if the user is coming from the "Add" or "Edit" page.
        //date_id will be null if this is a new date, and will be a value > 0 if editing a current page
        if (date_id > 0) {
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
