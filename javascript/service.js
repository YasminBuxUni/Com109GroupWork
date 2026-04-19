$(document).ready(function() {
    $('.reveal-btn').on('click', function() {
        const button = $(this);
        const infoPanel = button.siblings('.info-content');
        
        infoPanel.slideToggle(400, function() {
            if (infoPanel.is(':visible')) {
                button.text('Show Less');
            } else {
                button.text('Learn More');
            }
        });
    });
});