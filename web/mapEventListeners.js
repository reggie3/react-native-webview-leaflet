export const addZoomListener = () => {
    const that = this;
    this.map.on('zoom', (e) => {
        // that.printElement(`zoom`);
        that.addMessageToQueue('ZOOM', {
            center: that.map.getCenter(),
            bounds: that.map.getBounds()
        });
    });
}
export const addMoveListener = () => {
    const that = this;
    this.map.on('move', (e) => {
        // that.printElement(`move`);
        that.addMessageToQueue('MOVE', {
            center: that.map.getCenter(),
            bounds: that.map.getBounds()
        });
    });
}
export const addZoomEndListener = () => {
    const that = this;
    this.map.on('zoomend', (e) => {
        // that.printElement(`zoomend`);
        that.addMessageToQueue('ZOOM_END', {
            center: that.map.getCenter(),
            bounds: that.map.getBounds()
        });
    });
}
export const addMoveEndListener = () => {
    const that = this;
    this.map.on('moveend', (e) => {
        // that.printElement(`moveend`);
        that.addMessageToQueue('MOVE_END', {
            center: that.map.getCenter(),
            bounds: that.map.getBounds()
        });
    });

}