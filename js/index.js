/*
 * @Author: Ranran
 * @Date: 2018-07-31 20:36:09
 * @LastEditors: Ranran
 * @LastEditTime: 2018-07-31 21:23:27
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
            autoPlay:true,
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

        this.init();
    }

    Slider.prototype.init = function(){
        this.initMove();
        this.bindEvent();
    }

    Slider.prototype.initMove = function(){
        let self = this;
        let hLen = Math.floor(self.imgLen / 2);
        let lNum , rNum;
        for(let i=0;i<hLen;i++){
            lNum = self.curDisplay - i - 1;
            self.$img.eq(lNum).css({
                transform:'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px)'
            });
            rNum = self.curDisplay + i + 1;
            self.$img.eq(rNum).css({
                transform:'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (200 + i * 100) + 'px)'
            });

            self.$img.eq(self.curDisplay).css({
                transform:'translateZ(300px)'
            });
        }
    }

    Slider.prototype.bindEvent = function(){
        let self = this;
        self.$img.on('click',function(){
            self.nowIndex = $(this).index();
            self.moving(self,nowIndex);
        }).hover(function(){
            clearInterval(self.timer);
        },function(){
            this.timer = setInterval(function(){
                self.play();
            },self.interval)
        });

        this.timer = setInterval(function(){
            self.play();
        },self.interval)

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