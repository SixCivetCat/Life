(function() {
  function Window_Custom() {
      this.initialize.apply(this, arguments);
  }

  Window_Custom.prototype = Object.create(Window_Base.prototype);
  Window_Custom.prototype.constructor = Window_Custom;

  Window_Custom.prototype.initialize = function(x, y, text) {
      var width = 200; // 初始宽度
      var height = 72; // 初始高度
      Window_Base.prototype.initialize.call(this, x, y, 140, 100);
      this.opacity = 0;
      this.contents.fontSize = 10; // 修改字体大小
      this.contents.textColor = '#000000'; // 修改字体颜色，这里是红色
      this.contents.outlineColor = 'rgba(0, 0, 0, 0)'; // 去掉描边
      this._text = text;
      this._textLines = this._text.split('&');
      this._currentLine = 0;
      this._textIndex = 0;
  };

  Window_Custom.prototype.update = function() {
      Window_Base.prototype.update.call(this);
      if (this._currentLine >= this._textLines.length) {
        return;
      }
      if (this._currentLine < this._textLines.length) {
          if (this._textIndex < this._textLines[this._currentLine].length) {
              var character = this._textLines[this._currentLine][this._textIndex];
              var x = this._textIndex * this.textWidth('啤');
              var y = this._currentLine * 20;
              this.drawText(character, x, y + 5);
              this._textIndex++;
          } else {
              this._currentLine++;
              this._textIndex = 0;
          }
      }
  };

  Game_Screen.prototype.createQipao = function(eventId, text) {
      var event = $gameMap.event(eventId);
      var x = event.screenX() -20;
      var y = event.screenY() -135;

      var customSprite = new Sprite();
      customSprite.bitmap = ImageManager.loadPicture('YourPictureName');
      customSprite.visible = false; // 隐藏图片
      SceneManager._scene.addChild(customSprite);

      var customWindow = new Window_Custom(x, y, text);
      SceneManager._scene.addChild(customWindow);
      var bl = true;
      SceneManager._scene.update = function() {
          Scene_Map.prototype.update.call(this);
          if (customSprite && customWindow) {
              var event = $gameMap.event(eventId);
              var x = event.screenX() -20;
              var y = event.screenY() -135;
              customSprite.x = x;
              customSprite.y = y;
              customWindow.x = x - 10;
              customWindow.y = y - 5;

              if (!customSprite.visible) {
                customSprite.visible = true; // 显示图片
              }
              if (customWindow._currentLine >= customWindow._textLines.length) {
                setTimeout(function() {
                  if(customSprite)
                  {
                    SceneManager._scene.removeChild(customSprite);
                    customSprite.bitmap = null;
                    customSprite = null;
                  }

                  if(customWindow)
                  {
                    SceneManager._scene.removeChild(customWindow);
                    customWindow.contents.clear();
                    customWindow = null;
                  }
                  SceneManager._scene.updateCustomWindow = null; // 删除自定义窗口的更新方法
                  if(bl)
                  {
                    bl = false;
                    $gameVariables.setValue(2, 1);
                  }
                }, 2000); // 等待1秒后删除图片和文本
              }
          }
      };
  }
})();