import { onBeforeUnmount, reactive } from 'vue'

// Dragging with mouse, pen or finger. It does not use the HTML5 drag API, so it
// also works on phones and tablets: there a drag starts after a long press, so
// normal scrolling keeps working. Draggable items and drop targets are elements
// with `data-drag-key` inside the container; the caller decides what may move.
//
// options: { canDrag(key), canDrop(from, to), onDrop(from, to) }
// Returns reactive state for rendering: { active, source, over, x, y, label }.
export function usePointerDrag(container, { canDrag, canDrop, onDrop }) {
  const LONG_PRESS_MS = 400
  const MOUSE_THRESHOLD = 6
  const TOUCH_SLOP = 10

  const drag = reactive({ active: false, source: null, over: null, x: 0, y: 0, label: '' })
  let start = null
  let timer = null
  let suppressClick = false

  const keyAt = (x, y) => {
    const el = document.elementFromPoint(x, y)?.closest('[data-drag-key]')
    return el && container.value?.contains(el) ? el.dataset.dragKey : null
  }

  function begin(x, y) {
    drag.active = true
    drag.source = start.key
    drag.label = start.el.innerText.replace(/\s+/g, ' ').trim()
    drag.x = x
    drag.y = y
    document.body.classList.add('is-dragging')
    navigator.vibrate?.(15)
  }

  function reset() {
    clearTimeout(timer)
    start = null
    Object.assign(drag, { active: false, source: null, over: null, label: '' })
    document.body.classList.remove('is-dragging')
  }

  function onPointerDown(e) {
    if (e.button !== 0 || !container.value) return
    const el = e.target.closest?.('[data-drag-key]')
    if (!el || !container.value.contains(el) || !canDrag(el.dataset.dragKey)) return
    start = { key: el.dataset.dragKey, el, x: e.clientX, y: e.clientY, id: e.pointerId, touch: e.pointerType === 'touch' }
    if (start.touch) timer = setTimeout(() => start && begin(start.x, start.y), LONG_PRESS_MS)
  }

  function onPointerMove(e) {
    if (!start || e.pointerId !== start.id) return
    const dist = Math.hypot(e.clientX - start.x, e.clientY - start.y)
    if (!drag.active) {
      if (start.touch) {
        if (dist > TOUCH_SLOP) reset() // the finger scrolls
        return
      }
      if (dist < MOUSE_THRESHOLD) return
      begin(e.clientX, e.clientY)
    }
    drag.x = e.clientX
    drag.y = e.clientY
    const key = keyAt(e.clientX, e.clientY)
    drag.over = key && key !== drag.source && canDrop(drag.source, key) ? key : null
  }

  function onPointerUp(e) {
    if (!start || e.pointerId !== start.id) return
    if (drag.active) {
      suppressClick = true // the click that follows the drop must not open anything
      if (drag.over) onDrop(drag.source, drag.over)
    }
    reset()
  }

  const onClick = (e) => {
    if (!suppressClick) return
    suppressClick = false
    e.stopPropagation()
    e.preventDefault()
  }
  // While dragging with a finger the page must not scroll or show a context menu.
  const onTouchMove = (e) => drag.active && e.preventDefault()
  const onContextMenu = (e) => (start || drag.active) && e.preventDefault()
  const onKey = (e) => e.key === 'Escape' && drag.active && reset()

  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
  document.addEventListener('pointercancel', reset)
  document.addEventListener('click', onClick, true)
  document.addEventListener('touchmove', onTouchMove, { passive: false })
  document.addEventListener('contextmenu', onContextMenu)
  document.addEventListener('keydown', onKey)
  onBeforeUnmount(() => {
    reset()
    document.removeEventListener('pointerdown', onPointerDown)
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerup', onPointerUp)
    document.removeEventListener('pointercancel', reset)
    document.removeEventListener('click', onClick, true)
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('contextmenu', onContextMenu)
    document.removeEventListener('keydown', onKey)
  })
  return drag
}
