
var renderState = function(state) {
    console.log('Rendering state: ' + state.properties['NAME']);

    d3.select('#state' + state.properties['STATE']).append('h2').text(state.properties['NAME']);

    var size = 500;
    var svg = d3.select('#state' + state.properties['STATE']).append('svg')
        .attr({
            'width': size,
            'height': size
        });
    var projection = d3.geo.conicConformal();
    var path = d3.geo.path().projection(projection);

    var centroid = d3.geo.centroid(state);
    var r = [centroid[0] * -1, centroid[1] * -1];
    projection.scale(1).translate([0, 0]).rotate(r);

    var b = path.bounds(state),
        s = 0.95 / Math.max((b[1][0] - b[0][0]) / size, (b[1][1] - b[0][1]) / size),
        t = [(size - s * (b[1][0] + b[0][0])) / 2, (size - s * (b[1][1] + b[0][1])) / 2];

    projection.scale(s).translate(t);

    // State Outline with our circle fill pattern
    svg.append('path')
        .datum(state.geometry)
        //.enter().append('path')
        .attr({
            'class': 'state',
            'd': path
        });
};


$(document).ready(function() {

    d3.json('data/states-5m.json', function(response) {

        console.log('got the states...');
        var states = response.features;

        var i, len, state;
        len = states.length;
        for (i = 0; i < len; i++) {
            state = states[i];

            console.log('    adding state: ' + state.properties['NAME'] + ' [' + state.properties['STATE'] + ']');

            $('#maps').append('<div class="state-map" id="state' + state.properties['STATE'] + '"/>');
            $('#maps').append('<hr />');
            renderState(state);
        }

    });
});
