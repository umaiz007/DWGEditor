/* global Autodesk */

export function initViewer(container, options, extensions) {
    return new Promise(function (resolve, reject) {
        Autodesk.Viewing.Initializer(options, function () {
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, { extensions });
            viewer.start();
            resolve(viewer);
        });
    });
}

export function loadModel(viewer, urn, guid) {
    return new Promise(function (resolve, reject) {
        function onDocumentLoadSuccess(doc) {
            const viewable = guid ? doc.getRoot().findByGuid(guid) : doc.getRoot().getDefaultGeometry();
            resolve(viewer.loadDocumentNode(doc, viewable));
        }
        function onDocumentLoadFailure(code, message, errors) {
            reject({ code, message, errors });
        }
        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}
