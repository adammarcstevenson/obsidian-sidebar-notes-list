<script lang="ts">
  let { name }: { name: string } = $props()
</script>

<div class="setting-item setting-item-heading">
  <div class="setting-item-info">
    <div class="setting-item-name">{name}</div>
    <div class="setting-item-description"></div>
  </div>
  <div class="setting-item-control"></div>
</div>
