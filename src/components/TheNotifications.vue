<template>
  <div
    role="alert"
    :class="$style.Notification"
    :show="show"
    @click="hide"
    :type="type"
  >{{show ? notification.message : null}}</div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import INotification from '../interfaces/Notification'

const NOTIFICATION_DURATION = 2000

@Component
export default class TheNotifications extends Vue {
  @Getter private notification: INotification | null
  @Action private removeNotification: () => void

  private hide() {
    this.removeNotification()
  }

  get type() {
    if (this.notification && this.notification.type) {
      return this.notification.type
    }
  }

  get show() {
    return this.notification && this.notification.message
  }

  @Watch('notification')
  private onNotificationChange(newValue: INotification | null) {
    if (newValue && newValue.message) {
      setTimeout(() => this.hide(), NOTIFICATION_DURATION)
    }
  }
}
</script>

<style lang="stylus" module>
@require '../styles/config';

.Notification {
  padding: $spacingBase;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  text-align: center;
  background: #fff;
  z-index: $zIndexTop;
  font-weight: 500;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 1rem;
  opacity: 0;
  transform: translate3d(0, -50%, 0) scale3d(1, 0, 1);
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);

  &[type='error'] {
    background: $colorRed;
    color: #fff;
  }

  &[show] {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  }
}
</style>
