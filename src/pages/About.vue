<template>
  <article :class="$style.About">
    <h1>How it works</h1>
    <p>Making all those little fluffies that live in the clouds. Let's build some happy little clouds up here. Maybe there's a happy little Evergreen that lives here. Painting should do one thing. It should put happiness in your heart. Let your imagination be your guide.</p>
    <p>I'm sort of a softy, I couldn't shoot Bambi except with a camera. Let's make a happy little mountain now. Life is too short to be alone, too precious. Share it with a friend. We'll take a little bit of Van Dyke Brown. We don't have to be committed. We are just playing here.</p>
    <p>Just pretend you are a whisper floating across a mountain. You don't have to be crazy to do this but it does help. There isn't a rule. You just practice and find out which way works best for you.</p>
    <p>This is the fun part Let's build an almighty mountain. We can fix anything. A happy cloud.</p>
    <p>This is truly an almighty mountain. You need the dark in order to show the light. We're not trying to teach you a thing to copy. We're just here to teach you a technique, then let you loose into the world.</p>
    <p>All kinds of happy little splashes. Just use the old one inch brush. A little happy sunlight shining through there.</p>
    <p>Everybody needs a friend. Pretend you're water. Just floating without any effort. Having a good day. I really recommend you use odorless thinner or your spouse is gonna run you right out into the yard and you'll be working by yourself.</p>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AboutPage extends Vue {}
</script>

<style lang="stylus" module>
@require '../styles/container';

.About {
  container();
}
</style>
