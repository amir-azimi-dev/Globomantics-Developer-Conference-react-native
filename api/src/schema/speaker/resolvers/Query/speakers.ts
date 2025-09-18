import type { QueryResolvers } from './../../../types.generated';
export const speakers: NonNullable<QueryResolvers['speakers']> = async (
  _parent,
  args,
  { dataSources }
) => {
  throw new Error('Oh no, something went wrong!');

  return dataSources.speakers.getSpeakers(args);
};
