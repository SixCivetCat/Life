function checkPlayerNearEvent(eventId) {
    var event = $gameMap.event(eventId);
    var sx = Math.abs(event.deltaXFrom($gamePlayer.x));
    var sy = Math.abs(event.deltaYFrom($gamePlayer.y));
    if (sx + sy === 1) {
        event._mapId = $gameMap.mapId();
        event._eventId = eventId;
        event._switchName = 'A';
        $gameSelfSwitches.setValue([event._mapId, event._eventId, event._switchName], true);
    }
}