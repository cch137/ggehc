import query from ".";

export default async function queryChapters(offset = 0): Promise<any> {
  const limit = 1000;
  const res1 = await query({
    collectionName: "Chapters",
    dataQuery: {
      filter: {},
      sort: [{ fieldName: "timeStamp", order: "ASC" }],
      paging: { offset, limit },
      fields: [],
    },
    options: {},
    includeReferencedItems: [],
    segment: "LIVE",
    appId: "4f9cb406-007a-45ab-a398-b6358eeab675",
  });
  const data = await res1.json();
  const { hasNext } = data.pagingMetadata;
  const items = data.items.map(
    ({ chapter, isbn }: { chapter: string; isbn: string }) => ({
      chapter,
      isbn,
    })
  );
  if (hasNext) return [...items, ...(await queryChapters(offset + 1000))];
  return items;
}
