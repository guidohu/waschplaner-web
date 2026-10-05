import { onBeforeUnmount } from 'vue'

// "Painting" over items with mouse, pen or finger: press on one item and move
// across others; every item touched once is reported. Items are elements with
// `data-drag-key` inside the container. Only active while `enabled()` is true;
// then the items should have `touch-action: none` so a finger paints instead of scrolling.
//
// callbacks: { enabled(), onStart(), onPaint(key), onEnd() }
export function usePointerPaint(container, { enabled, onStart, onPaint, onEnd }) {
  let stroke = null // keys painted in the current stroke

  const keyAt = (x, y) => {
    const el = document.elementFromPoint(x, y)?.closest('[data-drag-key]')
    return el && container.value?.contains(el) ? el.dataset.dragKey : null
  }
  function paint(key) {
    if (!key || stroke.has(key)) return
    stroke.add(key)
    onPaint(key)
  }

  function onPointerDown(e) {
    if (!enabled() || e.button !== 0) return
    const key = keyAt(e.clientX, e.clientY)
    if (!key) return
    e.preventDefault()
    stroke = new Set()
    onStart()
    paint(key)
  }
  const onPointerMove = (e) => stroke && paint(keyAt(e.clientX, e.clientY))
  function onPointerUp() {
    if (!stroke) return
    stroke = null
    onEnd()
  }
  // Painting replaces tapping: no dialog opens afterwards.
  const onClick = (e) => {
    if (!enabled() || !container.value?.contains(e.target)) return
    if (e.target.closest?.('[data-drag-key]')) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
  document.addEventListener('pointercancel', onPointerUp)
  document.addEventListener('click', onClick, true)
  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onPointerDown)
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerup', onPointerUp)
    document.removeEventListener('pointercancel', onPointerUp)
    document.removeEventListener('click', onClick, true)
  })
}
