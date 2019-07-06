$(document).ready(() => {
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
            })
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
            }
            if (open) {
                $('.flex').find('[data-id=' + open + ']').show();
                buttonSelector.find('[data-close=' + open + ']').show();
                barSelector.find('[data-open=' + open + ']').hide();
            }
        });
    });

});
