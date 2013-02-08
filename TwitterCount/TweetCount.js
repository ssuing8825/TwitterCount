function loadEventData() {

    $.ajax({
        url: 'http://api.twitter.com/1/users/show.json/',
        type: 'GET',
        dataType: 'jsonp',
        data: {
            screen_name: 'stsuing',
            include_entities: true
        },
        success: function (data, textStatus, xhr) {

            //    var html = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';

            // append tweets into page
            //            for (var i = 0; i < data.length; i++) {
            //                $(JQTWEET.appendTo).append(
            //                        html.replace('TWEET_TEXT', JQTWEET.ify.clean(data[i].text))
            //                            .replace(/USER/g, data[i].user.screen_name)
            //                            .replace('AGO', JQTWEET.timeAgo(data[i].created_at))
            //                            .replace(/ID/g, data[i].id_str)
            //                    );
            //            }
        }

    });


    //    $.getJSON('https://api.twitter.com/1/users/show.json?screen_name=stsuing', function (data) {
    //        var list = $('#main').find('#list');
    //        list.empty();
    //        list.html('<li data-role="list-divider" data-icon="star" data-iconpos="left" class="ui-btn-active ui-state-persist">Scheduled Meetings</li>');
    //        alert(data);

    //        //        if (data.results.length > 0) {
    //        //            $.each(data, function () {
    //        //                $.each(this, function (k, v) {
    //        //                    if (v.time > 0) {
    //        //                        var eventDate = new Date(v.time);
    //        //                        var eventTitle = '<h1>' + $.format.date(eventDate, "MMM dd, yyyy h:mm a") + '</h1><p>' + v.name + '</p>';
    //        //                        $('<a>')
    //        //                            .data('event', v)
    //        //                            .bind('click', function () { showEventDetails($(this).data('event')); })
    //        //                            .html(eventTitle)
    //        //                            .appendTo($('<li>').appendTo(list));
    //        //                    }
    //        //                });
    //        //            });
    //        //        } else {
    //        //            list.html('<li>nothing found for twitter</li>');
    //        //        }
    //        //        list.listview("destroy").listview();
    //    });
}

function searchTwitter(query) {
    $.ajax({
        url: 'http://search.twitter.com/search.json?' + jQuery.param(query),
        dataType: 'jsonp',
        success: function (data) {
            var tweets = $('#tweets');
            tweets.html('');
            for (res in data['results']) {
                tweets.append('<div>' + data['results'][res]['from_user'] + ' wrote: <p>' + data['results'][res]['text'] + '</p></div><br />');
            }
        }
    });
}

function getUser(query) {
    $.ajax({
        url: 'https://api.twitter.com/1/users/show.json?' + jQuery.param(query),
        dataType: 'jsonp',
        success: function (data) {
            var tweets = $('#tweets');
            tweets.html('');
            tweets.append('<div>' + data['name'] + '</p></div><br />');
        }
    });
}

function getList(query) {
    $.ajax({
        url: 'https://api.twitter.com/1/lists/members.json?slug=ais&owner_screen_name=stsuing',
        dataType: 'jsonp',
        success: function (data) {
            alert(data)
            var tweets = $('#tweets');
            tweets.html('');
            for (res in data['users']) {
                tweets.append('<div>' + data['users'][res]['name'] + '</p></div><br />');
            }
        }
    });
}


function loadGrid() {

    $.ajax({
        url: 'https://api.twitter.com/1/lists/members.json?slug=ais&owner_screen_name=stsuing',
        dataType: 'jsonp',
        success: function (results) {

            jQuery("#list2").jqGrid({
                data: results['users'],
                datatype: "local",
                colNames: ['Name'],
                colModel: [
   		        { name: 'name', index: 'name', width: 55 }

   	],
                rowNum: 10,
                rowList: [10, 20, 30],
                pager: '#pager2',
                sortname: 'name',
                viewrecords: true,
                sortorder: "desc",
                caption: "JSON Example"
            });
            jQuery("#list2").jqGrid('navGrid', '#pager2', { edit: false, add: false, del: false });


        }
    });



}
