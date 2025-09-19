import type { DatasetData, StoryData, VedaData } from '@lib';
import type { DatasetMetadata } from 'app/types/content';

/**
 * Processes taxonomy data by converting values to lowercase IDs and preserving names.
 * 
 * This function normalizes taxonomy values by:
 * - Converting spaces to underscores
 * - Converting to lowercase for IDs
 * - Preserving original names for display
 * 
 * @param data - Dataset or story data containing taxonomy information
 * @returns Processed data with normalized taxonomy values
 */
export function processTaxonomies(data): DatasetData | StoryData {
  const updatedTax = data.taxonomy.map((t) => {
    const updatedVals = t.values.map((v) => {
      return {
        id: v.replace(/ /g, '_').toLowerCase(),
        name: v,
      };
    });
    return { ...t, values: updatedVals };
  });
  return { ...data, taxonomy: updatedTax };
}

/**
 * Transforms an array of dataset metadata into a list of DatasetData objects.
 * 
 * @param content - Array of dataset metadata objects
 * @returns Array of DatasetData objects
 */
export const transformToDatasetsList = (
  content: DatasetMetadata[],
): DatasetData[] => {
  return content?.map((post) => ({
    ...post.metadata,
  }));
};

/**
 * Transforms dataset metadata into the VEDA data format expected by components.
 * 
 * This function creates a nested object structure where each dataset ID maps
 * to an object containing the dataset's metadata. This format is used by
 * MapBlock and other VEDA UI components.
 * 
 * @param datasets - Array of dataset metadata objects
 * @returns VEDA data object with dataset ID as keys
 */
export const transformToVedaData = (
  datasets: DatasetMetadata[] | undefined,
): VedaData<DatasetData> => {
  const transformed = {};
  datasets?.map((dataset) => {
    const id = dataset.metadata.id;
    transformed[id] = {
      data: dataset.metadata,
    };
  });
  return transformed;
};
