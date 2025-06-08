<script lang="ts">
  import { l10n } from '../../l10n/l10n'
  import KofiButton from './KofiButton.svelte'
</script>

<div class="setting-item">
  <div class="setting-item-info">
    <div class="setting-item-name">
      {l10n('settingDonateLabel')}
    </div>
    <div class="setting-item-description">
      {l10n('settingDonateDescription')}
    </div>
  </div>
  <div class="setting-item-control">
    <KofiButton />
  </div>
</div>