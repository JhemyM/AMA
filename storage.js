(() => {
  const queueKey = 'agra.pending-operations';
  const stateKey = 'agra.local-state';

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  window.AgraStorage = {
    getState() {
      return readJson(stateKey, { lastOpenedAt: null, activitiesRegistered: 0 });
    },
    saveState(patch) {
      const nextState = { ...this.getState(), ...patch };
      writeJson(stateKey, nextState);
      return nextState;
    },
    enqueue(operation) {
      const queue = readJson(queueKey, []);
      queue.push({ ...operation, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
      writeJson(queueKey, queue);
      return queue.length;
    },
    pendingCount() {
      return readJson(queueKey, []).length;
    }
  };
})();
