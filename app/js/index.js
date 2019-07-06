$(document).ready(() => {
    const feeds = [];
    $.getJSON("config/config.json", function (json) {
        if (json.feeds) {
            json.feeds.forEach((feed, index) => {
                const html = `<div class="flex container" data-id="${index}">
                        <iframe frameBorder="0" scrolling="no" data-feed="${index}" src="${feed}"></iframe>
                        <button class="absolute" data-close="${index}">${index}</button>
                    </div>`
                $('.screens').append(html);
                const openbar = `<button data-open="${index}">${index}</button>`;
                $('.openbar').append(openbar);
                feeds.push({
                    id: index,
                    feed: feed,
                    open: true
                })
            });
            const openFeeds = feeds.filter((o) => {
                return o.open
            }).length;
            $('.container').css('flex-basis', 200 / (openFeeds + 1) + "%");
        }
        const buttonSelector = $('button');
        const barSelector = $('.openbar');
        for (let i = 0; i < 6; i++) {
            barSelector.find('[data-open=' + i + ']').hide();
        }
        buttonSelector.click((ev) => {
            const close = $(ev.target).attr('data-close');
            const open = $(ev.target).attr('data-open');
            if (close) {
                $('.flex').find('[data-id=' + close + ']').hide();
                buttonSelector.find('[data-close=' + close + ']').hide();
                barSelector.find('[data-open=' + close + ']').show();
                feeds.find((o) => {
                    return o.id === Number(close)
                }).open = false;
            }
            if (open) {
                $('.flex').find('[data-id=' + open + ']').show();
                buttonSelector.find('[data-close=' + open + ']').show();
                barSelector.find('[data-open=' + open + ']').hide();
                feeds.find((o) => {
                    return o.id === Number(open)
                }).open = true;
            }
            const openFeeds = feeds.filter((o) => {
                return o.open
            }).length;
            $('.container').css('flex-basis', 200 / (openFeeds + 1) + "%");
        });
        $('#fullScreenButton').click(() => {
            $('#fullScreenButton').hide();
            let elem = document.getElementById('body');
            if (elem.requestFullscreen) {
                elem.requestFullscreen().then(()=> {
                    $('#fullScreenButton').hide();
                });
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen().then(()=> {
                    $('#fullScreenButton').hide();
                });
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                elem.webkitRequestFullscreen().then(()=> {
                    $('#fullScreenButton').hide();
                });
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen().then(()=> {
                    $('#fullScreenButton').hide();
                });
            }
        });
        document.addEventListener("fullscreenchange", function () {
            $('#fullScreenButton').show();
        }, false);
        document.addEventListener("webkitfullscreenchange", function () {
            $('#fullScreenButton').show();
        }, false);
        document.addEventListener("mozfullscreenchange", function () {
            $('#fullScreenButton').show();
        }, false);
    });

});
