<template>
  <main>
    <input type="text" v-model="input" placeholder="Enter a URL" />
    <section id="top">
      <div class="entry">
        <label for="domain">Domain</label>
        <span id="domain">{{ parsed.domain }}</span>
      </div>
    </section>
    <section id="lists">
      <div class="entry">
        <label for="path">Path</label>
        <span id="path">
          <ol v-if="parsed.path.length === 0">
            <li class="empty">--</li>
          </ol>
          <ol v-else>
            <li v-for="entry in parsed.path">{{ entry }}</li>
          </ol>
        </span>
      </div>
      <div class="entry">
        <label for="query">Query</label>
        <span id="query">
          <ul v-if="parsed.query.length === 0">
            <li class="empty">--</li>
          </ul>
          <ul v-else>
            <li v-for="[k, v] in parsed.query">{{ k }}: {{ v }}</li>
          </ul>
        </span>
      </div>
    </section>
    <section id="misc">
      <div class="entry">
        <label for="protocol">Protocol</label>
        <span id="protocol">{{ parsed.protocol }}</span>
      </div>
      <div class="entry">
        <label for="port">Port</label>
        <span id="port">{{ parsed.port }}</span>
      </div>
      <div class="entry">
        <label for="fragment">Fragment</label>
        <span id="fragment">{{ parsed.fragment }}</span>
      </div>
      <div class="entry">
        <label for="user">User</label>
        <span id="user">{{ parsed.user }}</span>
      </div>
      <div class="entry">
        <label for="password">Password</label>
        <span id="password">{{ parsed.password }}</span>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUrl } from './composables/url';

const input = ref('');
const parsed = computed(() => useUrl(input));
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--size__2);
}

input {
  width: 100%;

  background-color: var(--color__background);
  border: none;
  text-decoration: underline 4px solid var(--color__primary);

  font-family: var(--font__heading);
  color: var(--color__text);
  font-size: var(--font-size__2);
  padding: var(--size__1);
  text-align: center;
}

section {
  display: flex;

  font-family: var(--font__body);

  span {
    color: var(--color__text);
  }

  .entry {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--size__05);

    label {
      font-size: var(--font-size__1);
      color: color-mix(in srgb, var(--color__text), transparent);
    }
  }
}

ul,
ol,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

#domain {
  font-size: var(--font-size__3);
}

#top {
  border-left: 4px solid var(--color__primary);
  padding-left: var(--size__1);
}

#lists {
  gap: var(--size__2);
}

#path {
  ol {
    display: flex;
    flex-direction: column;
  }

  li:not(.empty)::before {
    content: '/';
    color: color-mix(in srgb, var(--color__text), transparent);
  }
}

#query {
  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    font-family: var(--font__monospace);

    &:first-of-type::before {
      content: '?';
    }

    &::before {
      color: color-mix(in srgb, var(--color__text), transparent);
      content: '&';
    }

    &.empty::before {
      content: '';
    }
  }
}

#misc {
  gap: var(--size__2);

  span {
    font-family: var(--font__monospace);
  }
}
</style>
