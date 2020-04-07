if (app.documents.length > 0) {

    var activeDoc = app.activeDocument;

    var activeAb = activeDoc.artboards[activeDoc.artboards.getActiveArtboardIndex()];
    var artboardLeft = activeAb.artboardRect[0];
    var artboardTop = activeAb.artboardRect[1];

    var selection = activeDoc.selection;

    if (selection.length === 1) {
        var firstElement = selection[0];
        var selectionTop = Math.floor(artboardTop - firstElement.top);
        var selectionLeft = Math.floor(firstElement.left - artboardLeft);
        var selectionHeight = Math.floor(firstElement.height);
        var selectionBottom = Math.floor(selectionTop + selectionHeight);

        alert(firstElement.typename + "\nLeft\t\t" + selectionLeft + "\nTop\t\t" + selectionTop + "\nBottom\t" + selectionBottom + "\nHeight\t" + selectionHeight);
    } else if (selection.length > 1) {
        var top = 0;
        var left = 0;
        var bottom = 0;
        for (i = 0; i < selection.length; i++) {
            if ((artboardTop - selection.top) < top || top === 0) {
                top = artboardTop - selection.top;
            }
            if ((artboardLeft - selection.left) < left || left === 0) {
                left = artboardLeft - selection.left;
            }
            var elementBottom = selection.top - selection.height;
            if ((artboardTop - elementBottom) < bottom || bottom === 0) {
                bottom = artboardTop - elementBottom;
            }
        }
        var height = bottom - top;
        top = Math.floor(top);
        left = Math.floor(left);
        bottom = Math.floor(bottom);

        alert("Group\nLeft\t\t" + left + "\nTop\t\t" + top + "\nBottom\t" + bottom + "\nHeight\t" + height);
    } else {
        alert("No elements selected");
    }
} else {
    alert("there are no open documents");
}