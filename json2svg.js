var fs = require('fs');
var page = require('webpage').create();
var url = 'file://' + fs.absolute('./json2svg.html');

var convertState = function(opts) {
    var state = opts.state;
    var geom = opts.geom;

    var size = 1000;
    var svg = d3.select('#map').append('svg')
        .attr({
            'id': state,
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
        .datum(geom)
        //.data(geom.features)
        //.enter().append('path')
        .attr({
            'class': 'state',
            'd': path
        });

    var serializer = new XMLSerializer();
    var element = document.getElementById(state);
    return serializer.serializeToString(element);
};


var states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
    'DC', 'PR'];

page.open(url, function(status) {
    var i, state, geom, svg, name;
    var len = states.length;
    for (i = 0; i < len; i++) {
        state = states[i];
        geom = JSON.parse(fs.read(fs.absolute('./app/data/' + state + '.json')));
        svg = page.evaluate(convertState, {
            'state': state,
            'geom': geom
        });
        name = geom.features[0].properties['NAME'];
        fs.write(fs.absolute('./svg/' + name + '.svg'), svg, 'w');
    }
    phantom.exit();
});
