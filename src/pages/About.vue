<template>
  <AppPage>
    <AppHeading>About this website</AppHeading>
    <div>
      <h2>What's in it for charities?</h2>
      <p>DevDonor was created to allow developers and charities to easily connect.</p>
      <p>I'm sort of a softy, I couldn't shoot Bambi except with a camera. Let's make a happy little mountain now. Life is too short to be alone, too precious. Share it with a friend. We'll take a little bit of Van Dyke Brown. We don't have to be committed. We are just playing here.</p>

      <h2>What's in it for programmers?</h2>
      <p>Making all those little fluffies that live in the clouds. Let's build some happy little clouds up here. Maybe there's a happy little Evergreen that lives here. Painting should do one thing. It should put happiness in your heart. Let your imagination be your guide.</p>
      <p>Just pretend you are a whisper floating across a mountain. You don't have to be crazy to do this but it does help. There isn't a rule. You just practice and find out which way works best for you.</p>
    </div>
  </AppPage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AboutPage extends Vue {}
</script>
