export function scrollToTheBottom(node) {
  window.scrollBy(0, window.innerHeight);
  if (node) node.scrollTop = node.scrollHeight;
}
