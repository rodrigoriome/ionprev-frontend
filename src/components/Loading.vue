<template>
  <div class="loading">
    <div class="loading-bars">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$scale: 2;

.loading {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: transparent;

  &-bars {
    display: inline-grid;
    grid-template-columns: repeat(3, $scale * 3px);
    grid-column-gap: $scale * 2px;
    position: relative;
    div {
      display: block;
      width: 100%;
      height: $scale * 10px;
      background-color: #3f51b5;
      border: 1px solid darken(#3f51b5, 5);
      opacity: 0.5;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      &:nth-child(1) {
        animation-name: loading-1;
      }
      &:nth-child(2) {
        animation-name: loading-2;
      }
      &:nth-child(3) {
        animation-name: loading-3;
      }
    }
  }
}

@keyframes loading-1 {
  0% {
    transform: scaleY(1);
    opacity: 0.5;
  }
  15% {
    transform: scaleY(1.6);
    opacity: 1;
  }
  30% {
    transform: scaleY(1);
    opacity: 0.5;
  }
}
@keyframes loading-2 {
  15% {
    transform: scaleY(1);
    opacity: 0.5;
  }
  30% {
    transform: scaleY(1.6);
    opacity: 1;
  }
  45% {
    transform: scaleY(1);
    opacity: 0.5;
  }
}
@keyframes loading-3 {
  30% {
    transform: scaleY(1);
    opacity: 0.5;
  }
  45% {
    transform: scaleY(1.6);
    opacity: 1;
  }
  60% {
    transform: scaleY(1);
    opacity: 0.5;
  }
}
</style>
