'use client';

import React, { useMemo } from 'react';
import { useDataStore } from 'app/store/providers/data';
import { MapBlock, ScrollytellingBlock } from '@lib';
import { transformToVedaData } from 'app/utilities/data';
import { DatasetStatus, type VizDatasetSuccess } from 'app/types/veda-ui';

/**
 * Extracts layers from a specific dataset in the VEDA data structure.
 * 
 * @param vedaData - The transformed VEDA data object containing all datasets
 * @param datasetId - The ID of the dataset to extract layers from
 * @returns Object containing the dataset layers, or empty object if not found
 */
function getDatasetLayers(vedaData: any, datasetId?: string) {
  if (!datasetId) return {};
  const ds = vedaData?.[datasetId];
  return ds?.data?.layers ? { [datasetId]: ds.data.layers } : {};
}

/**
 * Searches for a layer by ID across all datasets in the layers record.
 * 
 * @param layersRecord - Record of dataset IDs to their layer arrays
 * @param layerId - The ID of the layer to find
 * @returns The found layer object, or null if not found
 */
function findLayerById(layersRecord: Record<string, any[]>, layerId?: string) {
  if (!layerId) return null;
  for (const dsId of Object.keys(layersRecord)) {
    const match = (layersRecord[dsId] || []).find((l) => l.id === layerId);
    if (match) return match;
  }
  return null;
}

/**
 * Converts a raw layer object to the VizDatasetSuccess format expected by MapBlock.
 * 
 * @param layer - The raw layer object from the dataset
 * @returns VizDatasetSuccess object with standardized structure, or null if layer is invalid
 */
function toVizDatasetSuccess(layer: any): VizDatasetSuccess | null {
  if (!layer) return null;
  return {
    status: DatasetStatus.SUCCESS,
    error: null,
    id: layer.id,
    name: layer.name,
    type: layer.type,
    data: layer,
    settings: {
      isVisible: true,
      opacity: 100,
    },
  };
}

/**
 * Enhanced MapBlock component that implements the new veda-ui MapBlock API.
 * 
 * This component addresses the changes introduced in veda-ui PR #1808, where MapBlock
 * now expects pre-prepared baseDataLayer and compareDataLayer instead of full datasets.
 * 
 * The component:
 * 1. Extracts the specified layer from the dataset
 * 2. Converts it to the VizDatasetSuccess format
 * 3. Handles comparison layers (both explicit and implicit via layer.compare)
 * 4. Passes the prepared layers to the underlying MapBlock
 * 
 * @param datasetId - The ID of the dataset containing the layer
 * @param layerId - The ID of the specific layer to display
 * @param compareDataLayer - Optional override for comparison layer
 * @param props - Additional props passed to the underlying MapBlock
 * @returns JSX element containing the MapBlock with prepared data layers
 */
export function EnhancedMapBlock({
  datasetId,
  layerId,
  compareDataLayer: compareOverride,
  ...props
}: {
  datasetId: string;
  layerId: string;
  compareDataLayer?: any;
  [key: string]: any;
}) {
  const { datasets } = useDataStore();
  const transformed = useMemo(() => transformToVedaData(datasets), [datasets]);

  const { baseDataLayer, compareDataLayer } = useMemo(() => {
    const layersRecord = getDatasetLayers(transformed, datasetId);

    const baseRaw = findLayerById(layersRecord, layerId);
    const base = toVizDatasetSuccess(baseRaw);

    let compare = compareOverride ?? null;
    if (!compare && baseRaw?.compare?.layerId) {
      const cmpRaw = findLayerById(layersRecord, baseRaw.compare.layerId);
      compare = toVizDatasetSuccess(cmpRaw);
    }

    return { baseDataLayer: base, compareDataLayer: compare };
  }, [transformed, datasetId, layerId, compareOverride]);

  return (
    <MapBlock
      {...props}
      baseDataLayer={baseDataLayer}
      compareDataLayer={compareDataLayer}
    />
  );
}

/**
 * Enhanced ScrollyTellingBlock component that provides datasets to the underlying component.
 * 
 * This component transforms the raw dataset metadata into the VEDA data format
 * and passes it to the ScrollyTellingBlock component for interactive storytelling.
 * 
 * @param props - Props passed to the underlying ScrollyTellingBlock component
 * @returns JSX element containing the ScrollyTellingBlock with transformed datasets
 */
export function EnhancedScrollyTellingBlock(props) {
  const { datasets } = useDataStore();
  const transformed = transformToVedaData(datasets);
  return <ScrollytellingBlock {...props} datasets={transformed} />;
}
