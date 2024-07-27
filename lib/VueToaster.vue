<script setup lang="ts">
import { useVueToaster } from './useVueToasterProvider'

const { deleteToast, toasterItems, teleportName } = useVueToaster()
</script>

<template>
  <Teleport :to="teleportName">
    <div class="toaster">
      <TransitionGroup name="toaster" :duration="700">
        <div
          v-for="toast in toasterItems"
          :key="toast.createdAt"
          :class="['toaster__item', toast.isError && 'toaster__item--error']"
          @click="deleteToast(toast.createdAt)"
          v-text="toast.message"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.toaster {
  @apply text-white font-base text-[14px] font-bold w-full fixed bottom-6 
    flex flex-col items-center justify-end gap-2 justify-self-center pointer-events-none;

  &__item {
    @apply text-white bg-slate-600 px-[30px] py-[8px] rounded-full cursor-pointer pointer-events-auto;

    &--error {
      @apply bg-misc;
    }
  }

  &-move,
  &-enter-active,
  &-leave-active {
    @apply transition-all duration-700;
  }

  &-enter-from,
  &-leave-to {
    @apply opacity-0 transform translate-y-[30px];
  }

  &-leave-active {
    @apply absolute;
  }
}
</style>
