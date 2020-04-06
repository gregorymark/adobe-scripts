if (app.documents.length > 0) {

    var activeDoc = app.activeDocument;

    var title = "Scale all artboards";

    var scale = Number(Window.prompt("Enter new artboard scale as a decimal", 1, title));
    var percentageScale = scale * 100;

    // Select all items
    var items = activeDoc.pageItems;
    for(var i = 0;i < items.length;i++) {
        items[i].selected = true;
    }
    
    var resizeWarning = false;

    // Resize all artboards
    for (i = 0; i < activeDoc.artboards.length; i++) {

        var abBounds = activeDoc.artboards[i].artboardRect; // [left, top, right, bottom]

        // Get artboard position and dims
        var abLeft = abBounds[0];
        var abTop = abBounds[1];
        var abWidth = abBounds[2] - abLeft;
        var abHeight = abTop - abBounds[3];

        // Get new dims
        var newAbWidth = abWidth * scale;
        var newAbHeight = abHeight * scale;

        // Work out new bounds
        abBounds[0] = getLeftFromVisibleBounds(activeDoc, abLeft, scale);
        abBounds[1] = getTopFromVisibleBounds(activeDoc, abTop, scale);
        abBounds[2] = abBounds[0] + newAbWidth;
        abBounds[3] = abBounds[1] - newAbHeight;

        // Set new artboard bounds
        try {
            activeDoc.artboards[i].artboardRect = abBounds;
        } catch (error) {
            if(!resizeWarning) {
                resizeWarning = true;
                alert("New artboard is greater than the visible document bounds. Artboards are resized from top, left.");
            }
        } 
    }

    // Get the selection with the new sizes
    var selection = activeDoc.selection;

    if (selection.length > 0) {
        for (i = 0; i < selection.length; i++) {
            selection[i].left = getLeftFromVisibleBounds(activeDoc, selection[i].left, scale);
            selection[i].top = getTopFromVisibleBounds(activeDoc, selection[i].top, scale);
            // We're positioning using top and left so that should be the transform origin for the scaling
            var transformOrigin = Transformation.TOPLEFT;
            selection[i].resize(percentageScale, percentageScale, true, true, true, true, percentageScale, transformOrigin);
        }
    }


} else {

    alert("there are no open documents");

}

function getLeftFromVisibleBounds(activeDoc, left, scale) {
    return activeDoc.visibleBounds[0] + ( left - activeDoc.visibleBounds[0] ) * scale;
}

function getTopFromVisibleBounds(activeDoc, top, scale) {
    return activeDoc.visibleBounds[1] - ( activeDoc.visibleBounds[1] - top ) * scale;
}