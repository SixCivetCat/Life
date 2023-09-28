/*:
 * @plugindesc [v0.1] 移动键位插件
 * @author 兰萨
 *
 * @param moveSpeed
 * @type number
 * @desc 如果设置为空，则会被设置为默认值4，（范围1~6），初始值为1
 * @default 4
 *
 * @help 此插件可将WASD键位用于玩家角色移动
 * 按住shift键和WASD中的任意一个按键即可加速
 * 如果需要关闭加速效果可在事件脚本中输入：globalAccelerateSwitch.closeSwitch();
 * 打开加速效果可在事件脚本中输入：globalAccelerateSwitch.openSwitch();
 *
 * ============================================================================
 *  关于插件使用协议
 * ============================================================================
 *
 *  本插件协议：MIT
 *  如果你使用了本插件，请在致谢中包含'LanSa'或者'兰萨'，非常感谢！
 */

(function () {

    Input.keyMapper[65] = 'left';
    Input.keyMapper[68] = 'right';
    Input.keyMapper[83] = 'down';
    Input.keyMapper[87] = 'up';
    Input.keyMapper[221] = 'pagedown';

    // 监听键盘按下事件
    document.addEventListener('keydown', function (event) {
        const keyCode = event.keyCode;
        if (event.shiftKey && (keyCode === 87 || keyCode === 65 || keyCode === 83 || keyCode === 68)) {
            // 设置新的移动速度
            if (globalAccelerateSwitch.isOpen) {
                let moveSpeed = stringToNumber(getPluginsParam("moveSpeed"), 4)
                $gamePlayer.setMoveSpeed(moveSpeed);
            }
        }
    });


    // 监听键盘释放事件
    document.addEventListener('keyup', function (event) {
        const keyCode = event.keyCode;
        switch (keyCode) {
            case 87: // W键
            case 65: // A键
            case 83: // S键
            case 68: // D键
                if (globalAccelerateSwitch.isOpen) {
                    if (!isNaN($gamePlayer.moveSpeed) && $gamePlayer.moveSpeed !== 1) {
                        $gamePlayer.setMoveSpeed(1);
                    }
                }
                break;
        }
    });

    /**
     * 获取插件的任意参数值
     * @param param
     * @returns {*}
     */
    function getPluginsParam(param) {
        return PluginManager.parameters('LanSa_MovePlugin')[param];
    }

    /**
     * 字符串转数字
     * isNaN(str)：用于判断给定的值是否是一个有效的数字。如果 str 不是数字，isNaN(str) 将返回 true，否则返回 false。
     * +(str || def)：这部分的目的是将字符串转换为数字。str || def 会选择 str，但如果 str 是空字符串或 null 或 undefined，就会选择 def（默认值）。然后 + 运算符将这个值转换为数字。
     * @param str
     * @param def 默认值
     * @returns {*|number}
     */
    function stringToNumber(str, def) {
        return isNaN(str) ? def : +(str || def);
    }

})();

const globalAccelerateSwitch = {
    isOpen: true,
    closeSwitch() {
        this.isOpen = false
    },
    openSwitch() {
        this.isOpen = true
    }
}

