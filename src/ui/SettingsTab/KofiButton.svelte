<script lang="ts">
  import { l10n } from "../../l10n/l10n"

  const id = 'K3K01FV01H'
</script>

<div class="btn-container">
  <a
    class="kofi-button"
    href="https://ko-fi.com/{id}"
    target="_blank"
  >
    <img
      src="https://storage.ko-fi.com/cdn/cup-border.png"
      alt="Ko-fi donations"
      class="kofi-img"
    />
    {l10n('settingDonateButtonText')}
  </a>
</div>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Quicksand:400,700');
  
  @mixin kofi-image-animation {
    animation: kofi-wiggle 3s 1;
  }

  .btn-container {
    display: inline-block;
    white-space: nowrap;
    min-width: 160px;
  }

  img.kofi-img {
    @include kofi-image-animation;
    display: initial;
    vertical-align: middle;
    padding-top: 0;
    padding-bottom: 0;
    border: none;
    margin-top: 0;
    margin-right: 5px;
    margin-left: 0;
    margin-bottom: 3px;
    content: url('https://storage.ko-fi.com/cdn/cup-border.png');
    height: 15px;
    width: 22px;
    
    &:after {
      vertical-align: middle;
      height: 25px;
      padding-top: 0;
      padding-bottom: 0;
      border: none;
      margin-top: 0;
      margin-right: 6px;
      margin-left: 0;
      margin-bottom: 4px;
      content: url('https://storage.ko-fi.com/cdn/whitelogo.svg');
    }
  }

  a.kofi-button {
    box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
    line-height: 36px;
    min-width: 150px;
    display: inline-block;
    background-color: #5c0029;
    padding: 2px 12px;
    text-align: center;
    border-radius: 7px;
    color: #fff;
    cursor: pointer;
    overflow-wrap: break-word;
    vertical-align: middle;
    border: 0 none #fff;
    font-family:
      'Quicksand',
      Helvetica,
      'Century Gothic',
      sans-serif;
    text-decoration: none;
    text-shadow: none;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: -0.15px;
    text-wrap: none;
    vertical-align: middle;
    line-height: 33px;
    text-align: center;
    text-decoration: none;
    text-shadow: 0 1px 1px rgba(34, 34, 34, 0.05);

    &:hover {
      opacity: 0.85;
    }
  }

  @keyframes kofi-wiggle {
    0% {
      transform: rotate(0) scale(1);
    }
    60% {
      transform: rotate(0) scale(1);
    }
    75% {
      transform: rotate(0) scale(1.12);
    }
    80% {
      transform: rotate(0) scale(1.1);
    }
    84% {
      transform: rotate(-10deg) scale(1.1);
    }
    88% {
      transform: rotate(10deg) scale(1.1);
    }
    92% {
      transform: rotate(-10deg) scale(1.1);
    }
    96% {
      transform: rotate(10deg) scale(1.1);
    }
    100% {
      transform: rotate(0) scale(1);
    }
  }
</style>
