function showModal(task_id) {
    $('.modal-task[data-id="' + task_id + '"]').css('display', 'flex');
}

function hideModal() {
    $('.modal-task').css('display', 'none');
    $('.modal-task .alert').hide();
}

function update_unread_notifications_count() {
    return $.get("/api/unread_notifications_count/", function(data) {
        if (data['unread_count'])
            t = '(' + data['unread_count'] + ')';
        else
            t = '';
        $(".unread-count").html(t);
    });
}

$(function () {
    $('.article, .article-with-image').each(function (_, article) {
        var task_id = $(article).data('id');
        $(article).find('a').click(function () {
            showModal(task_id);
        });
    });
    $('.task-prices th').click(function () {
        var task_id = $(this).data('id');
        showModal(task_id);
    });

    $('.modal').click(function (e) {
        if ($(e.target).is('.modal'))
            hideModal();
    });
    $('button.close').click(hideModal);
    
    update_unread_notifications_count();
    setInterval(update_unread_notifications_count, 3*60*1000);

    $('#hide-other-regions').change(function () {
        $('tbody tr:not(.my-region)').toggle();
        $('tbody tr:visible').each(function (i, el) {
            if (i % 2 === 0)
                $(el).removeClass('odd').addClass('even');
            else
                $(el).removeClass('even').addClass('odd');
        });
    });

    $('.modal-task').each(function (_, el) {
        var task_id = $(this).data('id');
        var form = $(el).find('.submit-flag-form');
        form.submit(function (event) {
            var alert = $(el).find('.alert');
            alert.removeClass('alert-danger').removeClass('alert-success').addClass('alert-dismissible')
                 .html('Проверка...')
                 .show();
            var button = $(el).find('button');
            button.attr('disabled', true);

            $.post("/api/submit_flag/" + task_id + "/", form.serialize())
                .done(function (response) {
                    if (response.status === 'success')
                        alert.removeClass('alert-dismissible').removeClass('alert-danger').addClass('alert-success');
                    else
                        alert.removeClass('alert-dismissible').removeClass('alert-success').addClass('alert-danger');

                    alert.html(response.message)
                         .show();
                })
                .fail(function () {
                    alert.removeClass('alert-dismissible').removeClass('alert-success').addClass('alert-danger')
                         .html('Не удалось подключиться к серверу. Попробуйте ещё раз через некоторое время.')
                         .show();
                })
                .always(function () {
                    button.removeAttr('disabled');
                });

            event.preventDefault();
        });
    });
});
