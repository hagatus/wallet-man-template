(function() {
    console.log('fiis.js ready');
    //auto-complete
    const suggestions = ["MXRF11", "BBPO11"];
    const ticket = document.getElementById("ticket");
    autocomplete(ticket, suggestions)

})();