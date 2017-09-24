<template>
  <div
    role="alert"
    class="Notification"
    v-if="notification"
    @click="hide"
  >
    {{notification.message}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const NOTIFICATION_DURATION = 1000

export default {
  computed: {
    ...mapGetters([
      'notification'
    ])
  },

  'store.watch' (state) {
    console.log(state)
  },

  methods: {
    hide () {
      this.$store.dispatch('removeNotification')
    }
  },

  watch: {
    notification (newVal) {
      if (newVal) {
        this.setTimeout(() => this.$store.dispatch('removeNotification'), NOTIFICATION_DURATION)
      }
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config"

@keyframes notification
  from
    opacity: 0
    transform: translate3d(0, -50%, 0) scale3d(1, 0, 1)
  to
    opacity 1
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1)

.Notification
  padding: spacingBase
  position: fixed
  left: 0
  top: 0
  width: 100%
  text-align: center
  background: colorGreen
  z-index: zIndexCover
  color: #fff
  font-weight: 500
  animation-name: notification
  animation-duration: 0.3s
  animation-timing-function: cubic-bezier(0.7,0,0.3,1)
  animation-fill-mode: both;
  font-size: 1.125rem
  box-shadow: rgba(0,0,0,.2) 0 2px 1rem
</style>
