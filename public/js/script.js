$(() => {
    console.log('js connected!');

    flatpickr(".tour-date-input", { altInput: true });
    flatpickr(".tour-date-edit", { altInput: true });

    $('.new-date-form').on('submit', (e) => {
        e.preventDefault();

        const date = $('.tour-date-input').val(),
            name = $('.tour-venue-input').val(),
            city = $('.tour-city-input').val(),
            state = $('.tour-state-input').val();


        const newDate = {
            date: date,
            name: name,
            city: city,
            state: state
        };

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
    });

    $('.edit-date-form').on('submit', (e) => {
        e.preventDefault();

        const date = $('.tour-date-edit').val(),
            name = $('.tour-venue-edit').val(),
            city = $('.tour-city-edit').val(),
            state = $('.tour-state-edit').val(),
            date_id = $('.submit').attr('data-id');


        console.log("DATE ID IS " + date_id);

        const updatedDate = {
            date: date,
            name: name,
            city: city,
            state: state,
            date_id: date_id,
        };

        $.ajax({
            method: 'PUT',
            url: '/dates/edit/:id',
            data: updatedDate,
            success: response => {
                window.location.replace('/bands/profile')
            },
            error: msg => {
                console.log(msg);
            }
        });
    });
});
