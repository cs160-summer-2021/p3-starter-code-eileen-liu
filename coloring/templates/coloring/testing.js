var $canvas = $('#canvas');
paper.setup($canvas[0]);

paper.Layer.inject({ 
    _selectChildren: false 
});

undo = new Undo(50);

var values = {
    paths: 20,
    minPoints: 5,
    maxPoints: 15,
    minRadius: 30,
    maxRadius: 90
};

createPaths();

function createPaths() {
    var radiusDelta = values.maxRadius - values.minRadius;
    var pointsDelta = values.maxPoints - values.minPoints;
    for (var i = 0; i < values.paths; i++) {
        var radius = values.minRadius + Math.random() * radiusDelta;
        var points = values.minPoints + Math.floor(Math.random() * pointsDelta);
        var path = createBlob(paper.view.size.multiply(paper.Point.random()), radius, points);
        var lightness = (Math.random() - 0.5) * 0.4 + 0.4;
        var hue = Math.random() * 360;
        path.fillColor = { hue: hue, saturation: 1, lightness: lightness };
        path.strokeColor = 'black';
    };
}

function createBlob(center, maxRadius, points) {
    var path = new paper.Path();
    path.closed = true;
    for (var i = 0; i < points; i++) {
        var delta = new paper.Point({
            length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
            angle: (360 / points) * i
        });
        path.add(center.add(delta));
    }
    path.smooth();
    return path;
}

undo.snapshot("Init");

$("#tool-select").click(function() {
    toolStack.setToolMode('tool-select');
});
$("#tool-direct-select").click(function() {
    toolStack.setToolMode('tool-direct-select');
});
$("#tool-pen").click(function() {
    toolStack.setToolMode('tool-pen');
});
$("#tool-zoompan").click(function() {
    toolStack.setToolMode('tool-zoompan');
});

$("#undo").click(function() {
    toolStack.command(function() {
        if (undo.canUndo())
        undo.undo();
    });
});
$("#redo").click(function() {
    toolStack.command(function() {
        if (undo.canRedo())
        undo.redo();
    });
});

$("#cut").click(function() {
    cutSelection();
});
$("#copy").click(function() {
    copySelection();
});
$("#paste").click(function() {
    pasteSelection();
});

$("#delete").click(function() {
    deleteSelection();
});

toolStack.activate();
toolStack.setToolMode('tool-select');

paper.view.draw(); 
