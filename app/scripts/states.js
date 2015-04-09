
var renderState = function(state, geom) {
    console.log('    rendering state: ' + state);

    d3.select('#state' + state).append('h2').text(state);

    var size = 1000;
    var svg = d3.select('#state' + state).append('svg')
        .attr({
            'width': size,
            'height': size
        });
    var projection = d3.geo.conicConformal();
    var path = d3.geo.path().projection(projection);

    var centroid = d3.geo.centroid(geom);
    var r = [centroid[0] * -1, centroid[1] * -1];
    projection.scale(1).translate([0, 0]).rotate(r);

    var b = path.bounds(geom),
        s = 0.95 / Math.max((b[1][0] - b[0][0]) / size, (b[1][1] - b[0][1]) / size),
        t = [(size - s * (b[1][0] + b[0][0])) / 2, (size - s * (b[1][1] + b[0][1])) / 2];

    projection.scale(s).translate(t);

    // State Outline with our circle fill pattern
    svg.append('path')
        .datum(geom)//.features)
        //.enter().append('path')
        .attr({
            //'id': state,
            'class': 'state',
            'd': path
        });
};

var loadState = function(st) {
    console.log('Loading ' + st + '...');
    $('#maps').append('<div class="state-map" id="state' + st + '"/>');
    $('#maps').append('<hr />');
    d3.json('data/' + st + '.json', function(response) {
        renderState(st, response);
    });
};

$(document).ready(function() {
    var states = [
        'AL', 'AK', 'AZ', 'AR', 'CA',
        'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA',
        'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO',
        'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH',
        'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT',
        'VA', 'WA', 'WV', 'WI', 'WY'];

    var i, state;
    var len = states.length;
    for (i = 0; i < len; i++) {
        state = states[i];
        loadState(state);
    }

});
