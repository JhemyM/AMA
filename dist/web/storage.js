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
    },
    exportBackup() {
      return {
        format: 'agra-local-backup',
        version: 1,
        exportedAt: new Date().toISOString(),
        state: this.getState(),
        pendingOperations: readJson(queueKey, [])
      };
    },
    importBackup(backup) {
      if (!backup || backup.format !== 'agra-local-backup' || backup.version !== 1) {
        throw new Error('Arquivo de backup AGRA inválido.');
      }
      writeJson(stateKey, backup.state ?? { lastOpenedAt: null, activitiesRegistered: 0 });
      writeJson(queueKey, Array.isArray(backup.pendingOperations) ? backup.pendingOperations : []);
    }
  };
})();
