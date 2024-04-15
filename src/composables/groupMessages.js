function groupMessages(msg) {
  let groups = {};
  let lastGroup;
  for (let i = 0; i < msg.length; i++) {
    if (i === 0) {
      groups["g" + i] = [msg[i]];

      lastGroup = "g" + i;
    } else if (msg[i].sender === msg[i - 1].sender) {
      groups[lastGroup].push(msg[i]);
    } else if (msg[i].sender !== msg[i - 1].sender) {
      groups["g" + i] = [msg[i]];
      lastGroup = "g" + i;
    }
  }
  return groups;
}
