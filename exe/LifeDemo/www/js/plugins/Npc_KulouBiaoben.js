// 判断周围是否有查询的事件
function handleHaveEvent(eventId, targetId, variableId) {
    // 获取本事件的引用
    var event = $gameMap.event(eventId);
    var targetEvent = $gameMap.event(targetId);

    // 获取本事件的坐标
    var x = event.x;
    var y = event.y;

    // 输入的事件ID（你需要在这里设置输入的事件ID）
    var targetEventId = targetId;

    // 判断上方格子是否有目标事件
    var eventAbove = $gameMap.eventsXy(x, y - 1).some(function(e) {
        return e._eventId === targetEventId;
    });

    // 判断下方格子是否有目标事件
    var eventBelow = $gameMap.eventsXy(x, y + 1).some(function(e) {
        return e._eventId === targetEventId;
    });

    // 判断左边格子是否有目标事件
    var eventLeft = $gameMap.eventsXy(x - 1, y).some(function(e) {
        return e._eventId === targetEventId;
    });

    // 判断右边格子是否有目标事件
    var eventRight = $gameMap.eventsXy(x + 1, y).some(function(e) {
        return e._eventId === targetEventId;
    });

    // 判断是否有指定事件
    if (eventAbove || eventBelow || eventLeft || eventRight) {
        $gameVariables.setValue(variableId, 2);
        // 停止事件的移动路线
        event._moveRouteForcing = false;
        event._moveRoute = { list: [], repeat: false, skippable: false, wait: false };
        event._moveRouteIndex = 0;

        //var direction = event.findDirectionTo(targetEvent.x, targetEvent.y);
        //event.setDirection(direction);

        // event._mapId = $gameMap.mapId();
        // event._eventId = eventId;
        // event._switchName = 'C';
        // $gameSelfSwitches.setValue([event._mapId, event._eventId, event._switchName], true);
    }
}

// 判断目标事件在此事件的方向并转向
function setEventDirection(eventId, targetId)
{
    // 获取事件1和事件2的引用
    var event1 = $gameMap.event(eventId);
    var event2 = $gameMap.event(targetId);

    // 计算事件1朝向事件2的方向
    var direction = event1.findDirectionTo(event2.x, event2.y);

    // 设置事件1的朝向
    event1.setDirection(direction);
};

// 设置此事件的独立事件
function setEventIndependence(eventId, ind)
{
    var event = $gameMap.event(eventId);
    event._mapId = $gameMap.mapId();
    event._eventId = eventId;
    event._switchName = ind;
    $gameSelfSwitches.setValue([event._mapId, event._eventId, event._switchName], true);
};

// 保存场景状态
function saveSceneState() {
    // 保存事件的位置
    $gameMap.events().forEach(function(event) {
        event._savedX = event.x;
        event._savedY = event.y;
    });

    // 保存变量和开关状态
    $gameVariables._savedValues = $gameVariables._data.slice();
    $gameSwitches._savedValues = $gameSwitches._data.slice();
}

// 恢复场景状态
function restoreSceneState() {
    // 恢复事件的位置
    $gameMap.events().forEach(function(event) {
        if (event._savedX !== undefined && event._savedY !== undefined) {
            event.setPosition(event._savedX, event._savedY);
        }
    });

    // 恢复变量和开关状态
    $gameVariables._data = $gameVariables._savedValues.slice();
    $gameSwitches._data = $gameSwitches._savedValues.slice();
}

// 创建图片
function createImg(imgName) {
    var customSprite = new Sprite();
    customSprite.bitmap = ImageManager.loadPicture(imgName);
    SceneManager._scene.addChild(customSprite);
    //customSprite.visible = true; // 显示图片
}

// 回到标题
function returnTitle()
{
    SceneManager.goto(Scene_Title);
}
