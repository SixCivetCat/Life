//=============================================================================
// RPG Maker MZ - Picture_Fade
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 图片淡入淡出
 * @version 1.1
 * @author Kato Marine
 *
 * @help Picture_Fade.js
 *
 * 此插件在事件脚本中使用！
 * 此插件用不到插件命令。
汉化:硕明云书
 
  =====图片淡入淡出效果====
 * $gameScreen.Picture_Fade(图片ID、透明度、帧数);
 * 
 * 例：  图片1 的透明度为255(完全显示)显示的时间为60帧
 * $gameScreen.Picture_Fade(1, 255, 60);
 * 
 * 
 =====图片滑动效果====
 例子：
 $gameScreen.Picture_Fade(1, 255, 300, 0, 300, 200, 2, 0);
 
 * $gameScreen.Picture_Fade(图片ID， 透明度，帧数， 速度， X 坐标， Y 坐标， 放大倍率 X， 缩放 Y);
 * 如果你像这样在后面添加参数，它会起作用。
 * 
 * 浮动速度指：
 * 0: 恒速 1：慢启动 2：慢慢结束 3：慢启动+慢慢结束
 * 
 */

(() => {

    Game_Screen.prototype.Picture_Fade = function (numset, opaset, duraset, easingType, plusX, plusY, scaleX, scaleY) {

        var pic = $gameScreen._pictures[$gameScreen.realPictureId(numset)];
        if (pic) {

        if (easingType == null) { easingType = 0; }
        if (plusX == null) { plusX = 0; }
        if (plusY == null) { plusY = 0; }
        if (scaleX == null) { scaleX = pic._targetScaleX; }
        if (scaleY == null) { scaleY = pic._targetScaleY; }
        
            pic.move(pic._origin, pic._targetX + plusX, pic._targetY + plusY, scaleX, scaleY, opaset, pic._blendMode, duraset, easingType);
        }

    }

})();
