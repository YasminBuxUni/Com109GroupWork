$(document).ready(function() {
    // Target the button click
    $('.reveal-btn').on('click', function() {
        const button = $(this);
        // Find the specific info-content inside THIS card
        const infoPanel = button.siblings('.info-content');

        // Animate the reveal
        infoPanel.slideToggle(400, function() {
            // Change the button text after animation
            if (infoPanel.is(':visible')) {
                button.text('Show Less');
            } else {
                button.text('Learn More');
            }
        });
    });
});