export type Crop = 'milho' | 'soja' | 'cafe' | 'trigo' | 'outro';
export type SyncOperationType = 'create' | 'update' | 'delete';

export interface Property {
  id: string;
  name: string;
  municipality: string;
  region: string;
  timezone: string;
  areaHectares: number;
}

export interface Field {
  id: string;
  propertyId: string;
  name: string;
  crop: Crop;
  areaHectares: number;
  soilMoisturePercent: number | null;
  healthScore: number | null;
  geometryGeoJson: unknown | null;
}

export interface GuidanceTrail {
  id: string;
  title: string;
  cropTags: Crop[];
  regionTags: string[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
  sourcePublicationIds: string[];
  offlineAvailable: boolean;
}

export interface SyncOperation {
  operationId: string;
  entityId: string;
  entityType: 'property' | 'field' | 'activity' | 'measurement';
  type: SyncOperationType;
  payload: Record<string, unknown>;
  clientVersion: number;
  occurredAt: string;
}

export interface SyncResult {
  operationId: string;
  status: 'accepted' | 'already-applied' | 'rejected';
  serverTime: string;
}
