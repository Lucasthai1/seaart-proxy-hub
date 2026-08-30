const store = globalThis.__SEAART_SESSION_STORE__ || new Map();
globalThis.__SEAART_SESSION_STORE__ = store;

export function saveSeaartSession(data) {
  const record = { ...data, saved_at: new Date().toISOString() };
  store.set('seaart', record);
  return record;
}

export function getSeaartSession() {
  return store.get('seaart') || null;
}
