export const addZoomLevelsChangeListener = (that) => {
  that.map.on('zoomlevelschange', () => {
    that.printElement('ZOOM_LEVELS_CHANGE');
    that.addMessageToQueue('ZOOM_LEVELS_CHANGE', {
      center: that.map.getCenter(),
      bounds: that.map.getBounds(),
      zoom: that.map.getZoom()
    });
  });
};
export const addResizeListener = (that) => {
  that.map.on('resize', () => {
    that.printElement('RESIZE');
    that.addMessageToQueue('RESIZE', {
      center: that.map.getCenter(),
      bounds: that.map.getBounds(),
      zoom: that.map.getZoom()
    });
  });
};
export const addUnloadListener = (that) => {
  that.map.on('unload', () => {
    that.printElement('UNLOAD');
    that.addMessageToQueue('UNLOAD', {
      center: that.map.getCenter(),
      bounds: that.map.getBounds(),
      zoom: that.map.getZoom()
    });
  });
};
export const addViewResetListener = (that) => {
  that.map.on('viewreset', () => {
    that.printElement('VIEW_RESET');
    that.addMessageToQueue('VIEW_RESET', {
      center: that.map.getCenter(),
      bounds: that.map.getBounds(),
      zoom: that.map.getZoom()
    });
  });
};
export const addLoadListener = (that) => {
  that.map.on('load', () => {
    that.printElement('LOAD');
    that.addMessageToQueue('LOAD', {
      center: that.map.getCenter(),
      bounds: that.map.getBounds(),
      zoom: that.map.getZoom()
    });
  });
};
export const addZoomStartListener = (that) => {
  that.map.on('zoomstart', () => {
    that.printElement('ZOOM_START');
    that.addMessageToQueue('ZOOM_START', {
      center: that.map.getCenter(),
      bounds: that.map.getBounds(),
      zoom: that.map.getZoom()
    });
  });
};
export const addMoveStartListener = (that) => {
  that.map.on('movestart', () => {
    that.printElement('MOVE_START');
    that.addMessageToQueue('MOVE_START', {
      center: that.map.getCenter(),
      bounds: that.map.getBounds(),
      zoom: that.map.getZoom()
    });
  });
};
export const addZoomListener = (that) => {
  that.map.on('zoom', () => {
    that.printElement('ZOOM');
    that.addMessageToQueue('ZOOM', {
      center: that.map.getCenter(),
      bounds: that.map.getBounds(),
      zoom: that.map.getZoom()
    });
  });
};
export const addMoveListener = (that) => {
  that.map.on('move', () => {
    that.printElement('MOVE');
    that.addMessageToQueue('MOVE', {
      center: that.map.getCenter(),
      bounds: that.map.getBounds(),
      zoom: that.map.getZoom()
    });
  });
};
export const addZoomEndListener = (that) => {
  that.map.on('zoomend', () => {
    that.printElement('ZOOM_END');
    that.addMessageToQueue('ZOOM_END', {
      center: that.map.getCenter(),
      bounds: that.map.getBounds(),
      zoom: that.map.getZoom()
    });
  });
};
export const addMoveEndListener = (that) => {
  that.map.on('moveend', () => {
    that.printElement('moveend');
    that.addMessageToQueue('MOVE_END', {
      center: that.map.getCenter(),
      bounds: that.map.getBounds(),
      zoom: that.map.getZoom()
    });
  });
};
