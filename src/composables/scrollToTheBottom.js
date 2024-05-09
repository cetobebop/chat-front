import { divContainerInstance } from "src/global/divContainerInstance";

export function scrollToTheBottom(node) {
  if (node) divContainerInstance.instance = node;
  window.scrollBy(0, window.innerHeight);
  if (divContainerInstance.instance)
    divContainerInstance.instance.scrollTop =
      divContainerInstance.instance.scrollHeight;
}
