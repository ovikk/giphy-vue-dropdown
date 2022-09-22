import { onBeforeUnmount, onMounted } from "vue";

export function useClickOutside(el_target_ref: any, callback: any) {
  if (!el_target_ref) {
    return;
  }

  const listener = (e: any) => {
    if (
      e.target == el_target_ref.value ||
      e.composedPath().includes(el_target_ref.value)
    ) {
      return;
    }
    callback();
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });

  return {
    listener,
  };
}
