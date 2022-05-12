<template>
  <div id="app" :style="{ overflowY: mobileNav ? 'hidden' : null }">
    <transition name="slidedown">
      <div class="notice" v-if="showNotice">
        <p>Připoj se na náš <a href="https://discord.gg/adisbak">Discord</a></p>
        <eva-icon name="close" fill="white" width="16" height="16" @click="showNotice = false"></eva-icon>
      </div>
    </transition>

    <nav class="container">
      <router-link to="/" class="logo">
        <div class="icon-container">
          <img :src="require(`./assets/${logo}.png`)">
        </div>
        <p><span>Vanguard</span></p>
      </router-link>
      <div>
        <router-link to="/atomic">Atomic</router-link>
        <router-link to="/aether">Dark Aether</router-link>
        <router-link to="/settings" class="icon settings" content="Nastavení" v-tippy="{ placement: 'bottom' }">
          <eva-icon name="settings-2-outline" fill="white"></eva-icon>
        </router-link>
      </div>
      <eva-icon class="mobile-nav-toggle" name="menu" fill="white" @click="mobileNav = !mobileNav"></eva-icon>
    </nav>

    <transition name="fade">
      <nav class="mobile" v-if="mobileNav">
        <div class="header">
          <router-link to="/" class="logo">
            <div class="icon-container">
              <img :src="require(`./assets/${logo}.png`)">
            </div>
            <p><span>Vanguard</span></p>
          </router-link>
          <eva-icon name="close" fill="white" @click="mobileNav = !mobileNav"></eva-icon>
        </div>
        <div>
          <router-link to="/atomic">Atomic</router-link>
          <router-link to="/aether">Dark Aether</router-link>
        </div>
        <div class="footer">
          <router-link to="/settings">Nastavení</router-link>
          <router-link to="/about">Informace</router-link>
          <a href="https://github.com/carlssonemil/vanguard">GitHub</a>

          <div class="info">
            <div>
              <p>Hledáš jiný trackery na kamufláže? 😎</p>

              <div class="buttons">
                <a href="https://damascus.vercel.app/">
                  <img :src="require(`./assets/damascus.png`)">
                  <span>Modern Warfare (2019)</span>
                </a>
                <a href="https://coldwar.vercel.app/">
                  <img :src="require(`./assets/coldwar.png`)">
                  <span>Black Ops Cold War</span>
                </a>
              </div>
            </div>
          </div>

          <a href="https://discord.gg/adisbak" class="button">Připoj se na náš Discord</a>
        </div>
      </nav>
    </transition>

    <main>
      <router-view/>
    </main>

    <footer class="container">
      <div>Vytvořil <a href="https://emilcarlsson.se/">Emil Carlsson</a></div>
      <div>Upravil <a href="https://twitch.tv/arcade0x">Arcade0X</a></div>
      
      <div>
        <router-link to="/about">Informace</router-link>
        <a href="https://github.com/carlssonemil/vanguard">GitHub</a>
      </div>
    </footer>

    <notifications position="top center">
      <template slot="body" slot-scope="props">
        <div class="notification" :class="props.item.type" @click="props.close">
          <p class="title">{{ props.item.title }}</p>
          <eva-icon class="remove" name="close" fill="white" width="18" height="18"></eva-icon>
        </div>
      </template>
    </notifications>

    <Debug v-if="!production" />
  </div>
</template>

<script>
import Debug from '@/components/Debug.vue'

export default {
  components: {
    Debug,
  },

  data() {
    return {
      production: process.env.NODE_ENV === 'production',
      mobileNav: false,
      showNotice: false
    }
  },

  computed: {
    logo() {
      return this.$route.name === 'Aether' ? 'aether' : 'atomic';
    }
  },

  watch: {
    $route() {
      this.mobileNav = false;
    }
  },

  async beforeCreate() {
    await this.$store.dispatch('getStoredData');
  },

  mounted() {
    setTimeout(() => {
      this.showNotice = true;
    }, 15000);
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import '@/scss/main';

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
