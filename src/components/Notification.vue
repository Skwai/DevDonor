<template>
  <div
    role="alert"
    class="Notification"
    :class="[ { '-show': notification }, typeClassName ]"
    @click="hide"
  >{{notification ? notification.message : null}}</div>
</template>

<script>
import { mapGetters } from 'vuex'

const NOTIFICATION_DURATION = 2000

export default {
  computed: {
    typeClassName () {
      return this.notification && this.notification.type ? `Notification--${this.notification.type}` : null
    },
    ...mapGetters([
      'notification'
    ])
  },

  methods: {
    hide () {
      this.$store.dispatch('removeNotification')
    }
  },

  watch: {
    notification (newVal) {
      if (newVal) {
        setTimeout(() => this.$store.dispatch('removeNotification'), NOTIFICATION_DURATION)
      }
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config"

.Notification
  padding: spacingBase
  position: fixed
  left: 0
  top: 0
  width: 100%
  text-align: center
  background: colorDarkBlue
  z-index: zIndexCover
  color: #fff
  font-weight: 500
  font-size: 1.125rem
  box-shadow: rgba(0,0,0,.2) 0 2px 1rem
  opacity: 0
  transform: translate3d(0, -50%, 0) scale3d(1, 0, 1)
  transition: 0.3s
  transition-timing-function: cubic-bezier(0.7,0,0.3,1)

  &--success
    background: colorGreen

  &--info
    background: colorPrimaryBlue

  &--error
    background: colorRed

  &.-show
    opacity: 1
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1)
</style>
