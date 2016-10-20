<template>
  <div class="mint-loadmore">
    <div class="mint-loadmore-content"
         :class="{ 'is-dropped': topDropped || bottomDropped}"
         :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }"
         v-el:loadmore-content>
      <slot name="top">
        <div class="mint-loadmore-top">
          <roate-fade v-if="topStatus === 'loading'" class="mint-loadmore-spinner" :size="20"
                      type="fading-circle"></roate-fade>
        </div>
      </slot>
      <slot></slot>
      <slot name="bottom">
        <div class="mint-loadmore-bottom">
          <roate-fade v-if="bottomStatus === 'loading'" class="mint-loadmore-spinner" :size="20"
                      type="fading-circle"></roate-fade>
        </div>
      </slot>
    </div>
  </div>
</template>


<script type="text/babel">
  import RoateFade from './c-fade.vue'

  export default {
    components: {
      RoateFade
    },
    name: 'mt-loadmore',
    props: {
      autoFill: {
        type: Boolean,
        default: true
      },
      topDistance: {
        type: Number,
        default: 70
      },
      topMethod: {
        type: Function
      },
      topStatus: {
        type: String,
        default: ''
      },
      bottomDistance: {
        type: Number,
        default: 70
      },
      bottomMethod: {
        type: Function
      },
      bottomStatus: {
        type: String,
        default: ''
      },
      bottomAllLoaded: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        uuid: null,
        translate: 0,
        scrollEventTarget: null,
        containerFilled: false,
        topText: '',
        topDropped: false,
        bottomText: '',
        bottomDropped: false,
        bottomReached: false,
        direction: '',
        startY: 0,
        startScrollTop: 0,
        currentY: 0
      };
    },
    events: {
      onTopLoaded(id) {
        if (id === this.uuid) {
          this.translate = 0;
          setTimeout(() => {
            this.topStatus = 'pull';
          }, 200);
        }
      },
      onBottomLoaded(id) {
        setTimeout(() => {
          this.bottomStatus = 'pull'
        }, 800)
        this.bottomDropped = false;
        if (id === this.uuid) {
          this.$nextTick(() => {
            if (this.scrollEventTarget === window) {
              document.body.scrollTop += 50;
            } else {
              this.scrollEventTarget.scrollTop += 50;
            }
            this.translate = 0;
          });
        }
        if (!this.bottomAllLoaded && !this.containerFilled) {
          this.fillContainer();
        }
      }
    },
    methods: {
      getScrollEventTarget(element) {
        let currentNode = element;
        while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
          let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
          if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
          }
          currentNode = currentNode.parentNode;
        }
        return window;
      },
      getScrollTop(element) {
        if (element === window) {
          return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
        } else {
          return element.scrollTop;
        }
      },
      bindTouchEvents() {
        this.$el.addEventListener('touchstart', this.handleTouchStart);
        this.$el.addEventListener('touchmove', this.handleTouchMove);
        this.$el.addEventListener('touchend', this.handleTouchEnd);
      },
      init() {
        this.topStatus = 'pull';
        this.bottomStatus = 'pull';
        this.scrollEventTarget = this.getScrollEventTarget(this.$el);
        if (typeof this.bottomMethod === 'function') {
          this.fillContainer();
          this.bindTouchEvents();
        }
        if (typeof this.topMethod === 'function') {
          this.bindTouchEvents();
        }
      },
      fillContainer() {
        if (this.autoFill) {
          this.$nextTick(() => {
            if (this.scrollEventTarget === window) {
              this.containerFilled = this.$el.getBoundingClientRect().bottom >= document.documentElement.getBoundingClientRect().bottom
            } else {
              this.containerFilled = this.$el.getBoundingClientRect().bottom >= this.scrollEventTarget.getBoundingClientRect().bottom
            }
            if (!this.containerFilled) {
              this.bottomStatus = 'loading'
              this.bottomMethod(this.uuid)
            }
          });
        }
      },
      checkBottomReached() {
        if (this.scrollEventTarget === window) {
          return document.body.scrollTop + document.documentElement.clientHeight === document.body.scrollHeight;
        } else {
          return this.$el.getBoundingClientRect().bottom === this.scrollEventTarget.getBoundingClientRect().bottom;
        }
      },
      handleTouchStart(event) {
        this.startY = event.touches[0].clientY;
        this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
        this.bottomReached = false;
        if (this.topStatus !== 'loading') {
          this.topStatus = 'pull';
          this.topDropped = false;
        }
        if (this.bottomStatus !== 'loading') {
          this.bottomStatus = 'pull';
          this.bottomDropped = false;
        }
      },
      handleTouchMove(event) {
        if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
          return;
        }
        this.currentY = event.touches[0].clientY;
        let distance = this.currentY - this.startY;
        this.direction = distance > 0 ? 'down' : 'up';
        if (typeof this.topMethod === 'function' && this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== 'loading') {
          event.preventDefault();
          event.stopPropagation();
          this.translate = distance - this.startScrollTop;
          if (this.translate < 0) {
            this.translate = 0;
          }
          this.topStatus = this.translate >= this.topDistance ? 'drop' : 'pull';
        }
        if (this.direction === 'up') {
          this.bottomReached = this.bottomReached || this.checkBottomReached();
        }
        if (typeof this.bottomMethod === 'function' && this.direction === 'up' && this.bottomReached && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {
          event.preventDefault();
          event.stopPropagation();
          this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
          if (this.translate > 0) {
            this.translate = 0;
          }
          this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
        }
      },
      handleTouchEnd() {
        if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
          this.topDropped = true;
          if (this.topStatus === 'drop') {
            this.translate = '50';
            this.topStatus = 'loading';
            this.topMethod(this.uuid);
          } else {
            this.translate = '0';
            this.topStatus = 'pull';
          }
        }
        if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
          this.bottomDropped = true;
          this.bottomReached = false;
          if (this.bottomStatus === 'drop') {
            this.translate = '-50';
            this.bottomStatus = 'loading';
            this.bottomMethod(this.uuid);
          } else {
            this.translate = '0';
            this.bottomStatus = 'pull';
          }
        }
        this.direction = '';
      }
    },
    ready() {
      this.uuid = Math.random().toString(36).substring(3, 8);
      this.init();
    }
  };
</script>
