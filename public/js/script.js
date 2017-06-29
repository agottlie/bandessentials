$(() => {
    console.log('js connected!');

    flatpickr(".tour-date-input", {altInput: true});

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
});
