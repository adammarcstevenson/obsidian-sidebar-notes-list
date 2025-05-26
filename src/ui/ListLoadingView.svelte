<script lang="ts">
  import { l10n } from '../l10n/l10n'
  import state from '../state'

  const { loadingFiles } = state
</script>

<div
  class="container"
  class:hide={!loadingFiles.value}
>
  <div class="spinner">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        .spinner_P7sC {
          transform-origin:center;
          animation:spinner_svv2 .75s infinite linear
        }
        @keyframes spinner_svv2 {
          100% {
            transform:rotate(360deg)
            }
          }
        </style>
      <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" class="spinner_P7sC" />
    </svg>
  </div>
  <div class="message">{l10n('loadingFilesMessage')}</div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: stretch;
    width: 100%;
    height: 100%;
  }
  .container.hide {
    display: none;
  }
  .container > * {
    display: flex;
    justify-content: center;
  }
  .spinner > svg {
    fill: hsl(var(--accent-h) var(--accent-s) var(--accent-l));
  }
  .message {
    color: var(--text-faint);
    font-style: italic;
  }
</style>