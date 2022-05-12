<template>
  <div class="filters">
    <div class="select" v-if="'category' in filters">
      <label for="category">Kategorie</label>
      <select id="category" v-model="filters.category" @change="filterChange()">
        <option value="null">Všechny zbraně</option>
        <option v-for="(category, index) in categoryOptions" :key="index" :value="category">
          {{ category }}
        </option>
      </select>
      <eva-icon name="chevron-down" fill="white"></eva-icon>
    </div>

    <div class="checkbox" v-if="'hideCompleted' in filters">
      <label for="hideCompleted" :class="{ checked: filters.hideCompleted }">
        <input id="hideCompleted" type="checkbox" v-model="filters.hideCompleted" @change="filterChange()">
        <span>Schovat hotové</span>
      </label>
    </div>

    <div class="checkbox" v-if="'hideNonRequired' in filters">
      <label for="hideNonRequired" :class="{ checked: filters.hideNonRequired }">
        <input id="hideNonRequired" type="checkbox" v-model="filters.hideNonRequired" @change="filterChange()">
        <span>Schovat nevyžadované</span>
      </label>
    </div>

    <div class="symbols" v-if="showSymbols">
      <eva-icon class="info" 
                name="question-mark-circle" 
                fill="white" 
                v-tippy="{ placement: 'bottom' }" 
                :content="'Pro Diamond kamufláž stačí udělat určitý počet zbraní na Gold. Například pro Assault Rifles stačí udělat 7 zbraní na Gold a budeš mít Diamond kamufláž.'"></eva-icon>
      <div class="info mobile">
        <eva-icon name="question-mark-circle" fill="white"></eva-icon>
        <p>Pro Diamond kamufláž stačí udělat určitý počet zbraní na Gold. Například pro Assault Rifles stačí udělat 7 zbraní na Gold a budeš mít Diamond kamufláž.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filters',

  props: ['type', 'showSymbols'],

  computed: {
    filters() {
      return { ...this.$store.state.filters[this.type] };
    },

    categoryOptions() {
      return Array.from(new Set(this.$store.state.weapons.map(i => i.category)));
    }
  },

  methods: {
    filterChange() {
      let type = this.type;
      let filters = this.filters;

      this.$store.dispatch('setFilters', { type, filters });
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  align-items: center;
  display: flex;
  margin-bottom: 50px;

  @media (max-width: $tablet) {
    align-items: flex-start;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 75px;
  }

  > *:not(:first-child) {
    margin-left: 50px;

    @media (max-width: $tablet) {
      margin-left: 0;
      margin-top: 25px;
    }
  }

  > .checkbox:nth-last-of-type(2) {
    flex: 1 1 auto;
  }

  .symbols {
    cursor: default;

    @media (max-width: $tablet) {
      margin-top: 35px;
    }

    .info {
      cursor: pointer;
      opacity: .5;
      transition: $transition;

      &:hover {
        opacity: .75;
      }

      &.mobile {
        align-items: center;
        background: darken($elevation-9-color, 10%);
        border-radius: $border-radius;
        cursor: default;
        display: none;
        margin-top: 15px;
        padding: 25px;
        position: relative;

        i {
          align-items: center;
          background: $background-color;
          border-radius: 100%;
          display: flex;
          height: 28px;
          justify-content: center;
          left: -10px;
          position: absolute;
          top: -10px;
          transform: scale(1.5);
          width: 28px;

          ::v-deep svg {
            position: relative;
            top: -1px;
          }
        }

        &:hover {
          opacity: .5;
        }
      }

      @media (max-width: $tablet) {
        &:not(.mobile) {
          display: none;
        }

        &.mobile {
          display: flex;
        }
      }
    }
  }

  button {
    align-self: flex-end;
  }
}
</style>