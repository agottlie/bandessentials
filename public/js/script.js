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
            method: 'PUT',
            url: '/dates/search',
            data: newDate,
            // success: response => {
            //     window.location.replace('/dates/new')
            // },
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

        const updatedDate = {
            date: date,
            name: name,
            city: city,
            state: state,
            date_id: date_id
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

});
