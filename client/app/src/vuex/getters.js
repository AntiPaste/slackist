export const labels = state => (
  state.app.messages.reduce((counts, message) => {
    const { label } = message;
    counts[label] = ++counts[label] || 1;
    return counts;
  }, {})
);

export const messages = state => (state.app.filter
  ? state.app.messages.filter(message => message.label === state.app.filter)
  : state.app.messages
);
