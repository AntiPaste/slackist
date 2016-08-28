class Message {

  constructor(data) {
    Object.assign(this, {
      id: null,
      label: null,
      content: null,
      created: null,
    }, data);
  }

}

export default Message;
