import type { SyncOperation, SyncResult } from './models.js';

export interface SyncTransport {
  push(operation: SyncOperation): Promise<SyncResult>;
}

export interface SyncStore {
  pending(): Promise<SyncOperation[]>;
  markApplied(operationId: string): Promise<void>;
  markFailed(operationId: string, reason: string): Promise<void>;
}

export interface SyncReport {
  accepted: number;
  alreadyApplied: number;
  failed: number;
}

export async function flushOutbox(store: SyncStore, transport: SyncTransport): Promise<SyncReport> {
  const report: SyncReport = { accepted: 0, alreadyApplied: 0, failed: 0 };
  for (const operation of await store.pending()) {
    try {
      const result = await transport.push(operation);
      if (result.status === 'accepted') report.accepted++;
      if (result.status === 'already-applied') report.alreadyApplied++;
      if (result.status !== 'rejected') await store.markApplied(operation.operationId);
      if (result.status === 'rejected') {
        report.failed++;
        await store.markFailed(operation.operationId, 'server_rejected');
      }
    } catch (error) {
      report.failed++;
      await store.markFailed(operation.operationId, error instanceof Error ? error.message : 'unknown_error');
    }
  }
  return report;
}
