/*
 * @Author: Ranran
 * @Date: 2018-07-31 20:36:09
 * @LastEditors: Ranran
 * @LastEditTime: 2018-08-01 00:35:12
 * @Description: 
 * @Email: ranran0036@163.com
 * @GitHub: github.com/LingsRanran
 */

//实现插件 + 实现轮播图功能

//$.fn.extend  自动轮播

(function($){
    //实现轮播图功能
    function Slider(ele,opt){
        let d = {
            curDisplay:0,
            autoPlay:false,
            interval:2000
        };

        this.opts = $.extend({},d,opt);

        this.wrap = ele;
        this.curDisplay = this.opts.curDisplay;
        this.$img = this.wrap.find('img');
        this.imgLen = this.$img.length;
        this.nowIndex = 0;
        this.autoPlay = this.opts.autoPlay;
        this.timer = null;
        this.interval = this.opts.interval;
        this.switch = true;

        this.init();
    }

    Slider.prototype.init = function(){
        let self = this;
        self.initMove();
        self.bindEvent();
    }

    Slider.prototype.initMove = function(){
        let self = this;
        let hLen = Math.floor(self.imgLen / 2);
        let lNum , rNum;
        for (var i = 0; i < hLen; i++) {
            lNum = self.curDisplay - i - 1;
            self.$img.eq(lNum).css({
                transform: 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(30deg)'
            })
            rNum = self.curDisplay + i + 1;
            if (rNum > self.imgLen - 1) {
                rNum -= this.imgLen;
            }
            self.$img.eq(rNum).css({
                transform: 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(-30deg)'
            });
            this.$img.removeClass('on');
        }
        self.$img.eq(self.curDisplay).css({
            transform: 'translateZ(300px)'
        }).addClass('on');
        this.wrap.on('transitionend', function () {
            self.switch = true;
        })
    }

    Slider.prototype.bindEvent = function(){
        let self = this;
        self.$img.on('click', function () {
            if (self.switch && !$(this).hasClass('on')) {
                self.switch = false;
                self.nowIndex = $(this).index();
                self.moving(self.nowIndex);
            }
        }).hover(function () {
            clearInterval(self.timer);
        }, function () {
            self.timer = setInterval(function () {
                self.play();
            }, self.interval);
        });
        this.timer = setInterval(function () {
            self.play();
        }, this.interval);
    }

    Slider.prototype.moving = function(index){
        this.curDisplay = index;
        this.initMove();
    }

    Slider.prototype.play = function(){
        if(this.autoPlay){
            if(this.nowIndex == this.imgLen -1){
                this.nowIndex = 0;
            }else{
                this.nowIndex++;
            }
            this.moving(this.nowIndex);
        }
    }

    //扩展插件
    $.fn.extend({
        slider:function(options){
            new Slider(this,options);
        }
    })
})(jQuery);