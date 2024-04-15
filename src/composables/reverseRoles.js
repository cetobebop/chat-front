export function reverseRoles(chat) {
  const aux = chat.receiver;

  chat.receiver = chat.sender;
  chat.sender = aux;

  return chat;
}
